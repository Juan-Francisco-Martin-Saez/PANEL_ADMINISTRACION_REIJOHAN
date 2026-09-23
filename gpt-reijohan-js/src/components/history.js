class ChatHistory extends HTMLElement {

  constructor() {

    super();

    this.attachShadow({
      mode: "open"
    });

    this.shadowRoot.innerHTML = /* html */ `

      <style>

        /* =====================================
           COMPONENTE HISTORIAL
        ===================================== */

        :host {
          display: flex;

          width: 100%;
          height: 100%;

          min-width: 0;
          min-height: 0;

          flex: 1 1 auto;

          overflow: hidden;

          box-sizing: border-box;

          color:
            hsl(0, 0%, 96%);

          transition:
            color 0.3s ease;
        }


        /* =====================================
           CONTENEDOR
        ===================================== */

        .chat-history {
          display: flex;
          flex-direction: column;

          width: 100%;
          height: 100%;

          min-width: 0;
          min-height: 0;

          overflow: hidden;

          box-sizing: border-box;
        }


        /* =====================================
           BOTÓN HISTORIAL
        ===================================== */

        .chat-history-button {
          display: none;

          width: 100%;

          min-width: 0;

          align-items: center;

          gap: 0.625rem;

          padding:
            0.625rem 0.75rem;

          flex-shrink: 0;

          border: 0;

          border-radius: 0.4375rem;

          background:
            transparent;

          color:
            hsl(0, 0%, 72%);

          font-family: inherit;

          font-size: 0.8125rem;

          text-align: left;

          cursor: pointer;

          box-sizing: border-box;

          transition:
            background-color 0.3s ease,
            color 0.3s ease;
        }


        .chat-history-button:hover {
          background:
            hsl(0, 0%, 11%);

          color:
            hsl(0, 0%, 96%);
        }


        /* =====================================
           ICONO HISTORIAL
        ===================================== */

        .chat-history-icon {
          position: relative;

          display: block;

          width: 1rem;
          height: 1rem;

          flex-shrink: 0;

          border:
            0.0625rem solid
            currentColor;

          border-radius:
            0.1875rem;
        }


        .chat-history-icon::before,
        .chat-history-icon::after {

          content: "";

          position: absolute;

          left: 0.1875rem;
          right: 0.1875rem;

          height: 0.0625rem;

          background:
            currentColor;
        }


        .chat-history-icon::before {
          top: 0.3125rem;
        }


        .chat-history-icon::after {
          top: 0.5625rem;
        }


        /* =====================================
           TÍTULO HISTORIAL
        ===================================== */

        .chat-history-title {
          min-width: 0;

          overflow: hidden;

          white-space: nowrap;

          text-overflow: ellipsis;
        }


        /* =====================================
           LISTA
        ===================================== */

        .chat-history-list {
          display: flex;
          flex-direction: column;

          width: 100%;
          height: 100%;

          min-width: 0;
          min-height: 0;

          flex: 1 1 auto;

          gap: 0.1875rem;

          overflow-x: hidden;
          overflow-y: scroll;

          box-sizing: border-box;

          scrollbar-width: thin;

          scrollbar-color:
            hsl(0, 0%, 32%)
            transparent;
        }


        .chat-history-list::-webkit-scrollbar {
          width: 0.45rem;
        }


        .chat-history-list::-webkit-scrollbar-track {
          background:
            transparent;

          margin:
            0.25rem 0;
        }


        .chat-history-list::-webkit-scrollbar-thumb {
          background:
            hsl(0, 0%, 28%);

          border:
            0.1rem solid
            transparent;

          border-radius:
            1rem;

          background-clip:
            padding-box;
        }


        .chat-history-list::-webkit-scrollbar-thumb:hover {
          background:
            hsl(0, 0%, 45%);

          border:
            0.1rem solid
            transparent;

          background-clip:
            padding-box;
        }


        /* =====================================
           ELEMENTO DEL HISTORIAL
        ===================================== */

        .chat-history-item {
          width: 100%;

          min-width: 0;

          flex-shrink: 0;

          box-sizing: border-box;
        }


        /* =====================================
           ENLACE
        ===================================== */

        .chat-history-link {
          display: block;

          width: 100%;

          min-width: 0;

          padding:
            0.625rem;

          box-sizing: border-box;

          border-radius:
            0.4375rem;

          overflow: hidden;

          color:
            hsl(0, 0%, 70%);

          text-decoration: none;

          font-size: 0.875rem;

          line-height: 1.4;

          white-space: nowrap;

          text-overflow: ellipsis;

          transition:
            background-color 0.2s ease,
            color 0.2s ease;
        }


        .chat-history-link:hover {
          background:
            hsl(0, 0%, 14%);

          color:
            hsl(0, 0%, 100%);
        }


        /* =====================================
           TEMA CLARO
        ===================================== */

        :host([data-theme="light"]) {
          color:
            hsl(0, 0%, 10%);
        }


        :host([data-theme="light"])
        .chat-history-button {
          color:
            hsl(0, 0%, 35%);
        }


        :host([data-theme="light"])
        .chat-history-button:hover {
          background:
            hsl(0, 0%, 91%);

          color:
            hsl(0, 0%, 8%);
        }


        :host([data-theme="light"])
        .chat-history-list {
          scrollbar-color:
            hsl(0, 0%, 55%)
            transparent;
        }


        :host([data-theme="light"])
        .chat-history-list::-webkit-scrollbar-thumb {
          background:
            hsl(0, 0%, 55%);

          border-color:
            transparent;
        }


        :host([data-theme="light"])
        .chat-history-list::-webkit-scrollbar-thumb:hover {
          background:
            hsl(0, 0%, 45%);

          border-color:
            transparent;
        }


        :host([data-theme="light"])
        .chat-history-link {
          color:
            hsl(0, 0%, 38%);
        }


        :host([data-theme="light"])
        .chat-history-link:hover {
          background:
            hsl(0, 0%, 91%);

          color:
            hsl(0, 0%, 5%);
        }


        /* =====================================
           SIDEBAR CONTRAÍDO
        ===================================== */

        :host([collapsed])
        .chat-history-list {
          display: none;
        }


        :host([collapsed])
        .chat-history-button {
          display: flex;

          width: 2.625rem;
          height: 2.625rem;

          justify-content: center;

          margin: 0 auto;

          padding: 0;
        }


        :host([collapsed])
        .chat-history-title {
          display: none;
        }


        /* =====================================
           TABLET / MÓVIL
        ===================================== */

        @media (max-width: 64rem) {

          .chat-history-button {
            display: flex;
          }


          .chat-history-list {
            display: flex;
          }


          /*
             Aunque el atributo collapsed pueda
             seguir presente internamente, en móvil
             el historial permanece visible.
          */

          :host([collapsed])
          .chat-history-list {
            display: flex;
          }


          :host([collapsed])
          .chat-history-button {
            width: 100%;
            height: auto;

            justify-content: flex-start;

            margin: 0;

            padding:
              0.625rem 0.75rem;
          }


          :host([collapsed])
          .chat-history-title {
            display: block;
          }

        }


        /* =====================================
           MÓVIL PEQUEÑO
        ===================================== */

        @media (max-width: 30rem) {

          .chat-history-item {
            padding:
              0.125rem 0.625rem;
          }


          .chat-history-link {
            padding:
              0.5rem 0.5625rem;
          }

        }


        /* =====================================
           MÓVIL MUY PEQUEÑO
        ===================================== */

        @media (max-width: 22rem) {

          .chat-history-item {
            padding:
              0.125rem 0.5rem;
          }

        }

      </style>


      <div class="chat-history">

        <button
          type="button"
          class="chat-history-button"
          aria-label="Historial de chats">

          <span
            class="chat-history-icon"
            aria-hidden="true">
          </span>

          <span class="chat-history-title">
            Historial de chats
          </span>

        </button>


        <div class="chat-history-list">

          <div class="chat-history-item">
            <a href="#" class="chat-history-link">
              Conversación sobre desarrollo web y user-avatar-container
            </a>
          </div>

          <div class="chat-history-item">
            <a href="#" class="chat-history-link">
              Ideas para mi nuevo proyecto de iniciación a la programación en Python.
            </a>
          </div>

          <div class="chat-history-item">
            <a href="#" class="chat-history-link">
              Preguntas sobre HTML y CSS
            </a>
          </div>

          <div class="chat-history-item">
            <a href="#" class="chat-history-link">
              Diseño de interfaz para aplicación
            </a>
          </div>

          <div class="chat-history-item">
            <a href="#" class="chat-history-link">
              Conversación especialmente larga cuyo nombre debe cortarse automáticamente
            </a>
          </div>


          <div class="chat-history-item">
            <a href="#" class="chat-history-link">
              Conversación sobre desarrollo web y user-avatar-container
            </a>
          </div>

          <div class="chat-history-item">
            <a href="#" class="chat-history-link">
              Ideas para mi nuevo proyecto de iniciación a la programación en Python.
            </a>
          </div>

          <div class="chat-history-item">
            <a href="#" class="chat-history-link">
              Preguntas sobre HTML y CSS
            </a>
          </div>

          <div class="chat-history-item">
            <a href="#" class="chat-history-link">
              Diseño de interfaz para aplicación
            </a>
          </div>

          <div class="chat-history-item">
            <a href="#" class="chat-history-link">
              Conversación especialmente larga cuyo nombre debe cortarse automáticamente
            </a>
          </div>


          <div class="chat-history-item">
            <a href="#" class="chat-history-link">
              Conversación sobre desarrollo web y user-avatar-container
            </a>
          </div>

          <div class="chat-history-item">
            <a href="#" class="chat-history-link">
              Ideas para mi nuevo proyecto de iniciación a la programación en Python.
            </a>
          </div>

          <div class="chat-history-item">
            <a href="#" class="chat-history-link">
              Preguntas sobre HTML y CSS
            </a>
          </div>

          <div class="chat-history-item">
            <a href="#" class="chat-history-link">
              Diseño de interfaz para aplicación
            </a>
          </div>

          <div class="chat-history-item">
            <a href="#" class="chat-history-link">
              Conversación especialmente larga cuyo nombre debe cortarse automáticamente
            </a>
          </div>


          <div class="chat-history-item">
            <a href="#" class="chat-history-link">
              Conversación sobre desarrollo web y user-avatar-container
            </a>
          </div>

          <div class="chat-history-item">
            <a href="#" class="chat-history-link">
              Ideas para mi nuevo proyecto de iniciación a la programación en Python.
            </a>
          </div>

          <div class="chat-history-item">
            <a href="#" class="chat-history-link">
              Preguntas sobre HTML y CSS
            </a>
          </div>

          <div class="chat-history-item">
            <a href="#" class="chat-history-link">
              Diseño de interfaz para aplicación
            </a>
          </div>

          <div class="chat-history-item">
            <a href="#" class="chat-history-link">
              Conversación especialmente larga cuyo nombre debe cortarse automáticamente
            </a>
          </div>


          <div class="chat-history-item">
            <a href="#" class="chat-history-link">
              Conversación sobre desarrollo web y user-avatar-container
            </a>
          </div>

          <div class="chat-history-item">
            <a href="#" class="chat-history-link">
              Ideas para mi nuevo proyecto de iniciación a la programación en Python.
            </a>
          </div>

          <div class="chat-history-item">
            <a href="#" class="chat-history-link">
              Preguntas sobre HTML y CSS
            </a>
          </div>

          <div class="chat-history-item">
            <a href="#" class="chat-history-link">
              Diseño de interfaz para aplicación
            </a>
          </div>

          <div class="chat-history-item">
            <a href="#" class="chat-history-link">
              Conversación especialmente larga cuyo nombre debe cortarse automáticamente
            </a>
          </div>

        </div>

      </div>

    `;


    /* =====================================
       REFERENCIAS
    ===================================== */

    this.historyButton =
      this.shadowRoot.querySelector(
        ".chat-history-button"
      );

    this.historyLinks =
      this.shadowRoot.querySelectorAll(
        ".chat-history-link"
      );


    /* =====================================
       BIND DE EVENTOS
    ===================================== */

    this.handleHistoryButton =
      this.handleHistoryButton.bind(this);

    this.handleHistoryLink =
      this.handleHistoryLink.bind(this);

  }


  /* =====================================
     COMPONENTE CONECTADO
  ===================================== */

  connectedCallback() {

    this.historyButton.addEventListener(
      "click",
      this.handleHistoryButton
    );


    this.historyLinks.forEach(
      link => {

        link.addEventListener(
          "click",
          this.handleHistoryLink
        );

      }
    );


    this.syncWithSidebar();

  }


  /* =====================================
     COMPONENTE DESCONECTADO
  ===================================== */

  disconnectedCallback() {

    this.historyButton.removeEventListener(
      "click",
      this.handleHistoryButton
    );


    this.historyLinks.forEach(
      link => {

        link.removeEventListener(
          "click",
          this.handleHistoryLink
        );

      }
    );

  }


  /* =====================================
     BOTÓN HISTORIAL
  ===================================== */

  handleHistoryButton(event) {

    event.preventDefault();


    /*
       En escritorio el botón aparece cuando
       el sidebar está contraído.

       Al pulsarlo solicita al sidebar
       que vuelva a abrirse.

       En móvil el historial permanece visible.
    */

    if (
      window.innerWidth > 1024 &&
      this.hasAttribute("collapsed")
    ) {

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

  }


  /* =====================================
     ENLACE HISTORIAL
  ===================================== */

  handleHistoryLink(event) {

    event.preventDefault();


    /*
       En móvil seleccionar una conversación
       solicita cerrar el drawer.

       En escritorio no se modifica el sidebar.
    */

    if (window.innerWidth <= 1024) {

      this.dispatchEvent(
        new CustomEvent(
          "sidebar-close-request",
          {
            bubbles: true,
            composed: true
          }
        )
      );

    }

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


    /* ---------- TEMA ---------- */

    const theme =
      sidebar.getAttribute(
        "data-theme"
      );


    if (theme) {

      this.setAttribute(
        "data-theme",
        theme
      );

    } else {

      this.removeAttribute(
        "data-theme"
      );

    }


    /* ---------- CONTRAÍDO ---------- */

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

  }

}


customElements.define("chat-history", ChatHistory);