class ChatWelcome extends HTMLElement {

  constructor() {

    super();

    this.attachShadow({
      mode: "open"
    });

    this.shadowRoot.innerHTML = /* html */ `

      <style>

        :host {
          display: block;

          width: 100%;

          min-width: 0;

          color:
            hsl(0, 0%, 96%);

          transition:
            opacity 0.3s ease,
            color 0.3s ease;
        }


        .welcome-container {
          width: 100%;

          min-width: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          padding:
            2rem 0 1.5rem;

          text-align: center;

          transition:
            opacity 0.3s ease,
            transform 0.3s ease;
        }


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


        :host([data-theme="light"]) {

          color:
            hsl(0, 0%, 10%);
        }


        :host([data-theme="light"])
        .welcome-title {

          color:
            hsl(0, 0%, 10%);
        }


        :host([has-messages]) {

          display: none;
        }


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

      </style>


      <div class="welcome-container">

        <h1 class="welcome-title">
          ¿Qué quieres hacer? Pregúntame lo que necesites
        </h1>

      </div>

    `;


    this.syncWithChatApp();

  }


  connectedCallback() {

    this.syncWithChatApp();

  }


  syncWithChatApp() {

    const chatApp =
      this.closest(".chat-app");


    if (!chatApp) {
      return;
    }


    if (
      chatApp.classList.contains(
        "chat-has-messages"
      )
    ) {

      this.setAttribute(
        "has-messages",
        ""
      );

    } else {

      this.removeAttribute(
        "has-messages"
      );

    }


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

}


customElements.define("chat-welcome", ChatWelcome);