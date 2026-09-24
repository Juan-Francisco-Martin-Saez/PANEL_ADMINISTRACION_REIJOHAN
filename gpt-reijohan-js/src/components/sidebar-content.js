class ChatSidebarContent extends HTMLElement {

  constructor() {

    super();

    this.attachShadow({
      mode: "open"
    });

    this.shadowRoot.innerHTML = /* html */ `

      <style>

        /* =====================================
           CONTENEDOR DEL COMPONENTE
        ===================================== */

        :host {
          display: flex;

          width: 100%;
          height: 100%;

          min-width: 0;
          min-height: 0;

          flex: 1 1 auto;

          box-sizing: border-box;

          color: hsl(0, 0%, 96%);

          transition:
            color .3s ease;
        }


        /* =====================================
           CONTENIDO DEL SIDEBAR
        ===================================== */

        .sidebar-content {
          width: 100%;
          height: 100%;

          min-width: 0;
          min-height: 0;

          flex: 1 1 auto;

          display: flex;
          flex-direction: column;

          box-sizing: border-box;

          padding: .9375rem;

          overflow: hidden;

          color: hsl(0, 0%, 96%);

          transition:
            padding .35s ease,
            color .3s ease;
        }


        /* =====================================
           COMPONENTES HIJOS
        ===================================== */

        ::slotted(chat-new-button),
        ::slotted(chat-history),
        ::slotted(chat-theme),
        ::slotted(chat-user) {
          display: block;

          width: 100%;

          min-width: 0;

          box-sizing: border-box;
        }


        /* =====================================
           TEMA CLARO
        ===================================== */

        :host([data-theme="light"]) {
          color: hsl(0, 0%, 10%);
        }


        :host([data-theme="light"]) .sidebar-content {
          color: hsl(0, 0%, 10%);
        }


        /* =====================================
           SIDEBAR PLEGADO
        ===================================== */

        :host([collapsed]) .sidebar-content {
          padding: .625rem;
        }


        /* =====================================
           TABLET / MÓVIL
        ===================================== */

        @media (max-width: 64rem) {

          :host([collapsed]) .sidebar-content {
            padding: .9375rem;
          }

        }


        /* =====================================
           PANTALLAS PEQUEÑAS
        ===================================== */

        @media (max-width: 30rem) {

          .sidebar-content {
            padding: .75rem;
          }

          :host([collapsed]) .sidebar-content {
            padding: .75rem;
          }

        }


        @media (max-width: 22rem) {

          .sidebar-content {
            padding: .625rem;
          }

          :host([collapsed]) .sidebar-content {
            padding: .625rem;
          }

        }


        /* =====================================
           ALTURA REDUCIDA
        ===================================== */

        @media (max-height: 40rem) {

          .sidebar-content {
            padding-top: .75rem;
            padding-bottom: .75rem;
          }

        }


        @media (max-width: 64rem) and (max-height: 40rem) {

          .sidebar-content {
            padding: .75rem;
          }

          :host([collapsed]) .sidebar-content {
            padding: .75rem;
          }

        }

      </style>


      <div class="sidebar-content">

        <slot></slot>

      </div>

    `;


    this.sidebarContent =
      this.shadowRoot.querySelector(".sidebar-content");


    this.handleSidebarStateChange =
      this.handleSidebarStateChange.bind(this);


    this.sidebarObserver = null;

  }


  /* =====================================
     CONECTAR COMPONENTE
  ===================================== */

  connectedCallback() {

    this.syncWithSidebar();

    this.observeSidebar();

  }


  /* =====================================
     DESCONECTAR COMPONENTE
  ===================================== */

  disconnectedCallback() {

    if (this.sidebarObserver) {

      this.sidebarObserver.disconnect();

      this.sidebarObserver = null;

    }

  }


  /* =====================================
     BUSCAR SIDEBAR PADRE
  ===================================== */

  getSidebar() {

    return this.closest("chat-sidebar");

  }


  /* =====================================
     SINCRONIZAR CON SIDEBAR
  ===================================== */

  syncWithSidebar() {

    const sidebar = this.getSidebar();

    if (!sidebar) {
      return;
    }


    const theme =
      sidebar.getAttribute("data-theme");

    const collapsed =
      sidebar.hasAttribute("collapsed");


    /* -------------------------------------
       TEMA
    ------------------------------------- */

    if (theme === "light") {

      this.setAttribute("data-theme", "light");

    } else {

      this.removeAttribute("data-theme");

    }


    /* -------------------------------------
       ESTADO PLEGADO
    ------------------------------------- */

    if (collapsed) {

      this.setAttribute("collapsed", "");

    } else {

      this.removeAttribute("collapsed");

    }


    /* -------------------------------------
       SINCRONIZAR HIJOS
    ------------------------------------- */

    this.syncChildren();

  }


  /* =====================================
     SINCRONIZAR COMPONENTES HIJOS
  ===================================== */

  syncChildren() {

    const theme =
      this.getAttribute("data-theme");

    const collapsed =
      this.hasAttribute("collapsed");


    const children = this.querySelectorAll(
      "chat-new-button, chat-history, chat-theme, chat-user"
    );


    children.forEach(child => {

      /* Tema */

      if (theme === "light") {

        child.setAttribute("data-theme", "light");

      } else {

        child.removeAttribute("data-theme");

      }


      /* Estado plegado */

      if (collapsed) {

        child.setAttribute("collapsed", "");

      } else {

        child.removeAttribute("collapsed");

      }


      /* Sincronización propia */

      if (
        typeof child.syncWithSidebar === "function"
      ) {

        child.syncWithSidebar();

      }

    });

  }


  /* =====================================
     OBSERVAR CAMBIOS DEL SIDEBAR
  ===================================== */

  observeSidebar() {

    const sidebar = this.getSidebar();

    if (!sidebar) {
      return;
    }


    this.sidebarObserver =
      new MutationObserver(
        this.handleSidebarStateChange
      );


    this.sidebarObserver.observe(
      sidebar,
      {
        attributes: true,
        attributeFilter: [
          "data-theme",
          "collapsed"
        ]
      }
    );

  }


  /* =====================================
     CAMBIO DE ESTADO DEL SIDEBAR
  ===================================== */

  handleSidebarStateChange() {

    this.syncWithSidebar();

  }

}


customElements.define("chat-sidebar-content", ChatSidebarContent);