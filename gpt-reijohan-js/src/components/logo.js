class ChatLogo extends HTMLElement {

  constructor() {

    super();

    this.attachShadow({
      mode: "open"
    });

    this.shadowRoot.innerHTML = /* html */ `

      <style>

        /* =====================================
           COMPONENTE
        ===================================== */

        :host {
          display: block;

          width: 100%;
          max-width: 100%;

          min-width: 0;

          box-sizing: border-box;

          flex: 0 0 auto;

          color: hsl(0, 0%, 96%);

          transition:
            color 0.3s ease;
        }


        /* =====================================
           CONTENEDOR DEL LOGO
        ===================================== */

        .sidebar-logo {
          display: flex;

          align-items: center;

          width: 100%;
          max-width: 100%;

          min-width: 0;

          box-sizing: border-box;

          padding: 1.25rem 1rem;

          color: inherit;

          white-space: nowrap;
        }


        /* =====================================
           TEXTO
        ===================================== */

        .sidebar-logo span {
          display: block;

          flex: 1 1 auto;

          width: auto;
          max-width: 100%;

          min-width: 0;

          overflow: hidden;

          font-size: 1.25rem;
          font-weight: 600;

          line-height: 1.2;

          text-overflow: ellipsis;

          white-space: nowrap;

          opacity: 1;

          transition:
            opacity 0.3s ease,
            width 0.3s ease,
            max-width 0.3s ease;
        }


        /* =====================================
           TEMA CLARO
        ===================================== */

        :host([data-theme="light"]) {
          color: hsl(0, 0%, 10%);
        }


        /* =====================================
           SIDEBAR CONTRAÍDO
        ===================================== */

        :host([collapsed]) .sidebar-logo {
          justify-content: center;

          padding-left: 0.5rem;
          padding-right: 0.5rem;
        }


        :host([collapsed]) .sidebar-logo span {
          flex: 0 0 auto;

          width: 0;
          max-width: 0;

          opacity: 0;
        }


        /* =====================================
           TABLET
        ===================================== */

        @media (max-width: 64rem) {

          .sidebar-logo {
            padding: 1.125rem 1rem;
          }


          :host([collapsed]) .sidebar-logo {
            justify-content: flex-start;

            padding-left: 1rem;
            padding-right: 1rem;
          }


          :host([collapsed]) .sidebar-logo span {
            flex: 1 1 auto;

            width: auto;
            max-width: 100%;

            opacity: 1;
          }

        }


        /* =====================================
           MÓVIL
        ===================================== */

        @media (max-width: 48rem) {

          .sidebar-logo {
            padding-top: 1rem;
            padding-bottom: 1rem;
          }

        }


        /* =====================================
           MÓVIL PEQUEÑO
        ===================================== */

        @media (max-width: 30rem) {

          .sidebar-logo {
            padding-top: 0.875rem;
            padding-bottom: 0.875rem;
          }

        }


        /* =====================================
           MÓVIL MUY PEQUEÑO
        ===================================== */

        @media (max-width: 22rem) {

          .sidebar-logo {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
          }

        }

      </style>


      <div class="sidebar-logo">

        <span>ReijohanGPT</span>

      </div>

    `;

  }


  /* =====================================
     COMPONENTE CONECTADO
  ===================================== */

  connectedCallback() {

    this.syncWithSidebar();

  }


  /* =====================================
     SINCRONIZAR CON SIDEBAR
  ===================================== */

  syncWithSidebar() {

    const sidebar =
      this.closest("chat-sidebar");


    if (!sidebar) {
      return;
    }


    /* =====================================
       TEMA
    ===================================== */

    if (
      sidebar.hasAttribute("data-theme")
    ) {

      this.setAttribute(
        "data-theme",
        sidebar.getAttribute("data-theme")
      );

    } else {

      this.removeAttribute(
        "data-theme"
      );

    }


    /* =====================================
       ESTADO DEL SIDEBAR
    ===================================== */

    if (
      sidebar.hasAttribute("collapsed")
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

  }

}


customElements.define("chat-logo", ChatLogo);