class ChatHistory extends HTMLElement {

  constructor() {

    super();

    this.attachShadow({
      mode: "open"
    });

    this.shadowRoot.innerHTML = /* html */ `

      <style>

        /* =====================================
           CONTENEDOR
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

          color: hsl(0, 0%, 96%);

          transition:
            color 0.3s ease;
        }


        /* =====================================
           HISTORIAL
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
          display: flex;

          width: 100%;
          height: auto;

          min-width: 0;

          align-items: center;

          gap: 0.625rem;

          padding: 0.75rem 0.9375rem;

          margin: 0 0 0.75rem 0;

          flex-shrink: 0;

          border: 0.0625rem solid hsl(0, 0%, 22%);

          border-radius: 0.5rem;

          background: hsl(0, 0%, 13%);

          color: hsl(0, 0%, 96%);

          font-family: inherit;

          font-size: 0.875rem;

          font-weight: 400;

          line-height: 1.4;

          text-align: left;

          cursor: pointer;

          box-sizing: border-box;

          transition:
            background-color 0.3s ease,
            border-color 0.3s ease,
            color 0.3s ease;
        }


        .chat-history-button:hover {
          background: hsl(0, 0%, 17%);

          border-color: hsl(0, 0%, 28%);

          color: hsl(0, 0%, 96%);
        }


        .chat-history-button:active {
          background: hsl(0, 0%, 19%);
        }


        .chat-history-button:focus-visible {
          outline: 0.125rem solid hsl(0, 0%, 70%);

          outline-offset: 0.125rem;
        }


        /* =====================================
           ICONO
        ===================================== */

        .chat-history-icon {
          position: relative;

          display: block;

          width: 1rem;
          height: 1rem;

          min-width: 1rem;
          min-height: 1rem;

          border: 0.0625rem solid currentColor;

          border-radius: 0.1875rem;

          box-sizing: border-box;

          flex-shrink: 0;
        }


        .chat-history-icon::before,
        .chat-history-icon::after {
          content: "";

          position: absolute;

          left: 0.1875rem;

          width: 0.5rem;

          height: 0.0625rem;

          background: currentColor;

          border-radius: 0.0625rem;
        }


        .chat-history-icon::before {
          top: 0.3125rem;
        }


        .chat-history-icon::after {
          top: 0.5625rem;
        }


        /* =====================================
           TEXTO
        ===================================== */

        .chat-history-title {
          display: block;

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

          gap: 0.1875rem;

          overflow-x: hidden;
          overflow-y: auto;

          box-sizing: border-box;

          scrollbar-width: thin;

          scrollbar-color:
            hsl(0, 0%, 28%)
            transparent;
        }


        .chat-history-list::-webkit-scrollbar {
          width: 0.375rem;
        }


        .chat-history-list::-webkit-scrollbar-track {
          background: transparent;
        }


        .chat-history-list::-webkit-scrollbar-thumb {
          background: hsl(0, 0%, 28%);

          border-radius: 0.5rem;
        }


        .chat-history-list::-webkit-scrollbar-thumb:hover {
          background: hsl(0, 0%, 38%);
        }


        /* =====================================
           ENTRADAS
        ===================================== */

        .chat-history-item {
          width: 100%;

          min-width: 0;

          flex-shrink: 0;
        }


        .chat-history-link {
          display: block;

          width: 100%;

          min-width: 0;

          padding: 0.3rem 0.4rem;

          border: 0;

          border-radius: 0.4375rem;

          background: transparent;

          color: hsl(0, 0%, 70%);

          font-family: inherit;

          font-size: 0.875rem;

          font-weight: 400;

          line-height: 1.4;

          text-decoration: none;

          overflow: hidden;

          white-space: nowrap;

          text-overflow: ellipsis;

          box-sizing: border-box;

          cursor: pointer;

          transition:
            background-color 0.3s ease,
            color 0.3s ease;
        }


        .chat-history-link:hover {
          background: hsl(0, 0%, 14%);

          color: hsl(0, 0%, 96%);
        }


        .chat-history-link:focus-visible {
          outline: 0.125rem solid hsl(0, 0%, 70%);

          outline-offset: -0.0625rem;
        }


        /* =====================================
           TEMA CLARO
        ===================================== */

        :host([data-theme="light"]) {
          color: hsl(0, 0%, 10%);
        }


        :host([data-theme="light"]) .chat-history-button {
          background: hsl(0, 0%, 94%);

          border-color: hsl(0, 0%, 82%);

          color: hsl(0, 0%, 15%);
        }


        :host([data-theme="light"]) .chat-history-button:hover {
          background: hsl(0, 0%, 90%);

          border-color: hsl(0, 0%, 76%);
        }


        :host([data-theme="light"]) .chat-history-button:active {
          background: hsl(0, 0%, 87%);
        }


        :host([data-theme="light"]) .chat-history-link {
          color: hsl(0, 0%, 35%);
        }


        :host([data-theme="light"]) .chat-history-link:hover {
          background: hsl(0, 0%, 92%);

          color: hsl(0, 0%, 10%);
        }


        :host([data-theme="light"]) .chat-history-list {
          scrollbar-color:
            hsl(0, 0%, 72%)
            transparent;
        }


        /* =====================================
           ESCRITORIO PLEGADO
        ===================================== */

        :host([collapsed]) .chat-history-button {
          width: 2.625rem;
          height: 2.625rem;

          min-width: 2.625rem;
          min-height: 2.625rem;

          justify-content: center;

          gap: 0;

          padding: 0;

          margin: 0 auto 0.75rem auto;

          border-radius: 0.5rem;
        }


        :host([collapsed]) .chat-history-title {
          display: none;
        }


        :host([collapsed]) .chat-history-list {
          display: none;
        }


        /* =====================================
           TABLET / MÓVIL
        ===================================== */

        @media (max-width: 64rem) {

          .chat-history-button {
            width: 100%;
            height: auto;

            justify-content: flex-start;

            gap: 0.625rem;

            padding: 0.75rem 0.9375rem;

            margin: 0 0 0.75rem 0;

            border-radius: 0.5rem;
          }


          .chat-history-title {
            display: block;
          }


          .chat-history-list {
            display: flex;

            gap: 0.1875rem;
          }


          :host([collapsed]) .chat-history-button {
            width: 100%;
            height: auto;

            min-width: 0;
            min-height: 0;

            justify-content: flex-start;

            gap: 0.625rem;

            padding: 0.75rem 0.9375rem;

            margin: 0 0 0.75rem 0;

            border-radius: 0.5rem;
          }


          :host([collapsed]) .chat-history-title {
            display: block;
          }


          :host([collapsed]) .chat-history-list {
            display: flex;
          }
        }


        /* =====================================
           MÓVIL
        ===================================== */

        @media (max-width: 30rem) {

          .chat-history-button {
            padding: 0.75rem;

            margin-bottom: 0.75rem;
          }


          .chat-history-link {
            padding: 0.4rem 0.5625rem;
          }


          :host([collapsed]) .chat-history-button {
            padding: 0.75rem;

            margin-bottom: 0.75rem;
          }
        }


        /* =====================================
           MÓVIL PEQUEÑO
        ===================================== */

        @media (max-width: 22rem) {

          .chat-history-button {
            padding: 0.6875rem 0.75rem;

            margin-bottom: 0.6875rem;
          }


          .chat-history-link {
            padding: 0.375rem 0.5rem;
          }


          :host([collapsed]) .chat-history-button {
            padding: 0.6875rem 0.75rem;

            margin-bottom: 0.6875rem;
          }
        }


        /* =====================================
           POCA ALTURA
        ===================================== */

        @media (max-height: 40rem) {

          .chat-history-button {
            margin-bottom: 0.625rem;
          }
        }

      </style>


      <div class="chat-history">

        <button
          type="button"
          class="chat-history-button"
          aria-label="Historial de chats"
        >
          <span
            class="chat-history-icon"
            aria-hidden="true"
          ></span>

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

    this.historyButton =
      this.shadowRoot.querySelector(".chat-history-button");

    this.historyLinks =
      this.shadowRoot.querySelectorAll(".chat-history-link");

    this.handleHistoryButton =
      this.handleHistoryButton.bind(this);

    this.handleHistoryLink =
      this.handleHistoryLink.bind(this);
  }


  /* =====================================
     CONECTAR
  ===================================== */

  connectedCallback() {

    this.historyButton.addEventListener(
      "click",
      this.handleHistoryButton
    );

    this.historyLinks.forEach((link) => {

      link.addEventListener(
        "click",
        this.handleHistoryLink
      );

    });

    this.syncWithSidebar();
  }


  /* =====================================
     DESCONECTAR
  ===================================== */

  disconnectedCallback() {

    this.historyButton.removeEventListener(
      "click",
      this.handleHistoryButton
    );

    this.historyLinks.forEach((link) => {

      link.removeEventListener(
        "click",
        this.handleHistoryLink
      );

    });
  }


  /* =====================================
     BOTÓN HISTORIAL
  ===================================== */

  handleHistoryButton(event) {

    event.preventDefault();

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
     ENTRADAS HISTORIAL
  ===================================== */

  handleHistoryLink(event) {

    event.preventDefault();

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


    const theme =
      sidebar.getAttribute("data-theme") || "dark";


    const collapsed =
      sidebar.hasAttribute("collapsed");


    this.setAttribute(
      "data-theme",
      theme
    );


    if (collapsed) {

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