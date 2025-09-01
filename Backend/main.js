// Basic UI functionality - you can replace this with your WebSocket implementation

// Login form handling
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const profilePicInput = document.getElementById("profilePic");
const profilePreview = document.getElementById("profilePreview");
const usernamePreview = document.getElementById("usernamePreview");
const loginPage = document.getElementById("loginPage");
const chatPage = document.getElementById("chatPage");

// Update preview as user types
usernameInput.addEventListener("input", updatePreview);
profilePicInput.addEventListener("input", updatePreview);

function updatePreview() {
  const username = usernameInput.value || "Your Name";
  const profilePic = profilePicInput.value;

  usernamePreview.textContent = username;

  if (profilePic) {
    profilePreview.innerHTML = `<img src="${profilePic}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
  } else {
    const initials =
      username
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "?";
    profilePreview.textContent = initials;
  }
}

// Login form submission
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = usernameInput.value.trim();
  if (username) {
    // Store user data (you can use this for your WebSocket implementation)
    const userData = {
      username: username,
      profilePic: profilePicInput.value || null,
    };

    // Hide login page and show chat page
    loginPage.style.display = "none";
    chatPage.style.display = "flex";

    // You can access userData here for your WebSocket connection
    console.log("User data:", userData);
  }
});

// Message input handling
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messagesContainer = document.getElementById("messagesContainer");

// Auto-resize textarea
messageInput.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = Math.min(this.scrollHeight, 120) + "px";
});

// Send message on Enter (but allow Shift+Enter for new lines)
messageInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Send button click
sendBtn.addEventListener("click", sendMessage);

function sendMessage() {
  const message = messageInput.value.trim();
  if (message) {
    // Here you would send the message via WebSocket
    console.log("Sending message:", message);

    // Clear input
    messageInput.value = "";
    messageInput.style.height = "auto";

    // You can add the message to the UI here or wait for WebSocket response
  }
}

// Utility functions you can use for your WebSocket implementation

function addMessage(username, message, timestamp, profilePic = null) {
  const messageElement = document.createElement("div");
  messageElement.className = "message";

  const initials = username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const avatarContent = profilePic
    ? `<img src="${profilePic}" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`
    : initials;

  messageElement.innerHTML = `
                <div class="message-avatar">${avatarContent}</div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-author">${username}</span>
                        <span class="message-time">${timestamp}</span>
                    </div>
                    <div class="message-text">${message}</div>
                </div>
            `;

  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addUser(username, profilePic = null) {
  const userElement = document.createElement("div");
  userElement.className = "user-item";
  userElement.setAttribute("data-username", username);

  const initials = username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const avatarContent = profilePic
    ? `<img src="${profilePic}" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`
    : initials;

  userElement.innerHTML = `
                <div class="user-avatar">${avatarContent}</div>
                <div class="user-info">
                    <h4>${username}</h4>
                    <span class="user-status">Online</span>
                </div>
            `;

  document.getElementById("usersList").appendChild(userElement);
  updateOnlineCount();
}

function removeUser(username) {
  const userElement = document.querySelector(`[data-username="${username}"]`);
  if (userElement) {
    userElement.remove();
    updateOnlineCount();
  }
}

function updateOnlineCount() {
  const count = document.querySelectorAll(".user-item").length;
  document.getElementById("onlineCount").textContent = `${count} user${
    count !== 1 ? "s" : ""
  } online`;
}

// Example usage (remove these in your implementation):
// addMessage('New User', 'Hello everyone!', '10:45 AM');
// addUser('New User')