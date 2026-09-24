class ChatWelcome extends HTMLElement {

  constructor() {

    super();

    this.attachShadow({
      mode: "open"
    });

    this.shadowRoot.innerHTML = /* html */ `

      <style>

        /* =====================================
           COMPONENTE BIENVENIDA
        ===================================== */

        :host {

          display: block;

          width: 100%;

          min-width: 0;

          box-sizing: border-box;

          color:
            hsl(0, 0%, 96%);

          transition:
            opacity 0.3s ease,
            color 0.3s ease;
        }


        /* =====================================
           CONTENEDOR
        ===================================== */

        .welcome-container {

          width: 100%;

          min-width: 0;

          display: flex;

          align-items: center;

          justify-content: center;

          box-sizing: border-box;

          padding: 24% 0 0 0;

          text-align: center;
        }


        /* =====================================
           TÍTULO
        ===================================== */

        .welcome-title {

          width: 100%;

          max-width:
            48rem;

          margin: 0;

          color:
            hsl(0, 0%, 96%);

          font-size:
            2rem;

          font-weight:
            500;

          line-height:
            1.35;

          transition:
            color 0.3s ease;
        }


        /* =====================================
           TEMA CLARO
        ===================================== */

        :host([data-theme="light"]) {

          color:
            hsl(0, 0%, 10%);
        }


        :host([data-theme="light"])
        .welcome-title {

          color:
            hsl(0, 0%, 10%);
        }


        /* =====================================
           CONVERSACIÓN CON MENSAJES
        ===================================== */

        :host([has-messages]) {

          display:
            none;
        }


        /* =====================================
           TABLET
        ===================================== */

        @media (max-width: 64rem) {

          .welcome-container {

            padding:
              0.875rem 1rem;
          }


          .welcome-title {

            font-size:
              1.75rem;

            line-height:
              1.35;
          }

        }


        /* =====================================
           MÓVIL
        ===================================== */

        @media (max-width: 48rem) {

          .welcome-container {

            padding:
              0.75rem 0.875rem;
          }


          .welcome-title {

            font-size:
              1.5rem;

            line-height:
              1.4;
          }

        }


        /* =====================================
           PANTALLAS PEQUEÑAS
        ===================================== */

        @media (max-width: 30rem) {

          .welcome-container {

            padding:
              0.625rem 0.75rem;
          }


          .welcome-title {

            font-size:
              1.375rem;

            line-height:
              1.4;
          }

        }


        /* =====================================
           PANTALLAS MUY PEQUEÑAS
        ===================================== */

        @media (max-width: 22rem) {

          .welcome-container {

            padding:
              0.5rem 0.625rem;
          }


          .welcome-title {

            font-size:
              1.25rem;

            line-height:
              1.4;
          }

        }


        /* =====================================
           ALTURA REDUCIDA
        ===================================== */

        @media (max-height: 40rem) {

          .welcome-container {

            padding:
              0.75rem 1rem;
          }


          .welcome-title {

            line-height:
              1.35;
          }

        }


        /* =====================================
           MÓVIL + ALTURA REDUCIDA
        ===================================== */

        @media (max-width: 30rem)
        and (max-height: 40rem) {

          .welcome-container {

            padding:
              0.625rem 0.75rem;
          }


          .welcome-title {

            line-height:
              1.4;
          }

        }

      </style>


      <div class="welcome-container">

        <h1 class="welcome-title">
          ¿Qué quieres hacer? Pregúntame lo que necesites
        </h1>

      </div>

    `;


    this.handleSidebarChange =
      this.handleSidebarChange.bind(this);

    this.sidebarObserver =
      null;

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

      this.sidebarObserver =
        null;

    }

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

  }


  /* =====================================
     OBSERVAR CAMBIOS DEL SIDEBAR
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
        attributes:
          true,

        attributeFilter: [
          "data-theme"
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

}


customElements.define("chat-welcome", ChatWelcome);