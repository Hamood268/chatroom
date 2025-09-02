const socket = io();

// Login form handling
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const profilePicInput = document.getElementById("profilePic");
const profilePreview = document.getElementById("profilePreview");
const usernamePreview = document.getElementById("usernamePreview");
const loginPage = document.getElementById("loginPage");
const chatPage = document.getElementById("chatPage");

// Message input handling
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messagesContainer = document.getElementById("messagesContainer");

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

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  if (username) {
    const userData = {
      username: username,
      profilePic: profilePicInput.value || null,
    };

    console.log("User data:", userData);

    socket.emit("user-login", userData);

    // Hide login page and show chat page
    loginPage.style.display = "none";
    chatPage.style.display = "flex";
  }
});

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