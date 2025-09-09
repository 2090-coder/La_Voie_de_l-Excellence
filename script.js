// Chargement des messages sauvegardés
window.onload = function() {
  loadMessages();
};

// Envoi d’un message
function sendMessage() {
  const pseudo = document.getElementById("pseudo").value.trim();
  const message = document.getElementById("message").value.trim();

  if (message === "") return;

  let finalPseudo = pseudo || "Anonyme";

  // Si c’est l’admin
  if (finalPseudo.toLowerCase() === "bengz") {
    finalPseudo = "BENGZ (Admin)";
  }

  const msg = {
    pseudo: finalPseudo,
    text: message,
    time: new Date().toLocaleTimeString()
  };

  // Sauvegarde dans LocalStorage
  let chat = JSON.parse(localStorage.getItem("chat")) || [];
  chat.push(msg);
  localStorage.setItem("chat", JSON.stringify(chat));

  // Affiche directement
  displayMessage(msg);

  document.getElementById("message").value = "";
}

// Charger les messages existants
function loadMessages() {
  const chat = JSON.parse(localStorage.getItem("chat")) || [];
  chat.forEach(displayMessage);
}

// Afficher un message
function displayMessage(msg) {
  const messagesDiv = document.getElementById("messages");

  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message");

  if (msg.pseudo.includes("Admin")) {
    msgDiv.classList.add("admin-msg");
  }

  msgDiv.innerHTML = `<strong>${msg.pseudo}:</strong> ${msg.text} 
                      <span class="time">${msg.time}</span>`;

  messagesDiv.appendChild(msgDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}