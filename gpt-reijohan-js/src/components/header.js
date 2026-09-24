class ChatHeader extends HTMLElement {

  constructor() {

    super();

    this.attachShadow({
      mode: "open"
    });


    this.shadowRoot.innerHTML = /* html */ `

      <style>

        /* =====================================
           COMPONENTE HEADER PRINCIPAL
        ===================================== */

        :host {

          display: block;

          width: 100%;

          min-width: 0;
          min-height: 0;

          flex-shrink: 0;

          box-sizing: border-box;

          color:
            hsl(0, 0%, 96%);

          transition:
            color 0.3s ease;
        }


        /* =====================================
           HEADER
        ===================================== */

        .chat-header {

          width: 100%;
          height: 4.375rem;

          min-width: 0;

          display: flex;

          align-items: center;
          justify-content: space-between;

          flex-shrink: 0;

          gap: 1rem;

          padding:
            0 1.25rem;

          box-sizing: border-box;

          background:
            hsl(0, 0%, 9%);

          border-bottom:
            0.0625rem solid
            hsl(0, 0%, 19%);

          color:
            hsl(0, 0%, 96%);

          transition:
            background-color 0.3s ease,
            border-color 0.3s ease,
            color 0.3s ease,
            padding 0.3s ease,
            height 0.3s ease;
        }


        /* =====================================
           BOTÓN MENÚ MÓVIL
        ===================================== */

        .mobile-menu-container {

          display: none;

          align-items: center;
          justify-content: center;

          flex-shrink: 0;
        }


        .mobile-menu-button {

          width: 2.625rem;
          height: 2.625rem;

          min-width: 2.625rem;
          min-height: 2.625rem;

          display: flex;

          flex-direction: column;

          align-items: center;
          justify-content: center;

          gap:
            0.3rem;

          padding: 0;
          margin: 0;

          box-sizing: border-box;

          border: none;

          border-radius:
            0.4375rem;

          background:
            transparent;

          color:
            hsl(0, 0%, 96%);

          cursor: pointer;

          transition:
            background-color 0.2s ease,
            color 0.2s ease;
        }


        .mobile-menu-button:hover {

          background:
            hsl(0, 0%, 16%);
        }


        .mobile-menu-button:focus-visible {

          outline:
            0.125rem solid
            currentColor;

          outline-offset:
            0.125rem;
        }


        .mobile-menu-button span {

          display: block;

          width: 1.3rem;
          height: 0.125rem;

          flex-shrink: 0;

          background:
            currentColor;

          border-radius:
            0.125rem;
        }


        /* =====================================
           TÍTULO
        ===================================== */

        .chat-header-title-container {

          min-width: 0;

          flex:
            1 1 auto;

          margin-left:
            0.3125rem;

          overflow: hidden;
        }


        .chat-header-title {

          display: block;

          max-width: 100%;

          min-width: 0;

          color:
            hsl(0, 0%, 96%);

          font-size:
            1.3rem;

          font-weight:
            600;

          line-height:
            1.2;

          white-space: nowrap;

          overflow: hidden;

          text-overflow: ellipsis;
        }


        /* =====================================
           LOGO
        ===================================== */

        .chat-header-logo-container {

          width: 3.25rem;
          height: 3.25rem;

          min-width: 3.25rem;
          min-height: 3.25rem;

          display: flex;

          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          overflow: hidden;
        }


        .chat-header-logo {

          display: block;

          width: 100%;
          height: 100%;

          object-fit: contain;
        }


        /* =====================================
           TEMA CLARO
        ===================================== */

        :host([data-theme="light"]) {

          color:
            hsl(0, 0%, 10%);
        }


        :host([data-theme="light"])
        .chat-header {

          background:
            hsl(0, 0%, 97%);

          border-bottom-color:
            hsl(0, 0%, 84%);

          color:
            hsl(0, 0%, 10%);
        }


        :host([data-theme="light"])
        .mobile-menu-button {

          color:
            hsl(0, 0%, 12%);
        }


        :host([data-theme="light"])
        .mobile-menu-button:hover {

          background:
            hsl(0, 0%, 91%);
        }


        :host([data-theme="light"])
        .chat-header-title {

          color:
            hsl(0, 0%, 10%);
        }


        /* =====================================
           TABLET / MÓVIL
        ===================================== */

        @media (max-width: 64rem) {

          .mobile-menu-container {

            display: flex;
          }


          .chat-header {

            height: 4rem;

            gap:
              0.75rem;

            padding:
              0 1rem;
          }


          .chat-header-title-container {

            margin-left: 0;

          }


          .chat-header-title {

            font-size:
              1rem;
          }


          .chat-header-logo-container {

            width: 2.875rem;
            height: 2.875rem;

            min-width: 2.875rem;
            min-height: 2.875rem;
          }

        }


        /* =====================================
           MÓVIL PEQUEÑO
        ===================================== */

        @media (max-width: 48rem) {

          .chat-header {

            height: 3.875rem;

            padding:
              0 0.875rem;
          }


          .mobile-menu-button {

            width: 2.5rem;
            height: 2.5rem;

            min-width: 2.5rem;
            min-height: 2.5rem;
          }


          .mobile-menu-button span {

            width: 1.25rem;
          }


          .chat-header-title {

            font-size:
              0.9375rem;
          }


          .chat-header-logo-container {

            width: 2.75rem;
            height: 2.75rem;

            min-width: 2.75rem;
            min-height: 2.75rem;
          }

        }


        /* =====================================
           MÓVIL PEQUEÑO
        ===================================== */

        @media (max-width: 30rem) {

          .chat-header {

            height: 3.625rem;

            gap:
              0.5rem;

            padding:
              0 0.625rem;
          }


          .mobile-menu-button {

            width: 2.375rem;
            height: 2.375rem;

            min-width: 2.375rem;
            min-height: 2.375rem;
          }


          .mobile-menu-button span {

            width: 1.2rem;
          }


          .chat-header-title {

            font-size:
              0.875rem;
          }


          .chat-header-logo-container {

            width: 2.5rem;
            height: 2.5rem;

            min-width: 2.5rem;
            min-height: 2.5rem;
          }

        }


        /* =====================================
           MÓVIL MUY PEQUEÑO
        ===================================== */

        @media (max-width: 22rem) {

          .chat-header {

            height: 3.5rem;

            padding:
              0 0.5rem;
          }


          .mobile-menu-button {

            width: 2.25rem;
            height: 2.25rem;

            min-width: 2.25rem;
            min-height: 2.25rem;
          }


          .chat-header-logo-container {

            width: 2.25rem;
            height: 2.25rem;

            min-width: 2.25rem;
            min-height: 2.25rem;
          }


          .chat-header-title {

            font-size:
              0.8125rem;
          }

        }


        /* =====================================
           POCA ALTURA
        ===================================== */

        @media (max-height: 40rem) {

          .chat-header {

            height: 3.5rem;
          }

        }


        /* =====================================
           POCA ALTURA + MÓVIL
        ===================================== */

        @media (max-width: 64rem)
        and (max-height: 40rem) {

          .chat-header {

            height: 3.375rem;
          }

        }


        /* =====================================
           PANTALLAS GRANDES
        ===================================== */

        @media (min-width: 120rem) {

          .chat-header {

            padding:
              0 1.5rem;
          }

        }

      </style>


      <header class="chat-header">


        <!-- =================================
             BOTÓN MENÚ MÓVIL
        ================================== -->

        <div class="mobile-menu-container">

          <button
            type="button"
            class="mobile-menu-button"
            aria-label="Abrir menú lateral"
            aria-expanded="false">

            <span></span>
            <span></span>
            <span></span>

          </button>

        </div>


        <!-- =================================
             TÍTULO
        ================================== -->

        <div class="chat-header-title-container">

          <span class="chat-header-title">
            Chat EA (Versión Alpha 0.1)
          </span>

        </div>


        <!-- =================================
             LOGO
        ================================== -->

        <div class="chat-header-logo-container">

          <img
            class="chat-header-logo"
            src="img/logo-cab.svg"
            alt="ReijohanGPT">

        </div>


      </header>

    `;


    /* =====================================
       REFERENCIAS
    ===================================== */

    this.mobileMenuButton =
      this.shadowRoot.querySelector(
        ".mobile-menu-button"
      );


    this.logo =
      this.shadowRoot.querySelector(
        ".chat-header-logo"
      );


    /* =====================================
       EVENTOS
    ===================================== */

    this.handleMobileMenu =
      this.handleMobileMenu.bind(this);

    this.handleSidebarChange =
      this.handleSidebarChange.bind(this);


    /* =====================================
       OBSERVADOR
    ===================================== */

    this.sidebarObserver = null;

  }


  /* =====================================
     COMPONENTE CONECTADO
  ===================================== */

  connectedCallback() {

    this.mobileMenuButton.addEventListener(
      "click",
      this.handleMobileMenu
    );


    this.syncWithSidebar();

    this.observeSidebar();

  }


  /* =====================================
     COMPONENTE DESCONECTADO
  ===================================== */

  disconnectedCallback() {

    this.mobileMenuButton.removeEventListener(
      "click",
      this.handleMobileMenu
    );


    if (this.sidebarObserver) {

      this.sidebarObserver.disconnect();

      this.sidebarObserver = null;
    }

  }


  /* =====================================
     BOTÓN MENÚ MÓVIL
  ===================================== */

  handleMobileMenu() {

    /*
      El header no abre directamente
      el sidebar.

      Solo envía una petición al componente
      <chat-sidebar>.
    */

    this.dispatchEvent(
      new CustomEvent(
        "sidebar-open-request",
        {
          bubbles: true,
          composed: true
        }
      )
    );

  }


  /* =====================================
     SINCRONIZAR CON SIDEBAR
  ===================================== */

  syncWithSidebar() {

    const sidebar =
      document.querySelector(
        "chat-sidebar"
      );


    if (!sidebar) {
      return;
    }


    /* ---------- TEMA ---------- */

    const theme =
      sidebar.getAttribute(
        "data-theme"
      );


    if (theme === "light") {

      this.setAttribute(
        "data-theme",
        "light"
      );

      this.updateLogo(
        "img/logo-cab-negro.svg"
      );

    } else {

      this.removeAttribute(
        "data-theme"
      );

      this.updateLogo(
        "img/logo-cab.svg"
      );

    }


    /* ---------- MENÚ ---------- */

    const isOpen =
      sidebar.hasAttribute(
        "open"
      );


    this.mobileMenuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

  }


  /* =====================================
     OBSERVAR SIDEBAR
  ===================================== */

  observeSidebar() {

    const sidebar =
      document.querySelector(
        "chat-sidebar"
      );


    if (!sidebar) {
      return;
    }


    if (this.sidebarObserver) {

      this.sidebarObserver.disconnect();

    }


    this.sidebarObserver =
      new MutationObserver(
        this.handleSidebarChange
      );


    this.sidebarObserver.observe(
      sidebar,
      {
        attributes: true,

        attributeFilter: [
          "data-theme",
          "open"
        ]
      }
    );

  }


  /* =====================================
     CAMBIO EN SIDEBAR
  ===================================== */

  handleSidebarChange() {

    this.syncWithSidebar();

  }


  /* =====================================
     ACTUALIZAR LOGO
  ===================================== */

  updateLogo(src) {

    if (!this.logo) {

      return;
    }


    if (
      this.logo.getAttribute("src") !== src
    ) {

      this.logo.setAttribute(
        "src",
        src
      );

    }

  }

}


customElements.define("chat-header", ChatHeader);