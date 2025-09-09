const messagesDiv = document.getElementById("messages");

const responses = [
  // ===== SALUTATIONS & POLITESSE =====
  { keywords:["bonjour","salut","hello","hi","hé","coucou","hey","yo"], 
    answer:"Salut ! Je suis ChatBENGZ 🤖. Comment ça va aujourd'hui ? Prêt pour apprendre et discuter avec le groupe ?" },
  { keywords:["bonsoir","bonne soirée","bonne nuit"], 
    answer:"Bonsoir ! 🌙 ChatBENGZ ici. J'espère que tu as passé une bonne journée. Que veux-tu apprendre ou demander ce soir ?" },
  { keywords:["ça va","quoi de neuf","comment ça va"], 
    answer:"Ça va super 😎 ! ChatBENGZ est prêt à répondre à toutes tes questions. Et toi, comment ça va ?" },
  { keywords:["merci","thank","merci beaucoup","thx"], 
    answer:"Avec plaisir ! ChatBENGZ est toujours là pour t'aider 😊." },
  { keywords:["bravo","félicitations","bien joué"], 
    answer:"Merci ! ChatBENGZ t'encourage à continuer comme ça 👏." },
  { keywords:["hey chat","bonjour chatbengz"], 
    answer:"Salut ! C'est ChatBENGZ 🤖. Pose ta question et je t'aiderai du mieux possible." },

  // ===== MOTIVATION & CONSEILS ÉTUDIANTS =====
  { keywords:["conseil","astuce","truc","technique"], 
    answer:"Voici un conseil de ChatBENGZ : pratique tous les jours, même 10-15 minutes suffisent pour progresser. Note toujours tes expériences." },
  { keywords:["organisation","planification","planning","emploi du temps"], 
    answer:"ChatBENGZ recommande : organise ton travail. Planifie ta semaine, note les tâches importantes et fixe-toi des objectifs précis." },
  { keywords:["motivation","inspiration","encouragement","persévérance"], 
    answer:"Reste motivé ! 💪 ChatBENGZ te rappelle : chaque petit progrès compte. Fixe-toi des objectifs clairs et célèbre tes réussites." },
  { keywords:["apprentissage","étude","révision","apprendre"], 
    answer:"Pour mieux apprendre, écoute ChatBENGZ : comprends le concept avant de mémoriser. Fais des mini-projets pratiques pour renforcer tes connaissances." },

  // ===== ÉLECTRONIQUE - BASES =====
  { keywords:["électronique","cours","électrique","électricité"], 
    answer:"Pour l'électronique, ChatBENGZ te conseille de bien comprendre les bases : courant, tension, résistance, loi d'Ohm et circuits simples." },
  { keywords:["résistance","résistances","ohm","loi d'ohm"], 
    answer:"Une résistance limite le courant dans un circuit. ChatBENGZ te rappelle : V = R * I. Prends toujours soin de vérifier les valeurs." },
  { keywords:["condensateur","capacitor","capacités"], 
    answer:"Un condensateur stocke de l'énergie et se charge/décharge selon le circuit. ChatBENGZ recommande de tester avec des montages simples." },
  { keywords:["diode","led","leds","diodes"], 
    answer:"Une diode laisse passer le courant dans un seul sens. ChatBENGZ te conseille de vérifier la polarité avant d’allumer une LED." },
  { keywords:["transistor","npn","pnp"], 
    answer:"Le transistor peut être utilisé comme interrupteur ou amplificateur. ChatBENGZ te conseille d'expérimenter pour comprendre le rôle de chaque type." },
  { keywords:["circuit","montage","breadboard","plan"], 
    answer:"Pour réussir un circuit, ChatBENGZ te rappelle : vérifie toujours les connexions avant d’alimenter. Utilise une breadboard pour tester facilement." },

  // ===== ARDUINO & MICROCONTROLEURS =====
  { keywords:["arduino","uno","mega","nano","microcontrôleur","programmation"], 
    answer:"Pour Arduino, ChatBENGZ conseille de programmer en C/C++. Commence par des projets simples : LED, capteurs, moteurs. Teste toujours étape par étape." },
  { keywords:["capteur","capteurs","sensor","temperature","distance","humidité","lumière"], 
    answer:"ChatBENGZ te rappelle : teste tes capteurs un par un, lis bien la documentation et connecte correctement les broches." },
  { keywords:["moteur","servo","dc motor","stepper"], 
    answer:"Pour contrôler un moteur, ChatBENGZ conseille de bien choisir le driver et d'utiliser des alimentations adaptées pour éviter les surcharges." },
  { keywords:["led rgb","led multicolore","rgb"], 
    answer:"ChatBENGZ te conseille de vérifier les couleurs et les broches avant d’alimenter une LED RGB. Utilise un code simple pour tester chaque couleur." },

  // ===== PROJETS PRATIQUES =====
  { keywords:["projet","projets","défi","challenge"], 
    answer:"Décris ton projet à ChatBENGZ : composants, objectif, problèmes rencontrés. Je te donnerai des conseils détaillés et personnalisés." },
  { keywords:["échec","raté","problème projet"], 
    answer:"Pas de panique 😅 ChatBENGZ te rappelle : chaque erreur est une leçon. Analyse ton montage et teste étape par étape." },
  { keywords:["succès","réussi","fonctionne"], 
    answer:"Bravo ! 🎉 ChatBENGZ te félicite pour ton succès. Continue à explorer et améliorer ton projet." },

  // ===== ASTUCES & RÉFLEXES =====
  { keywords:["sécurité","risque","protection","danger"], 
    answer:"ChatBENGZ te rappelle : manipule toujours avec précaution, débranche avant de modifier, porte des lunettes si nécessaire." },
  { keywords:["astuce","truc","shortcut","hack"], 
    answer:"Voici une astuce de ChatBENGZ : teste toujours tes composants individuellement avant de les connecter au circuit complet." },
  { keywords:["documentation","manuel","datasheet"], 
    answer:"ChatBENGZ conseille : lis toujours la datasheet des composants pour comprendre leur fonctionnement et limitations." },
  { keywords:["calcul","loi ohm","formule","math","formules"], 
    answer:"Pour calculer courant, tension et résistance, utilise V = R * I. ChatBENGZ recommande de vérifier avec un multimètre." },

  // ===== POLITESSE & MOTS COURANTS =====
  { keywords:["svp","s'il vous plaît","please"], 
    answer:"Bien sûr ! ChatBENGZ est toujours prêt à aider 😄." },
  { keywords:["bonjour chatbengz","salut chatbengz"], 
    answer:"Salut ! C'est ChatBENGZ 🤖. Pose ta question et je t'aiderai du mieux possible." },
  { keywords:["félicitations","bravo","bien joué"], 
    answer:"Merci ! ChatBENGZ t'encourage à continuer comme ça 👏." },

  // ===== RÉPONSE PAR DÉFAUT =====
  { keywords:[""], 
    answer:"ChatBENGZ n'a pas compris ta question 😅. Essaie de préciser ou utilise des mots-clés sur l'électronique, projets ou conseils." }
];

// Envoyer un message
function sendMessage() {
  const input = document.getElementById("message");
  const text = input.value.trim();
  if(text === "") return;

  displayMessage("Vous", text);

  // Trouver réponse adaptée
  let answer = getAnswer(text.toLowerCase());
  setTimeout(() => displayMessage("ChatBENGZ", answer), 500);

  input.value = "";
}

// Afficher un message
function displayMessage(sender, text) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message");
  if(sender === "ChatBENGZ") msgDiv.classList.add("admin-msg");

  msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
  messagesDiv.appendChild(msgDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Trouver une réponse adaptée
function getAnswer(message) {
  for(let i=0; i<responses.length; i++){
    let item = responses[i];
    for(let kw of item.keywords){
      if(kw && message.includes(kw)) return item.answer;
    }
  }
  // Par défaut
  return "Je n'ai pas compris ta question. Peux-tu reformuler ?";
}