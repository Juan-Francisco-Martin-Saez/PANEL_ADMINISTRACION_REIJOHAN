class ChatMessages extends HTMLElement {

  constructor() {

    super();

    this.attachShadow({
      mode: "open"
    });

    this.shadowRoot.innerHTML = /* html */ `

      <style>

        /* =====================================
           COMPONENTE MENSAJES
        ===================================== */

        :host {
          display: block;

          width: 100%;

          min-width: 0;

          box-sizing: border-box;

          color:
            hsl(0, 0%, 96%);

          transition:
            color 0.3s ease;
        }


        /* =====================================
           CONTENEDOR DE MENSAJES
        ===================================== */

        .messages-container {
          display: flex;
          flex-direction: column;

          width: 100%;

          min-width: 0;

          gap: 1rem;

          box-sizing: border-box;

          color:
            hsl(0, 0%, 96%);

          transition:
            color 0.3s ease;
        }


        /* =====================================
           TEMA CLARO
        ===================================== */

        :host([data-theme="light"])
        .messages-container {
          color:
            hsl(0, 0%, 10%);
        }


        /* =====================================
           TABLET
        ===================================== */

        @media (max-width: 64rem) {

          .messages-container {
            gap: 0.875rem;
          }

        }


        /* =====================================
           MÓVIL
        ===================================== */

        @media (max-width: 48rem) {

          .messages-container {
            gap: 0.75rem;
          }

        }


        /* =====================================
           MÓVIL PEQUEÑO
        ===================================== */

        @media (max-width: 30rem) {

          .messages-container {
            gap: 0.625rem;
          }

        }


        /* =====================================
           MÓVIL MUY PEQUEÑO
        ===================================== */

        @media (max-width: 22rem) {

          .messages-container {
            gap: 0.5rem;
          }

        }

      </style>


      <div class="messages-container"></div>

    `;


    /* =====================================
       REFERENCIAS
    ===================================== */

    this.messagesContainer =
      this.shadowRoot.querySelector(
        ".messages-container"
      );


    /* =====================================
       BIND
    ===================================== */

    this.handleThemeChange =
      this.handleThemeChange.bind(this);

  }


  /* =====================================
     COMPONENTE CONECTADO
  ===================================== */

  connectedCallback() {

    this.syncWithTheme();

    this.observeTheme();

  }


  /* =====================================
     COMPONENTE DESCONECTADO
  ===================================== */

  disconnectedCallback() {

    if (this.themeObserver) {

      this.themeObserver.disconnect();

      this.themeObserver = null;

    }

  }


  /* =====================================
     SINCRONIZAR TEMA
  ===================================== */

  syncWithTheme() {

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
     OBSERVAR TEMA
  ===================================== */

  observeTheme() {

    if (this.themeObserver) {

      this.themeObserver.disconnect();

    }


    this.themeObserver =
      new MutationObserver(
        this.handleThemeChange
      );


    this.themeObserver.observe(
      document.documentElement,
      {
        attributes: true,

        attributeFilter: [
          "data-theme"
        ]
      }
    );

  }


  /* =====================================
     CAMBIO DE TEMA
  ===================================== */

  handleThemeChange() {

    this.syncWithTheme();

  }


  /* =====================================
     LIMPIAR MENSAJES
  ===================================== */

  clear() {

    this.messagesContainer.innerHTML = "";

  }

}


customElements.define("chat-messages", ChatMessages);