class ChatSidebar extends HTMLElement {

  constructor() {

    super();

    this.attachShadow({
      mode: "open"
    });

    this.shadowRoot.innerHTML = /* html */ `

      <style>

        /* =====================================
           COMPONENTE SIDEBAR
        ===================================== */

        :host {
          display: block;

          width: 18%;
          height: 100%;

          min-width: 0;
          min-height: 0;

          flex: 0 0 18%;

          position: relative;
          z-index: 100;

          box-sizing: border-box;

          transition:
            width 0.3s ease,
            flex-basis 0.3s ease,
            transform 0.3s ease;
        }


        /* =====================================
           SIDEBAR
        ===================================== */

        .sidebar {
          display: flex;
          flex-direction: column;

          width: 100%;
          height: 100%;

          min-width: 0;
          min-height: 0;

          box-sizing: border-box;

          overflow: hidden;

          background: hsl(0, 0%, 6%);

          border-right:
            0.0625rem solid hsl(0, 0%, 19%);

          color: hsl(0, 0%, 96%);

          transition:
            background-color 0.3s ease,
            color 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }


        /* =====================================
           CONTENEDOR DE LOS HIJOS
        ===================================== */

        .sidebar-content-wrapper {
          display: flex;
          flex-direction: column;

          width: 100%;
          height: 100%;

          min-width: 0;
          min-height: 0;

          box-sizing: border-box;

          overflow: hidden;
        }


        /* =====================================
           ELEMENTOS SUPERIORES
        ===================================== */

        ::slotted(chat-logo),
        ::slotted(chat-sidebar-header) {
          display: block;

          width: 100%;
          max-width: 100%;

          min-width: 0;

          flex: 0 0 auto;

          box-sizing: border-box;
        }


        /* =====================================
           CONTENIDO PRINCIPAL
        ===================================== */

        ::slotted(chat-sidebar-content) {
          display: flex;

          flex-direction: column;

          width: 100%;
          max-width: 100%;

          min-width: 0;
          min-height: 0;

          flex: 1 1 auto;

          box-sizing: border-box;

          overflow: hidden;
        }


        /* =====================================
           ELEMENTOS INFERIORES
        ===================================== */

        ::slotted(chat-new-button),
        ::slotted(chat-history),
        ::slotted(chat-theme),
        ::slotted(chat-user) {
          width: 100%;
          max-width: 100%;

          min-width: 0;

          box-sizing: border-box;

          flex: 0 0 auto;
        }


        /* =====================================
           OVERLAY
        ===================================== */

        .sidebar-overlay {
          display: none;

          position: fixed;

          inset: 0;

          width: 100%;
          height: 100%;

          box-sizing: border-box;

          background:
            hsla(0, 0%, 0%, 0.45);

          opacity: 0;

          pointer-events: none;

          transition:
            opacity 0.3s ease;

          z-index: 90;
        }


        /* =====================================
           TEMA CLARO
        ===================================== */

        :host([data-theme="light"]) .sidebar {

          background: hsl(0, 0%, 98%);

          border-right-color:
            hsl(0, 0%, 84%);

          color:
            hsl(0, 0%, 10%);
        }


        /* =====================================
           SIDEBAR CONTRAÍDO
           4.25rem
        ===================================== */

        :host([collapsed]) {

          width: 4.25rem;

          flex-basis: 4.25rem;
        }


        /* =====================================
           TABLET / MÓVIL
        ===================================== */

        @media (max-width: 64rem) {

          :host {

            position: fixed;

            top: 0;
            left: 0;

            width: min(20rem, 85vw);

            height: 100dvh;

            min-height: 100dvh;

            flex: 0 0 auto;

            transform:
              translateX(-100%);
          }


          :host([open]) {

            transform:
              translateX(0);
          }


          /*
             En móvil el estado collapsed
             no reduce el sidebar.
          */

          :host([collapsed]) {

            width: min(20rem, 85vw);

            flex-basis: auto;
          }


          .sidebar {

            box-shadow: none;
          }


          :host([open]) .sidebar {

            box-shadow:
              0 0 2rem
              hsla(0, 0%, 0%, 0.35);
          }


          .sidebar-overlay {

            display: block;

            position: fixed;

            inset: 0;

            width: 100%;
            height: 100%;
          }


          :host([open]) .sidebar-overlay {

            opacity: 1;

            pointer-events: auto;
          }

        }


        /* =====================================
           MÓVIL
        ===================================== */

        @media (max-width: 48rem) {

          :host {

            width: min(19rem, 88vw);
          }


          :host([collapsed]) {

            width: min(19rem, 88vw);
          }

        }


        /* =====================================
           MÓVIL PEQUEÑO
        ===================================== */

        @media (max-width: 30rem) {

          :host {

            width: min(18rem, 90vw);
          }


          :host([collapsed]) {

            width: min(18rem, 90vw);
          }

        }


        /* =====================================
           MÓVIL MUY PEQUEÑO
        ===================================== */

        @media (max-width: 22rem) {

          :host {

            width: min(16.5rem, 92vw);
          }


          :host([collapsed]) {

            width: min(16.5rem, 92vw);
          }

        }

      </style>


      <aside class="sidebar">

        <div class="sidebar-content-wrapper">

          <slot></slot>

        </div>

      </aside>


      <div
        class="sidebar-overlay"
        aria-hidden="true">
      </div>

    `;


    /* =====================================
       REFERENCIAS
    ===================================== */

    this.sidebar =
      this.shadowRoot.querySelector(".sidebar");

    this.sidebarOverlay =
      this.shadowRoot.querySelector(".sidebar-overlay");


    /* =====================================
       ESTADO
    ===================================== */

    this.isOpen = false;

    this.isCollapsed = false;


    /* =====================================
       BIND DE EVENTOS
    ===================================== */

    this.handleToggleRequest =
      this.handleToggleRequest.bind(this);

    this.handleOpenRequest =
      this.handleOpenRequest.bind(this);

    this.handleCloseRequest =
      this.handleCloseRequest.bind(this);

    this.handleOverlayClick =
      this.handleOverlayClick.bind(this);

    this.handleResize =
      this.handleResize.bind(this);

  }


