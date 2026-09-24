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

    this.handleSidebarChange =
      this.handleSidebarChange.bind(this);

    this.sidebarObserver = null;

  }


  /* =====================================
     COMPONENTE CONECTADO
  ===================================== */

  connectedCallback() {

    this.syncWithSidebar();

    this.observeSidebar();

  }


  /* =====================================
     COMPONENTE DESCONECTADO
  ===================================== */

  disconnectedCallback() {

    if (this.sidebarObserver) {

      this.sidebarObserver.disconnect();

      this.sidebarObserver = null;

    }

  }


  /* =====================================
     SINCRONIZAR TEMA
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
     OBSERVAR TEMA
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
          "data-theme"
        ]
      }
    );

  }


  /* =====================================
     CAMBIO DE TEMA
  ===================================== */

  handleSidebarChange() {

    this.syncWithSidebar();

  }


  /* =====================================
     LIMPIAR MENSAJES
  ===================================== */

  clear() {

    this.messagesContainer.innerHTML = "";

  }

}


customElements.define("chat-messages", ChatMessages);