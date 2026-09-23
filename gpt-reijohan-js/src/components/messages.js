class ChatMessages extends HTMLElement {

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
            color 0.3s ease;
        }


        .messages-container {
          width: 100%;

          min-width: 0;

          display: flex;

          flex-direction: column;

          gap:
            1rem;

          color:
            hsl(0, 0%, 96%);

          transition:
            color 0.3s ease;
        }


        :host([data-theme="light"])
        .messages-container {

          color:
            hsl(0, 0%, 10%);
        }


        @media (max-width: 64rem) {

          .messages-container {
            gap:
              0.875rem;
          }

        }


        @media (max-width: 48rem) {

          .messages-container {
            gap:
              0.75rem;
          }

        }


        @media (max-width: 30rem) {

          .messages-container {
            gap:
              0.625rem;
          }

        }


        @media (max-width: 22rem) {

          .messages-container {
            gap:
              0.5rem;
          }

        }

      </style>


      <div class="messages-container"></div>

    `;


    this.messagesContainer =
      this.shadowRoot.querySelector(
        ".messages-container"
      );


    this.syncWithTheme();

  }


  connectedCallback() {

    this.syncWithTheme();

  }


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


  clear() {

    this.messagesContainer.innerHTML = "";

  }

}


customElements.define("chat-messages", ChatMessages);