  /* =====================================
     COMPONENTE CONECTADO
  ===================================== */

  connectedCallback() {

    this.addEventListener(
      "sidebar-toggle-request",
      this.handleToggleRequest
    );

    this.addEventListener(
      "sidebar-open-request",
      this.handleOpenRequest
    );

    this.addEventListener(
      "sidebar-close-request",
      this.handleCloseRequest
    );

    this.sidebarOverlay.addEventListener(
      "click",
      this.handleOverlayClick
    );

    window.addEventListener(
      "resize",
      this.handleResize
    );

    this.updateState();

  }


  /* =====================================
     COMPONENTE DESCONECTADO
  ===================================== */

  disconnectedCallback() {

    this.removeEventListener(
      "sidebar-toggle-request",
      this.handleToggleRequest
    );

    this.removeEventListener(
      "sidebar-open-request",
      this.handleOpenRequest
    );

    this.removeEventListener(
      "sidebar-close-request",
      this.handleCloseRequest
    );

    this.sidebarOverlay.removeEventListener(
      "click",
      this.handleOverlayClick
    );

    window.removeEventListener(
      "resize",
      this.handleResize
    );

  }


  /* =====================================
     DETECTAR MÓVIL
     64rem = 1024px
  ===================================== */

  isMobile() {

    return window.innerWidth <= 1024;

  }


  /* =====================================
     EVENTOS
  ===================================== */

  handleToggleRequest() {

    this.toggle();

  }


  handleOpenRequest() {

    this.open();

  }


  handleCloseRequest() {

    this.close();

  }


  handleOverlayClick() {

    if (this.isMobile()) {

      this.close();

    }

  }


  /* =====================================
     CAMBIO DE TAMAÑO
  ===================================== */

  handleResize() {

    if (!this.isMobile()) {

      this.isOpen = false;

      this.isCollapsed = false;

    }

    this.updateState();

  }


  /* =====================================
     ABRIR
  ===================================== */

  open() {

    if (this.isMobile()) {

      this.isOpen = true;

    } else {

      this.isCollapsed = false;

    }

    this.updateState();

  }


  /* =====================================
     CERRAR
  ===================================== */

  close() {

    if (this.isMobile()) {

      this.isOpen = false;

    } else {

      this.isCollapsed = true;

    }

    this.updateState();

  }


  /* =====================================
     ALTERNAR
  ===================================== */

  toggle() {

    if (this.isMobile()) {

      this.isOpen = !this.isOpen;

    } else {

      this.isCollapsed = !this.isCollapsed;

    }

    this.updateState();

  }


  /* =====================================
     EXPANDIR
  ===================================== */

  expand() {

    if (!this.isMobile()) {

      this.isCollapsed = false;

      this.updateState();

    }

  }


  /* =====================================
     CONTRAER
  ===================================== */

  collapse() {

    if (!this.isMobile()) {

      this.isCollapsed = true;

      this.updateState();

    }

  }


  /* =====================================
     ACTUALIZAR ESTADO
  ===================================== */

  updateState() {

    /* ---------- OPEN ---------- */

    if (this.isOpen) {

      this.setAttribute(
        "open",
        ""
      );

    } else {

      this.removeAttribute(
        "open"
      );

    }


    /* ---------- COLLAPSED ---------- */

    if (
      this.isCollapsed &&
      !this.isMobile()
    ) {

      this.setAttribute(
        "collapsed",
        ""
      );

    } else {

      this.removeAttribute(
        "collapsed"
      );

    }


    /* ---------- HIJOS ---------- */

    this.syncChildren();


    /* ---------- EVENTO ---------- */

    this.dispatchEvent(
      new CustomEvent(
        "sidebar-state-change",
        {
          bubbles: true,
          composed: true,

          detail: {
            open: this.isOpen,

            collapsed:
              this.isCollapsed &&
              !this.isMobile()
          }
        }
      )
    );

  }


  /* =====================================
     SINCRONIZAR HIJOS
  ===================================== */

  syncChildren() {

    const theme =
      this.getAttribute("data-theme");

    const collapsed =
      this.isCollapsed &&
      !this.isMobile();


    const children =
      this.querySelectorAll(
        `
        chat-logo,
        chat-sidebar-header,
        chat-sidebar-content,
        chat-new-button,
        chat-history,
        chat-theme,
        chat-user
        `
      );


    children.forEach(
      child => {

        /* ---------- TEMA ---------- */

        if (theme) {

          child.setAttribute(
            "data-theme",
            theme
          );

        } else {

          child.removeAttribute(
            "data-theme"
          );

        }


        /* ---------- COLLAPSED ---------- */

        if (collapsed) {

          child.setAttribute(
            "collapsed",
            ""
          );

        } else {

          child.removeAttribute(
            "collapsed"
          );

        }


        /* ---------- SINCRONIZACIÓN ---------- */

        if (
          typeof child.syncWithSidebar ===
          "function"
        ) {

          child.syncWithSidebar();

        }

      }
    );

  }


  /* =====================================
     TEMA
  ===================================== */

  setTheme(theme) {

    if (theme === "light") {

      this.setAttribute(
        "data-theme",
        "light"
      );

    } else {

      this.removeAttribute(
        "data-theme"
      );

    }

    this.updateState();

  }

}


customElements.define("chat-sidebar", ChatSidebar);