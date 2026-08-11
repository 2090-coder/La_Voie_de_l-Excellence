const configured = window.supabase && window.SUPABASE_URL && window.SUPABASE_ANON_KEY && !window.SUPABASE_URL.includes('YOUR-PROJECT');
const db = configured ? window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY) : null;
const $ = id => document.getElementById(id);

function escapeHtml(value=''){ const d=document.createElement('div'); d.textContent=value; return d.innerHTML; }
function showDemo(){
  $('courseCount').textContent='06'; $('assignmentCount').textContent='03'; $('resourceCount').textContent='—'; $('onlineCount').textContent='—';
  $('subjects').innerHTML=[['⚡','Électronique','Circuits · composants · mesures'],['💻','Programmation','Arduino · C/C++ · logique'],['⚙️','Automatisme','Commandes · systèmes · relais'],['🌐','Réseaux','Communication · IoT · systèmes'],['📐','Mathématiques','Calculs · formules · applications'],['🛠️','Travaux pratiques','Projets · laboratoire · défis']].map(x=>`<a class="subject-card" href="#devoirs"><span>${x[0]}</span><div><strong>${x[1]}</strong><small>${x[2]}</small></div><b>→</b></a>`).join('');
  $('assignments').innerHTML=['Préparer le prochain cours d’électronique','Exercice de programmation','Projet pratique'].map((x,i)=>`<div class="task"><span class="task-dot ${i===0?'urgent':''}"></span><div><strong>${x}</strong><small>Échéance à venir</small></div><span class="date-badge">À venir</span></div>`).join('');
  $('resources').innerHTML='<div class="empty-card">📁 Les documents de cours seront disponibles ici.</div>';
  $('announcements').innerHTML='<article class="announcement-card"><div class="announcement-head"><img src="admin.jpg" alt="Admin"><div><strong>La Voie de l’Excellence</strong><small>Annonce de bienvenue</small></div><span>📢</span></div><h3>Bienvenue dans le Classroom V3 !</h3><p>La plateforme est prête à accueillir les cours, devoirs, ressources et discussions de la 3e Électronique.</p></article>';
}

async function init(){
  if(!db){ showDemo(); return; }
  const {data:{session}} = await db.auth.getSession();
  if(!session){ location.href='auth.html'; return; }
  const user=session.user;
  let {data:profile}=await db.from('profiles').select('*').eq('id',user.id).single();
  const name=profile?.full_name || user.user_metadata?.full_name || 'Élève';
  const role=profile?.role || 'student';
  $('heroName').textContent=name.split(' ')[0]; $('topName').textContent=name; $('sideName').textContent=name; $('profileName').textContent=name;
  const roleLabel={student:'Élève',teacher:'Enseignant',admin:'Administrateur'}[role]||'Membre';
  $('heroRole').textContent=roleLabel; $('sideRole').textContent=roleLabel; $('profileRole').textContent=`${roleLabel} · 3e Électronique`;
  const load=[loadSubjects(),loadAssignments(),loadResources(),loadAnnouncements(),loadChat()]; await Promise.all(load);
  db.channel('messages-live').on('postgres_changes',{event:'INSERT',schema:'public',table:'messages'},payload=>appendMessage(payload.new,true)).subscribe();
}
async function loadSubjects(){ const {data,error}=await db.from('subjects').select('*').order('name'); if(error){showDemo();return;} $('courseCount').textContent=data.length; $('subjects').innerHTML=data.map(s=>`<a class="subject-card" href="#devoirs"><span>${escapeHtml(s.icon||'📚')}</span><div><strong>${escapeHtml(s.name)}</strong><small>${escapeHtml(s.description||'Cours et ressources')}</small></div><b>→</b></a>`).join('') || '<div class="empty-card">Aucune matière.</div>'; }
async function loadAssignments(){ const {data}=await db.from('assignments').select('*,subjects(name)').order('due_at',{ascending:true}); if(errorSafe(data)){return;} $('assignmentCount').textContent=data.length; $('assignments').innerHTML=data.map(a=>`<div class="task"><span class="task-dot ${a.due_at&&new Date(a.due_at)<new Date()?'urgent':''}"></span><div><strong>${escapeHtml(a.title)}</strong><small>${escapeHtml(a.subjects?.name||'Matière')} · ${escapeHtml(a.description||'')}</small></div><span class="date-badge">${a.due_at?new Date(a.due_at).toLocaleDateString('fr-FR'):'Sans date'}</span></div>`).join('') || '<div class="empty-card">Aucun devoir.</div>'; }
function errorSafe(data){ if(!data){ $('assignments').innerHTML='<div class="empty-card">Impossible de charger les devoirs pour le moment.</div>'; return true;} return false; }
async function loadResources(){ const {data}=await db.from('resources').select('*,subjects(name)').order('created_at',{ascending:false}); if(data){ $('resourceCount').textContent=data.length; $('resources').innerHTML=data.map(r=>`<a class="resource-item" href="${escapeHtml(r.file_url)}" target="_blank" rel="noopener"><span>📄</span><div><strong>${escapeHtml(r.title)}</strong><small>${escapeHtml(r.subjects?.name||'Ressource')} · ${escapeHtml(r.description||'')}</small></div>↗</a>`).join('') || '<div class="empty-card">Aucune ressource.</div>'; } }
async function loadAnnouncements(){ const {data}=await db.from('announcements').select('*,profiles(full_name,avatar_url)').order('created_at',{ascending:false}); if(data){ $('announcements').innerHTML=data.map(a=>`<article class="announcement-card"><div class="announcement-head"><img src="${escapeHtml(a.profiles?.avatar_url||'admin.jpg')}" alt="Auteur"><div><strong>${escapeHtml(a.profiles?.full_name||'Administration')}</strong><small>${new Date(a.created_at).toLocaleString('fr-FR')}</small></div><span>📢</span></div><h3>${escapeHtml(a.title)}</h3><p>${escapeHtml(a.content)}</p></article>`).join('') || '<div class="empty-card">Aucune annonce.</div>'; } }
async function loadChat(){ const {data}=await db.from('messages').select('*,profiles(full_name,avatar_url)').order('created_at',{ascending:true}).limit(100); $('chatMessages').innerHTML=''; (data||[]).forEach(m=>appendMessage({...m,author_name:m.profiles?.full_name},false)); }
function appendMessage(m,scroll){ const box=$('chatMessages'); const el=document.createElement('div'); el.className='live-message'; el.innerHTML=`<img src="${escapeHtml(m.profiles?.avatar_url||'admin.jpg')}" alt=""><div><strong>${escapeHtml(m.author_name||m.profiles?.full_name||'Élève')}</strong><small>${new Date(m.created_at||Date.now()).toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}</small><p>${escapeHtml(m.content)}</p></div>`; box.appendChild(el); if(scroll) box.scrollTop=box.scrollHeight; }
$('chatForm').addEventListener('submit',async e=>{e.preventDefault(); if(!db)return alert('Active Supabase pour utiliser le chat partagé.'); const text=$('chatInput').value.trim(); if(!text)return; const {data:{user}}=await db.auth.getUser(); const {error}=await db.from('messages').insert({author_id:user.id,content:text}); if(error)alert(error.message); else $('chatInput').value='';});
$('logoutBtn').addEventListener('click',async()=>{if(db) await db.auth.signOut(); location.href='auth.html';});
$('menuBtn').addEventListener('click',()=>document.querySelector('.sidebar').classList.toggle('open'));
init();
