class ChatNewButton extends HTMLElement {

  constructor() {

    super();

    this.attachShadow({
      mode: "open"
    });

    this.shadowRoot.innerHTML = /* html */ `

      <style>

        /* =====================================
           COMPONENTE NUEVA CONVERSACIÓN
        ===================================== */

        :host {
          display: block;

          width: 100%;
          min-width: 0;

          flex-shrink: 0;

          box-sizing: border-box;

          color:
            hsl(0, 0%, 96%);

          transition:
            color 0.3s ease;
        }


        /* =====================================
           CONTENEDOR
        ===================================== */

        .new-chat-container {
          width: 100%;
          min-width: 0;

          margin-bottom:
            1.25rem;

          box-sizing: border-box;

          font-weight: 700;
        }


        /* =====================================
           BOTÓN
        ===================================== */

        .new-chat-button {
          display: flex;
          align-items: center;

          width: 100%;
          min-width: 0;

          gap:
            0.625rem;

          padding:
            0.75rem 0.9375rem;

          box-sizing: border-box;

          color:
            hsl(0, 0%, 96%);

          background:
            hsl(0, 0%, 13%);

          border:
            0.0625rem solid
            hsl(0, 0%, 22%);

          border-radius:
            0.5rem;

          text-decoration: none;

          cursor: pointer;

          overflow: hidden;

          transition:
            background 0.2s ease,
            color 0.2s ease,
            border-color 0.2s ease,
            padding 0.3s ease,
            gap 0.3s ease;
        }


        .new-chat-button:hover {

          background:
            hsl(0, 0%, 17%);
        }


        /* =====================================
           ICONO
        ===================================== */

        .new-chat-icon-container {
          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;
        }


        .new-chat-icon {
          color:
            hsl(0, 0%, 100%);

          font-size:
            1.375rem;

          line-height:
            1;

          font-weight:
            400;
        }


        /* =====================================
           TEXTO
        ===================================== */

        .new-chat-text-container {
          min-width: 0;

          overflow: hidden;
        }


        .new-chat-text {
          display: block;

          min-width: 0;

          color: inherit;

          font-size:
            1rem;

          line-height:
            1.2;

          white-space:
            nowrap;

          overflow: hidden;

          text-overflow:
            ellipsis;
        }


        /* =====================================
           TEMA CLARO
        ===================================== */

        :host([data-theme="light"]) {

          color:
            hsl(0, 0%, 12%);
        }


        :host([data-theme="light"])
        .new-chat-button {

          color:
            hsl(0, 0%, 12%);

          background:
            hsl(0, 0%, 94%);

          border-color:
            hsl(0, 0%, 80%);
        }


        :host([data-theme="light"])
        .new-chat-button:hover {

          background:
            hsl(0, 0%, 89%);
        }


        :host([data-theme="light"])
        .new-chat-icon {

          color:
            hsl(0, 0%, 12%);
        }


        /* =====================================
           SIDEBAR COLAPSADO
        ===================================== */

        :host([collapsed])
        .new-chat-container {

          margin-bottom:
            0.9375rem;
        }


        :host([collapsed])
        .new-chat-button {

          width:
            2.625rem;

          height:
            2.625rem;

          justify-content:
            center;

          gap:
            0;

          padding:
            0;

          margin:
            0 auto;
        }


        :host([collapsed])
        .new-chat-text-container {

          display:
            none;
        }


        /* =====================================
           TABLET / MÓVIL
        ===================================== */

        @media (max-width: 64rem) {

          :host([collapsed])
          .new-chat-container {

            margin-bottom:
              1.25rem;
          }


          :host([collapsed])
          .new-chat-button {

            width: 100%;
            height: auto;

            justify-content:
              flex-start;

            gap:
              0.625rem;

            padding:
              0.75rem 0.9375rem;

            margin:
              0;
          }


          :host([collapsed])
          .new-chat-text-container {

            display:
              block;
          }

        }


        /* =====================================
           PANTALLAS PEQUEÑAS
        ===================================== */

        @media (max-width: 30rem) {

          .new-chat-button {

            padding:
              0.75rem;
          }

        }


        @media (max-width: 22rem) {

          .new-chat-button {

            padding:
              0.6875rem 0.75rem;
          }

        }


        /* =====================================
           ALTURA REDUCIDA
        ===================================== */

        @media (max-height: 40rem) {

          .new-chat-container {

            margin-bottom:
              1rem;
          }

        }


        @media (max-width: 64rem)
        and (max-height: 40rem) {

          .new-chat-container {

            margin-bottom:
              0.875rem;
          }

        }

      </style>


      <div class="new-chat-container">

        <a
          href="#"
          class="new-chat-button"
          aria-label="Nueva conversación">

          <div class="new-chat-icon-container">

            <span class="new-chat-icon">
              +
            </span>

          </div>


          <div class="new-chat-text-container">

            <span class="new-chat-text">
              Nueva conversación
            </span>

          </div>

        </a>

      </div>

    `;


    this.newChatButton =
      this.shadowRoot.querySelector(
        ".new-chat-button"
      );


    this.handleClick =
      this.handleClick.bind(this);

  }


  /* =====================================
     CONECTAR COMPONENTE
  ===================================== */

  connectedCallback() {

    this.newChatButton.addEventListener(
      "click",
      this.handleClick
    );

    this.syncWithSidebar();

  }


  /* =====================================
     DESCONECTAR COMPONENTE
  ===================================== */

  disconnectedCallback() {

    this.newChatButton.removeEventListener(
      "click",
      this.handleClick
    );

  }


  /* =====================================
     NUEVA CONVERSACIÓN
  ===================================== */

  handleClick(event) {

    event.preventDefault();

    this.dispatchEvent(
      new CustomEvent(
        "new-chat-request",
        {
          bubbles: true,
          composed: true
        }
      )
    );

  }


  /* =====================================
     SINCRONIZACIÓN CON SIDEBAR
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


    /* ---------- ESTADO COLAPSADO ---------- */

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


customElements.define("chat-new-button", ChatNewButton);