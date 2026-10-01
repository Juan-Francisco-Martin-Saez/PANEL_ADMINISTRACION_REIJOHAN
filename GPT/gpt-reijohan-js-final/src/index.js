import "./components/logo.js";
import "./components/header.js";
import "./components/sidebar.js";
import "./components/sidebar-header.js";
import "./components/sidebar-content.js";
import "./components/new-button.js";
import "./components/history.js";
import "./components/theme.js";
import "./components/user.js";
import "./components/conversation.js";
import "./components/welcome.js";
import "./components/status.js";
import "./components/messages.js";
import "./components/input.js";
import "./components/file-preview.js";
import "./components/main.js";
import "./components/header-content.js";

const chatApp = document.querySelector(".chat-app");
const sidebar = document.querySelector("chat-sidebar");
const newChat = document.querySelector("chat-new-button");
const chatInput = document.querySelector("chat-input");
const filePreview = document.querySelector("chat-file-preview");
const welcome = document.querySelector("chat-welcome");
const status = document.querySelector("chat-status");
const messages = document.querySelector("chat-messages");

let selectedFile = null;
let hasMessages = false;

function syncTheme() {
  if (!sidebar) {
    return;
  }

  const theme = sidebar.getAttribute("data-theme");

  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    document.body.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
    document.body.removeAttribute("data-theme");
  }
}

function syncChatState() {
  if (!chatApp) {
    return;
  }

  if (welcome) {
    if (hasMessages) {
      welcome.setAttribute("has-messages", "");
    } else {
      welcome.removeAttribute("has-messages");
    }
  }

  if (status) {
    if (hasMessages) {
      status.setAttribute("visible", "");
      status.setAttribute("chat-has-messages", "");
    } else {
      status.removeAttribute("visible");
      status.removeAttribute("chat-has-messages");
    }
  }

  if (chatInput) {
    if (hasMessages) {
      chatInput.setAttribute("has-messages", "");
    } else {
      chatInput.removeAttribute("has-messages");
    }
  }
}

function handleFileSelected(event) {
  const file = event.detail?.file;
  if (!file) {
    return;
  }
  selectedFile = file;
  if (filePreview) {
    filePreview.setFile(selectedFile);
  }
}

function removeSelectedFile() {
  selectedFile = null;
  if (chatInput) {
    chatInput.clearFile();
  }
  if (filePreview) {
    filePreview.clear();
  }
}

function sendMessage(event) {
  const message = event?.detail?.message || "";
  const file = event?.detail?.file || selectedFile;
  if (!message && !file) {
    return;
  }
  hasMessages = true;
  if (file) {
    console.log("Archivo adjunto:", file.name);
    console.log("Tipo:", file.type);
    console.log("Tamaño:", file.size);

  }
  if (chatInput) {
    chatInput.clear();
  }
  removeSelectedFile();
  closeMobileMenu();
  syncChatState();
}

function resetChat() {
  hasMessages = false;
  if (messages) {
    messages.clear();
  }
  if (chatInput) {
    chatInput.clear();
  }
  removeSelectedFile();
  closeMobileMenu();
  syncChatState();
}

function closeMobileMenu() {
  if (
    !sidebar ||
    window.innerWidth > 64 * 16
  ) {
    return;
  }
  sidebar.close();
}

if (newChat) {
  newChat.addEventListener("new-chat-request", resetChat);
}

document.addEventListener("sidebar-open-request", function () {
  if (sidebar) {
    sidebar.open();
  }
});

document.addEventListener("sidebar-close-request", function () {
  if (sidebar) {
    sidebar.close();
  }
});

if (sidebar) {
  sidebar.addEventListener("sidebar-state-change", function () {
    syncTheme();
  });
}

if (sidebar) {
  const themeObserver = new MutationObserver(function () {
    syncTheme();
  });

  themeObserver.observe(sidebar, { attributes: true, attributeFilter: ["data-theme"] });
}

if (chatInput) {
  chatInput.addEventListener("file-selected", handleFileSelected);
}

if (filePreview) {
  filePreview.addEventListener("remove-file-request", removeSelectedFile);
}

if (chatInput) {
  chatInput.addEventListener("send-message-request", sendMessage);
}

window.addEventListener("resize", function () {
  if (sidebar && window.innerWidth > 64 * 16) {
    sidebar.open();
  }
});

syncTheme();
syncChatState();