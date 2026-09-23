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

          width: 17.5rem;
          height: 100%;

          min-width: 0;
          min-height: 0;

          flex:
            0 0 17.5rem;

          position: relative;

          box-sizing: border-box;

          z-index: 100;

          color:
            hsl(0, 0%, 96%);

          transition:
            width 0.35s ease,
            flex-basis 0.35s ease,
            color 0.3s ease;
        }


        /* =====================================
           CONTENEDOR PRINCIPAL
        ===================================== */

        .sidebar {

          position: relative;

          z-index: 2;

          width: 100%;
          height: 100%;

          min-width: 0;
          min-height: 0;

          display: flex;

          flex-direction: column;

          box-sizing: border-box;

          overflow: hidden;

          flex-shrink: 0;

          background:
            hsl(0, 0%, 6%);

          border-right:
            0.0625rem solid
            hsl(0, 0%, 19%);

          color:
            hsl(0, 0%, 96%);

          transition:
            background-color 0.3s ease,
            border-color 0.3s ease,
            color 0.3s ease;
        }


        /* =====================================
           CONTENEDOR INTERNO
        ===================================== */

        .sidebar-content-wrapper {

          width: 100%;
          height: 100%;

          min-width: 0;
          min-height: 0;

          display: flex;

          flex-direction: column;

          flex: 1 1 auto;

          box-sizing: border-box;

          overflow: hidden;
        }


        /* =====================================
           HEADER DEL SIDEBAR
        ===================================== */

        ::slotted(chat-sidebar-header) {

          display: block;

          width: 100%;

          flex:
            0 0 auto;

          min-width: 0;

          box-sizing: border-box;
        }


        /* =====================================
           CONTENIDO DEL SIDEBAR
        ===================================== */

        ::slotted(chat-sidebar-content) {

          display: flex;

          width: 100%;

          flex:
            1 1 auto;

          min-width: 0;
          min-height: 0;

          box-sizing: border-box;
        }


        /* =====================================
           LOGO DIRECTO
        ===================================== */

        ::slotted(chat-logo) {

          min-width: 0;
        }


        /* =====================================
           OVERLAY MÓVIL
        ===================================== */

        .sidebar-overlay {

          position: fixed;

          inset: 0;

          z-index: 1;

          display: block;

          width: 100%;
          height: 100%;

          background:
            hsla(0, 0%, 0%, 0.5);

          opacity: 0;

          visibility: hidden;

          pointer-events: none;

          transition:
            opacity 0.35s ease,
            visibility 0.35s ease;
        }


        /* =====================================
           TEMA CLARO
        ===================================== */

        :host([data-theme="light"]) {

          color:
            hsl(0, 0%, 10%);
        }


        :host([data-theme="light"])
        .sidebar {

          background:
            hsl(0, 0%, 98%);

          border-right-color:
            hsl(0, 0%, 84%);

          color:
            hsl(0, 0%, 10%);
        }


        /* =====================================
           SIDEBAR CONTRAÍDO
        ===================================== */

        :host([collapsed]) {

          width: 4.25rem;

          flex-basis:
            4.25rem;
        }


        /* =====================================
           TABLET / MÓVIL
        ===================================== */

        @media (max-width: 64rem) {

          :host {

            position: fixed;

            top: 0;
            left: 0;

            width:
              min(20rem, 85vw);

            height: 100dvh;

            min-height: 100dvh;

            flex:
              0 0 min(20rem, 85vw);

            transform:
              translateX(-100%);

            transition:
              transform 0.35s ease;

            z-index: 100;
          }


          :host([open]) {

            transform:
              translateX(0);
          }


          :host([open])
          .sidebar-overlay {

            opacity: 1;

            visibility: visible;

            pointer-events: auto;
          }


          /*
             En móvil el sidebar nunca utiliza
             el estado visual contraído.
          */

          :host([collapsed]) {

            width:
              min(20rem, 85vw);

            flex-basis:
              min(20rem, 85vw);

            transform:
              translateX(-100%);
          }


          :host([collapsed][open]) {

            transform:
              translateX(0);
          }
        }


        /* =====================================
           MÓVIL PEQUEÑO
        ===================================== */

        @media (max-width: 48rem) {

          :host {

            width:
              min(19rem, 88vw);

            flex-basis:
              min(19rem, 88vw);
          }


          :host([collapsed]) {

            width:
              min(19rem, 88vw);

            flex-basis:
              min(19rem, 88vw);
          }
        }


        /* =====================================
           MÓVIL PEQUEÑO
        ===================================== */

        @media (max-width: 30rem) {

          :host {

            width:
              min(18rem, 90vw);

            flex-basis:
              min(18rem, 90vw);
          }


          :host([collapsed]) {

            width:
              min(18rem, 90vw);

            flex-basis:
              min(18rem, 90vw);
          }
        }


        /* =====================================
           MÓVIL MUY PEQUEÑO
        ===================================== */

        @media (max-width: 22rem) {

          :host {

            width:
              min(16.5rem, 92vw);

            flex-basis:
              min(16.5rem, 92vw);
          }


          :host([collapsed]) {

            width:
              min(16.5rem, 92vw);

            flex-basis:
              min(16.5rem, 92vw);
          }
        }


        /* =====================================
           ESCRITORIO
        ===================================== */

        @media (min-width: 64.0001rem) {

          :host([open]) {

            transform: none;
          }
        }


        /* =====================================
           PANTALLAS GRANDES
        ===================================== */

        @media (min-width: 120rem) {

          :host {

            width: 19rem;

            flex-basis:
              19rem;
          }


          :host([collapsed]) {

            width: 4.25rem;

            flex-basis:
              4.25rem;
          }
        }

      </style>


      <!-- =====================================
           SIDEBAR
      ===================================== -->

      <aside class="sidebar">


        <div class="sidebar-content-wrapper">

          <slot></slot>

        </div>


      </aside>


      <!-- =====================================
           OVERLAY MÓVIL
      ===================================== -->

      <div
        class="sidebar-overlay"
        aria-hidden="true">
      </div>

    `;


    /* =====================================
       REFERENCIAS
    ===================================== */

    this.sidebar =
      this.shadowRoot.querySelector(
        ".sidebar"
      );


    this.overlay =
      this.shadowRoot.querySelector(
        ".sidebar-overlay"
      );


    /* =====================================
       ESTADO
    ===================================== */

    this.isOpen = false;

    this.isCollapsed = false;


    /* =====================================
       EVENTOS
    ===================================== */

    this.handleToggleRequest =
      this.handleToggleRequest.bind(this);

    this.handleOpenRequest =
      this.handleOpenRequest.bind(this);

    this.handleCloseRequest =
      this.handleCloseRequest.bind(this);

    this.handleOverlayClick =
      this.handleOverlayClick.bind(this);

    this.handleMediaChange =
      this.handleMediaChange.bind(this);


    /* =====================================
       MEDIA QUERY
    ===================================== */

    this.mobileMediaQuery =
      window.matchMedia(
        "(max-width: 64rem)"
      );

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


    this.overlay.addEventListener(
      "click",
      this.handleOverlayClick
    );


    this.mobileMediaQuery.addEventListener(
      "change",
      this.handleMediaChange
    );


    this.normalizeState();

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


    this.overlay.removeEventListener(
      "click",
      this.handleOverlayClick
    );


    this.mobileMediaQuery.removeEventListener(
      "change",
      this.handleMediaChange
    );

  }


  /* =====================================
     PETICIÓN DE TOGGLE
  ===================================== */

  handleToggleRequest(event) {

    event.stopPropagation();

    this.toggle();

  }


  /* =====================================
     PETICIÓN DE APERTURA
  ===================================== */

  handleOpenRequest(event) {

    event.stopPropagation();

    this.open();

  }


  /* =====================================
     PETICIÓN DE CIERRE
  ===================================== */

  handleCloseRequest(event) {

    event.stopPropagation();

    this.close();

  }


  /* =====================================
     CLICK EN OVERLAY
  ===================================== */

  handleOverlayClick() {

    this.close();

  }


  /* =====================================
     CAMBIO DESKTOP / MÓVIL
  ===================================== */

  handleMediaChange() {

    this.normalizeState();

    this.updateState();

  }


  /* =====================================
     ABRIR
  ===================================== */

  open() {

    if (this.mobileMediaQuery.matches) {

      this.isOpen = true;

      this.isCollapsed = false;

    } else {

      this.isOpen = false;

      this.isCollapsed = false;
    }


    this.updateState();

  }


  /* =====================================
     CERRAR
  ===================================== */

  close() {

    if (this.mobileMediaQuery.matches) {

      this.isOpen = false;

      this.isCollapsed = false;

    } else {

      this.isOpen = false;

      this.isCollapsed = true;
    }


    this.updateState();

  }


  /* =====================================
     TOGGLE
  ===================================== */

  toggle() {

    if (this.mobileMediaQuery.matches) {

      this.isOpen =
        !this.isOpen;

      this.isCollapsed = false;

    } else {

      this.isCollapsed =
        !this.isCollapsed;

      this.isOpen = false;
    }


    this.updateState();

  }


  /* =====================================
     EXPANDIR
  ===================================== */

  expand() {

    if (this.mobileMediaQuery.matches) {

      this.open();

      return;
    }


    this.isCollapsed = false;

    this.isOpen = false;

    this.updateState();

  }


  /* =====================================
     CONTRAER
  ===================================== */

  collapse() {

    if (this.mobileMediaQuery.matches) {

      this.close();

      return;
    }


    this.isCollapsed = true;

    this.isOpen = false;

    this.updateState();

  }


  /* =====================================
     NORMALIZAR ESTADO
  ===================================== */

  normalizeState() {

    if (this.mobileMediaQuery.matches) {

      /*
        En móvil solo existe open.
      */

      this.isCollapsed = false;

    } else {

      /*
        En escritorio solo existe collapsed.
      */

      this.isOpen = false;

    }

  }


  /* =====================================
     ACTUALIZAR ESTADO
  ===================================== */

  updateState() {

    /* =================================
       OPEN
    ================================= */

    if (
      this.mobileMediaQuery.matches &&
      this.isOpen
    ) {

      this.setAttribute(
        "open",
        ""
      );

    } else {

      this.removeAttribute(
        "open"
      );
    }


    /* =================================
       COLLAPSED
    ================================= */

    if (
      !this.mobileMediaQuery.matches &&
      this.isCollapsed
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


    /* =================================
       SINCRONIZAR HIJOS
    ================================= */

    this.syncChildren();


    /* =================================
       NOTIFICAR CAMBIO
    ================================= */

    this.dispatchEvent(
      new CustomEvent(
        "sidebar-state-change",
        {
          bubbles: true,
          composed: true,

          detail: {
            open:
              this.isOpen,

            collapsed:
              this.isCollapsed,

            mobile:
              this.mobileMediaQuery.matches
          }
        }
      )
    );

  }


  /* =====================================
     SINCRONIZAR COMPONENTES HIJOS
  ===================================== */

  syncChildren() {

    const theme =
      this.getAttribute(
        "data-theme"
      );


    const collapsed =
      this.hasAttribute(
        "collapsed"
      );


    const children =
      this.querySelectorAll(
        `
        chat-logo,
        chat-sidebar-header,
        chat-sidebar-content
        `
      );


    children.forEach(
      (child) => {

        /* ===============================
           TEMA
        =============================== */

        if (theme === "light") {

          child.setAttribute(
            "data-theme",
            "light"
          );

        } else {

          child.removeAttribute(
            "data-theme"
          );
        }


        /* ===============================
           CONTRAÍDO
        =============================== */

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


        /* ===============================
           SINCRONIZACIÓN PROPIA
        =============================== */

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
     CAMBIAR TEMA
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


    this.syncChildren();


    this.dispatchEvent(
      new CustomEvent(
        "sidebar-state-change",
        {
          bubbles: true,
          composed: true,

          detail: {
            theme
          }
        }
      )
    );

  }

}


customElements.define("chat-sidebar", ChatSidebar);