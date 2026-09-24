/* =====================================================
   COMPONENTES
===================================================== */

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


/* =====================================================
   REFERENCIAS
===================================================== */

const chatApp =
  document.querySelector(".chat-app");

const sidebar =
  document.querySelector("chat-sidebar");

const newChat =
  document.querySelector("chat-new-button");

const chatInput =
  document.querySelector("chat-input");

const filePreview =
  document.querySelector("chat-file-preview");

const welcome =
  document.querySelector("chat-welcome");

const status =
  document.querySelector("chat-status");

const messages =
  document.querySelector("chat-messages");


/* =====================================================
   ESTADO
===================================================== */

let selectedFile = null;

let hasMessages = false;


/* =====================================================
   TEMA
===================================================== */

function syncTheme() {

  if (!sidebar) {
    return;
  }


  const theme =
    sidebar.getAttribute("data-theme");


  if (theme === "light") {

    document.documentElement.setAttribute(
      "data-theme",
      "light"
    );

    document.body.setAttribute(
      "data-theme",
      "light"
    );

  } else {

    document.documentElement.removeAttribute(
      "data-theme"
    );

    document.body.removeAttribute(
      "data-theme"
    );

  }

}


/* =====================================================
   ESTADO DE LA CONVERSACIÓN
===================================================== */

function syncChatState() {

  if (!chatApp) {
    return;
  }


  /* ---------- BIENVENIDA ---------- */

  if (welcome) {

    if (hasMessages) {

      welcome.setAttribute(
        "has-messages",
        ""
      );

    } else {

      welcome.removeAttribute(
        "has-messages"
      );

    }

  }


  /* ---------- ESTADO DE BÚSQUEDA ---------- */

  if (status) {

    if (hasMessages) {

      status.setAttribute(
        "visible",
        ""
      );

      status.setAttribute(
        "chat-has-messages",
        ""
      );

    } else {

      status.removeAttribute(
        "visible"
      );

      status.removeAttribute(
        "chat-has-messages"
      );

    }

  }


  /* ---------- INPUT ---------- */

  if (chatInput) {

    if (hasMessages) {

      chatInput.setAttribute(
        "has-messages",
        ""
      );

    } else {

      chatInput.removeAttribute(
        "has-messages"
      );

    }

  }

}


/* =====================================================
   ARCHIVO SELECCIONADO
===================================================== */

function handleFileSelected(event) {

  const file =
    event.detail?.file;


  if (!file) {
    return;
  }


  selectedFile =
    file;


  if (filePreview) {

    filePreview.setFile(
      selectedFile
    );

  }

}


/* =====================================================
   ELIMINAR ARCHIVO
===================================================== */

function removeSelectedFile() {

  selectedFile =
    null;


  if (chatInput) {

    chatInput.clearFile();

  }


  if (filePreview) {

    filePreview.clear();

  }

}


/* =====================================================
   ENVIAR MENSAJE
===================================================== */

function sendMessage(event) {

  const message =
    event?.detail?.message || "";


  const file =
    event?.detail?.file ||
    selectedFile;


  if (!message && !file) {
    return;
  }


  /* ---------- ESTADO ---------- */

  hasMessages = true;


  /* ---------- ARCHIVO ---------- */

  if (file) {

    console.log(
      "Archivo adjunto:",
      file.name
    );

    console.log(
      "Tipo:",
      file.type
    );

    console.log(
      "Tamaño:",
      file.size
    );

  }


  /* ---------- LIMPIAR INPUT ---------- */

  if (chatInput) {

    chatInput.clear();

  }


  /* ---------- LIMPIAR ARCHIVO ---------- */

  removeSelectedFile();


  /* ---------- CERRAR SIDEBAR ---------- */

  closeMobileMenu();


  /* ---------- ACTUALIZAR INTERFAZ ---------- */

  syncChatState();

}


/* =====================================================
   NUEVA CONVERSACIÓN
===================================================== */

function resetChat() {

  /* ---------- ESTADO ---------- */

  hasMessages = false;


  /* ---------- MENSAJES ---------- */

  if (messages) {

    messages.clear();

  }


  /* ---------- INPUT ---------- */

  if (chatInput) {

    chatInput.clear();

  }


  /* ---------- ARCHIVO ---------- */

  removeSelectedFile();


  /* ---------- SIDEBAR ---------- */

  closeMobileMenu();


  /* ---------- INTERFAZ ---------- */

  syncChatState();

}


/* =====================================================
   CERRAR MENÚ MÓVIL
===================================================== */

function closeMobileMenu() {

  if (
    !sidebar ||
    window.innerWidth > 64 * 16
  ) {

    return;

  }


  sidebar.close();

}


/* =====================================================
   NUEVA CONVERSACIÓN
===================================================== */

if (newChat) {

  newChat.addEventListener(
    "new-chat-request",
    resetChat
  );

}


/* =====================================================
   ABRIR SIDEBAR
===================================================== */

document.addEventListener(
  "sidebar-open-request",
  function () {

    if (sidebar) {

      sidebar.open();

    }

  }
);


/* =====================================================
   CERRAR SIDEBAR
===================================================== */

document.addEventListener(
  "sidebar-close-request",
  function () {

    if (sidebar) {

      sidebar.close();

    }

  }
);


/* =====================================================
   ESTADO DEL SIDEBAR
===================================================== */

if (sidebar) {

  sidebar.addEventListener(
    "sidebar-state-change",
    function () {

      syncTheme();

    }
  );

}


/* =====================================================
   CAMBIO DE TEMA
===================================================== */

if (sidebar) {

  const themeObserver =
    new MutationObserver(
      function () {

        syncTheme();

      }
    );


  themeObserver.observe(
    sidebar,
    {
      attributes: true,

      attributeFilter: [
        "data-theme"
      ]
    }
  );

}


/* =====================================================
   ARCHIVO SELECCIONADO
===================================================== */

if (chatInput) {

  chatInput.addEventListener(
    "file-selected",
    handleFileSelected
  );

}


/* =====================================================
   ELIMINAR ARCHIVO
===================================================== */

if (filePreview) {

  filePreview.addEventListener(
    "remove-file-request",
    removeSelectedFile
  );

}


/* =====================================================
   ENVIAR MENSAJE
===================================================== */

if (chatInput) {

  chatInput.addEventListener(
    "send-message-request",
    sendMessage
  );

}


/* =====================================================
   CAMBIO DE TAMAÑO
===================================================== */

window.addEventListener(
  "resize",
  function () {

    if (
      sidebar &&
      window.innerWidth > 64 * 16
    ) {

      sidebar.close();

    }

  }
);


/* =====================================================
   INICIALIZACIÓN
===================================================== */

syncTheme();

syncChatState();