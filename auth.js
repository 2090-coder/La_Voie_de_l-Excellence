const hasSupabase = window.supabase && window.SUPABASE_URL && window.SUPABASE_ANON_KEY && !window.SUPABASE_URL.includes('YOUR-PROJECT');
const client = hasSupabase ? window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY) : null;
const form = document.getElementById('authForm');
const message = document.getElementById('authMessage');
const submit = document.querySelector('.auth-submit');
let mode = 'login';

function setMessage(text, error=false){ message.textContent = text; message.className = 'auth-message ' + (error ? 'error' : 'success'); }
function switchMode(next){
  mode = next;
  document.querySelectorAll('.auth-tabs button').forEach(b=>b.classList.toggle('active', b.dataset.mode===next));
  document.querySelectorAll('.signup-only').forEach(el=>el.style.display=next==='signup'?'grid':'none');
  submit.textContent = next==='login' ? 'Se connecter →' : 'Créer mon compte →';
  setMessage('');
}
document.querySelectorAll('.auth-tabs button').forEach(b=>b.addEventListener('click',()=>switchMode(b.dataset.mode)));
switchMode('login');

form.addEventListener('submit', async e=>{
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const fullName = document.getElementById('fullName').value.trim();
  if(!client){ setMessage('Mode préparation : configure Supabase dans supabase-config.js pour activer les vrais comptes.', true); return; }
  submit.disabled = true;
  try{
    if(mode==='signup'){
      if(!fullName) throw new Error('Entre ton nom complet.');
      const {data,error} = await client.auth.signUp({email,password,options:{data:{full_name:fullName}}});
      if(error) throw error;
      if(data.session) location.href='classroom.html';
      else setMessage('Compte créé. Vérifie ton e-mail si la confirmation est activée.');
    }else{
      const {error} = await client.auth.signInWithPassword({email,password});
      if(error) throw error;
      location.href='classroom.html';
    }
  }catch(err){ setMessage(err.message || 'Une erreur est survenue.', true); }
  finally{ submit.disabled=false; }
});
