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

          padding:
            2rem 0 1.5rem;

          box-sizing: border-box;

          text-align: center;

          transition:
            opacity 0.3s ease,
            transform 0.3s ease;
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
            1.5rem;

          font-weight: 500;

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

          display: none;
        }


        /* =====================================
           TABLET
        ===================================== */

        @media (max-width: 64rem) {

          .welcome-container {

            padding:
              1.5rem 0 1.25rem;
          }


          .welcome-title {

            font-size:
              1.375rem;
          }

        }


        /* =====================================
           MÓVIL
        ===================================== */

        @media (max-width: 48rem) {

          .welcome-container {

            padding:
              1.25rem 0 1rem;
          }


          .welcome-title {

            font-size:
              1.25rem;

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
              1rem 0 0.875rem;
          }


          .welcome-title {

            font-size:
              1.125rem;
          }

        }


        @media (max-width: 22rem) {

          .welcome-container {

            padding:
              0.875rem 0 0.75rem;
          }


          .welcome-title {

            font-size:
              1rem;
          }

        }


        /* =====================================
           ALTURA REDUCIDA
        ===================================== */

        @media (max-height: 40rem) {

          .welcome-container {

            padding:
              1.25rem 0 1rem;
          }

        }


        @media (max-width: 30rem)
        and (max-height: 40rem) {

          .welcome-container {

            padding:
              1rem 0 0.75rem;
          }

        }

      </style>


      <div class="welcome-container">

        <h1 class="welcome-title">
          ¿Qué quieres hacer? Pregúntame lo que necesites
        </h1>

      </div>

    `;


    this.handleAttributeChange =
      this.handleAttributeChange.bind(this);

    this.syncWithConversation();

  }


  /* =====================================
     CONECTAR COMPONENTE
  ===================================== */

  connectedCallback() {

    this.syncWithConversation();

    this.observeAttributes();

  }


  /* =====================================
     DESCONECTAR COMPONENTE
  ===================================== */

  disconnectedCallback() {

    if (this.attributeObserver) {

      this.attributeObserver.disconnect();

      this.attributeObserver = null;

    }

  }


  /* =====================================
     SINCRONIZAR CON LA CONVERSACIÓN
  ===================================== */

  syncWithConversation() {

    const theme =
      document.documentElement.getAttribute(
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
     OBSERVAR ATRIBUTOS DEL COMPONENTE
  ===================================== */

  observeAttributes() {

    if (this.attributeObserver) {

      this.attributeObserver.disconnect();

    }


    this.attributeObserver =
      new MutationObserver(
        this.handleAttributeChange
      );


    this.attributeObserver.observe(
      this,
      {
        attributes: true,

        attributeFilter: [
          "has-messages",
          "data-theme"
        ]
      }
    );

  }


  /* =====================================
     CAMBIO DE ATRIBUTO
  ===================================== */

  handleAttributeChange() {

    /*
      Los estilos reaccionan directamente
      a has-messages y data-theme.

      Este método queda preparado para
      cualquier sincronización adicional
      que necesitemos posteriormente.
    */

  }

}


customElements.define("chat-welcome", ChatWelcome);