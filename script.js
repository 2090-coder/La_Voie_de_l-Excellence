document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.querySelector(".sidebar");
  if (menuBtn && sidebar) menuBtn.addEventListener("click", () => sidebar.classList.toggle("open"));

  const messagesDiv = document.getElementById("messages");
  const sendBtn = document.getElementById("sendBtn");
  const pseudoInput = document.getElementById("pseudo");
  const messageInput = document.getElementById("message");
  if (!messagesDiv || !messageInput) return;

  const getChat = () => { try { return JSON.parse(localStorage.getItem("voie_excellence_chat")) || []; } catch { return []; } };
  const saveChat = chat => localStorage.setItem("voie_excellence_chat", JSON.stringify(chat));

  function displayMessage(msg) {
    const msgDiv = document.createElement("div");
    msgDiv.className = "message" + (msg.admin ? " admin-msg" : "");
    const author = document.createElement("strong");
    const text = document.createElement("span");
    const time = document.createElement("span");
    author.textContent = msg.pseudo + ": ";
    text.textContent = msg.text + " ";
    time.className = "time";
    time.textContent = msg.time;
    msgDiv.append(author, text, time);
    messagesDiv.appendChild(msgDiv);
  }

  function loadMessages() {
    messagesDiv.innerHTML = "";
    getChat().forEach(displayMessage);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;
    let pseudo = (pseudoInput?.value || "").trim() || "Anonyme";
    const normalized = pseudo.toLowerCase();
    const admin = ["bengz", "salomon", "salomon bengz", "salomon shukuru bengz"].includes(normalized);
    if (admin) pseudo = "BENGZ (Admin)";
    const msg = { pseudo, text, time: new Date().toLocaleTimeString("fr-FR", {hour:"2-digit", minute:"2-digit"}), admin };
    const chat = getChat();
    chat.push(msg);
    saveChat(chat);
    displayMessage(msg);
    messageInput.value = "";
    messageInput.focus();
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  sendBtn?.addEventListener("click", sendMessage);
  messageInput.addEventListener("keydown", event => { if (event.key === "Enter") sendMessage(); });
  loadMessages();
});
