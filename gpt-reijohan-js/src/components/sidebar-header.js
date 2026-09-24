class ChatSidebarHeader extends HTMLElement {

  constructor() {

    super();

    this.attachShadow({
      mode: "open"
    });


    this.shadowRoot.innerHTML = /* html */ `

      <style>

        /* =====================================
           COMPONENTE HEADER DEL SIDEBAR
        ===================================== */

        :host {

          display: block;

          width: 100%;
          max-width: 100%;

          min-width: 0;
          min-height: 0;

          height: 4.375rem;

          flex:
            0 0 4.375rem;

          box-sizing: border-box;

          overflow: hidden;

          position: relative;

          z-index: 10;

          color:
            hsl(0, 0%, 96%);

          transition:
            color 0.3s ease;
        }


        /* =====================================
           HEADER
        ===================================== */

        .sidebar-header {

          z-index: 10;

          width: 100%;
          max-width: 100%;

          height: 100%;

          min-width: 0;

          display: flex;

          align-items: center;

          box-sizing: border-box;

          padding:
            0 4.375rem 0 1.25rem;

          overflow: hidden;

          background:
            hsl(0, 0%, 6%);

          border-bottom:
            0.0625rem solid
            hsl(0, 0%, 19%);

          color:
            hsl(0, 0%, 96%);

          transition:
            background-color 0.3s ease,
            border-color 0.3s ease,
            color 0.3s ease,
            padding 0.3s ease;
        }


        /* =====================================
           CONTENEDOR DEL LOGO
        ===================================== */

        .sidebar-logo-container {

          position: relative;

          z-index: 1;

          width: 100%;
          max-width: 100%;

          min-width: 0;

          height: 100%;

          display: flex;

          align-items: center;

          overflow: hidden;
        }


        /* =====================================
           SLOT
        ===================================== */

        ::slotted(*) {

          position: relative;

          z-index: 1;

          min-width: 0;
        }


        /* =====================================
           CONTENEDOR DEL BOTÓN
        ===================================== */

        .sidebar-toggle-container {

          position: absolute;

          z-index: 30;

          top: 50%;

          right: 0.9375rem;

          width: 2.5rem;

          height: 2.5rem;

          min-width: 2.5rem;

          min-height: 2.5rem;

          display: flex;

          align-items: center;

          justify-content: center;

          transform:
            translateY(-50%);

          pointer-events: auto;
        }


        /* =====================================
           BOTÓN PLEGAR / DESPLEGAR
        ===================================== */

        .sidebar-toggle-button {

          position: relative;

          z-index: 31;

          width: 2.5rem;
          height: 2.5rem;

          min-width: 2.5rem;
          min-height: 2.5rem;

          display: flex;

          flex-direction: column;

          align-items: center;
          justify-content: center;

          gap:
            0.3125rem;

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

          font: inherit;

          cursor: pointer;

          appearance: none;

          pointer-events: auto;

          transition:
            background-color 0.2s ease,
            color 0.2s ease;
        }


        .sidebar-toggle-button:hover {

          background:
            hsl(0, 0%, 16%);
        }


        .sidebar-toggle-button:focus-visible {

          outline:
            0.125rem solid
            currentColor;

          outline-offset:
            0.125rem;
        }


        /* =====================================
           ICONO HAMBURGUESA
        ===================================== */

        .sidebar-toggle-button span {

          display: block;

          width: 1.25rem;
          height: 0.125rem;

          flex:
            0 0 auto;

          background:
            currentColor;

          border-radius:
            0.125rem;
        }


        /* =====================================
           TEMA CLARO
        ===================================== */

        :host([data-theme="light"]) {

          color:
            hsl(0, 0%, 10%);
        }


        :host([data-theme="light"])
        .sidebar-header {

          background:
            hsl(0, 0%, 98%);

          border-bottom-color:
            hsl(0, 0%, 84%);

          color:
            hsl(0, 0%, 10%);
        }


        :host([data-theme="light"])
        .sidebar-toggle-button {

          color:
            hsl(0, 0%, 15%);
        }


        :host([data-theme="light"])
        .sidebar-toggle-button:hover {

          background:
            hsl(0, 0%, 91%);
        }


        /* =====================================
           SIDEBAR CONTRAÍDO
        ===================================== */

        :host([collapsed])
        .sidebar-header {

          justify-content:
            center;

          padding:
            0 3.75rem;
        }


        :host([collapsed])
        .sidebar-logo-container {

          display: none;
        }


        :host([collapsed])
        .sidebar-toggle-container {

          top: 50%;

          right: 50%;

          transform:
            translate(
              50%,
              -50%
            );
        }


        /* =====================================
           TABLET / MÓVIL
        ===================================== */

        @media (max-width: 64rem) {

          :host {

            height: 4rem;

            flex-basis:
              4rem;
          }


          .sidebar-header {

            padding:
              0 4rem 0 1.25rem;
          }


          /*
             En móvil el sidebar funciona como drawer.

             El estado collapsed no tiene efecto
             visual porque ChatSidebar normaliza
             ese estado automáticamente.
          */

          :host([collapsed])
          .sidebar-header {

            justify-content:
              flex-start;

            padding:
              0 4rem 0 1.25rem;
          }


          :host([collapsed])
          .sidebar-logo-container {

            display: flex;
          }


          :host([collapsed])
          .sidebar-toggle-container {

            top: 50%;

            right: 1rem;

            transform:
              translateY(-50%);
          }
        }


        /* =====================================
           MÓVIL PEQUEÑO
        ===================================== */

        @media (max-width: 48rem) {

          :host {

            height: 3.875rem;

            flex-basis:
              3.875rem;
          }


          .sidebar-header {

            padding:
              0 3.75rem 0 1rem;
          }


          :host([collapsed])
          .sidebar-header {

            padding:
              0 3.75rem 0 1rem;
          }


          .sidebar-toggle-container {

            right: 0.875rem;
          }
        }


        /* =====================================
           MÓVIL PEQUEÑO
        ===================================== */

        @media (max-width: 30rem) {

          :host {

            height: 3.75rem;

            flex-basis:
              3.75rem;
          }


          .sidebar-header {

            padding:
              0 3.625rem 0 0.75rem;
          }


          .sidebar-toggle-container {

            width: 2.375rem;

            height: 2.375rem;

            min-width: 2.375rem;

            min-height: 2.375rem;

            right: 0.75rem;
          }


          .sidebar-toggle-button {

            width: 2.375rem;
            height: 2.375rem;

            min-width: 2.375rem;
            min-height: 2.375rem;
          }


          :host([collapsed])
          .sidebar-header {

            padding:
              0 3.625rem 0 0.75rem;
          }
        }


        /* =====================================
           MÓVIL MUY PEQUEÑO
        ===================================== */

        @media (max-width: 22rem) {

          :host {

            height: 3.5rem;

            flex-basis:
              3.5rem;
          }


          .sidebar-header {

            padding:
              0 3.5rem 0 0.625rem;
          }


          .sidebar-toggle-container {

            width: 2.25rem;

            height: 2.25rem;

            min-width: 2.25rem;

            min-height: 2.25rem;

            right: 0.625rem;
          }


          .sidebar-toggle-button {

            width: 2.25rem;
            height: 2.25rem;

            min-width: 2.25rem;
            min-height: 2.25rem;
          }


          :host([collapsed])
          .sidebar-header {

            padding:
              0 3.5rem 0 0.625rem;
          }
        }


        /* =====================================
           POCA ALTURA
        ===================================== */

        @media (max-height: 40rem) {

          :host {

            height: 3.5rem;

            flex-basis:
              3.5rem;
          }
        }


        /* =====================================
           POCA ALTURA + MÓVIL
        ===================================== */

        @media (max-width: 64rem)
        and (max-height: 40rem) {

          :host {

            height: 3.375rem;

            flex-basis:
              3.375rem;
          }
        }


        /* =====================================
           PANTALLAS GRANDES
        ===================================== */

        @media (min-width: 120rem) {

          .sidebar-header {

            padding:
              0 4.375rem 0 1.25rem;
          }
        }

      </style>


      <header class="sidebar-header">


        <!-- ===============================
             CONTENIDO DEL HEADER
        ================================ -->

        <div class="sidebar-logo-container">

          <slot></slot>

        </div>


        <!-- ===============================
             BOTÓN SIDEBAR
        ================================ -->

        <div class="sidebar-toggle-container">

          <button
            type="button"
            class="sidebar-toggle-button"
            aria-label="Plegar menú lateral"
            aria-expanded="true">

            <span></span>
            <span></span>
            <span></span>

          </button>

        </div>


      </header>

    `;


    /* =====================================
       REFERENCIAS
    ===================================== */

    this.toggleButton =
      this.shadowRoot.querySelector(
        ".sidebar-toggle-button"
      );


    /* =====================================
       EVENTOS
    ===================================== */

    this.handleToggle =
      this.handleToggle.bind(this);


    /* =====================================
       OBSERVADOR
    ===================================== */

    this.sidebarObserver = null;

  }


  /* =====================================
     COMPONENTE CONECTADO
  ===================================== */

  connectedCallback() {

    this.toggleButton.addEventListener(
      "click",
      this.handleToggle
    );


    this.syncWithSidebar();

    this.observeSidebar();

  }


  /* =====================================
     COMPONENTE DESCONECTADO
  ===================================== */

  disconnectedCallback() {

    this.toggleButton.removeEventListener(
      "click",
      this.handleToggle
    );


    if (this.sidebarObserver) {

      this.sidebarObserver.disconnect();

      this.sidebarObserver = null;
    }

  }


  /* =====================================
     BOTÓN DEL SIDEBAR
  ===================================== */

  handleToggle() {

    this.dispatchEvent(
      new CustomEvent(
        "sidebar-toggle-request",
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
      this.closest("chat-sidebar");


    if (!sidebar) {

      return;
    }


    /* =================================
       TEMA
    ================================= */

    const theme =
      sidebar.getAttribute(
        "data-theme"
      );


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


    /* =================================
       ESTADO CONTRAÍDO
    ================================= */

    if (
      sidebar.hasAttribute(
        "collapsed"
      )
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
       ESTADO ACCESIBLE DEL BOTÓN
    ================================= */

    this.updateButtonState();

  }


  /* =====================================
     ACTUALIZAR BOTÓN
  ===================================== */

  updateButtonState() {

    if (!this.toggleButton) {

      return;
    }


    const collapsed =
      this.hasAttribute(
        "collapsed"
      );


    this.toggleButton.setAttribute(
      "aria-expanded",
      String(!collapsed)
    );


    this.toggleButton.setAttribute(
      "aria-label",
      collapsed
        ? "Desplegar menú lateral"
        : "Plegar menú lateral"
    );

  }


  /* =====================================
     OBSERVAR CAMBIOS DEL SIDEBAR
  ===================================== */

  observeSidebar() {

    const sidebar =
      this.closest("chat-sidebar");


    if (!sidebar) {

      return;
    }


    if (this.sidebarObserver) {

      this.sidebarObserver.disconnect();

    }


    this.sidebarObserver =
      new MutationObserver(
        (mutations) => {

          const relevantChange =
            mutations.some(
              (mutation) =>
                mutation.type === "attributes" &&
                (
                  mutation.attributeName ===
                  "data-theme" ||

                  mutation.attributeName ===
                  "collapsed"
                )
            );


          if (relevantChange) {

            this.syncWithSidebar();

          }

        }
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

}


customElements.define("chat-sidebar-header", ChatSidebarHeader);