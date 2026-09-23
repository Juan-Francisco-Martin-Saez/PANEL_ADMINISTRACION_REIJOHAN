class ChatNewButton extends HTMLElement {

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

          flex-shrink: 0;

          color:
            hsl(0, 0%, 96%);

          transition:
            color 0.3s ease;
        }


        .new-chat-container {
          width: 100%;

          padding:
            1rem 0.75rem;
        }


        .new-chat-button {
          width: 100%;

          min-height: 2.75rem;

          display: flex;
          align-items: center;

          gap: 0.75rem;

          padding:
            0.625rem 0.75rem;

          border:
            0.0625rem solid
            hsl(0, 0%, 24%);

          border-radius:
            0.5rem;

          background:
            hsl(0, 0%, 10%);

          color:
            hsl(0, 0%, 96%);

          text-decoration: none;

          cursor: pointer;

          overflow: hidden;

          transition:
            background-color 0.3s ease,
            border-color 0.3s ease,
            color 0.3s ease,
            padding 0.3s ease,
            gap 0.3s ease;
        }


        .new-chat-button:hover {
          background:
            hsl(0, 0%, 14%);

          border-color:
            hsl(0, 0%, 32%);
        }


        .new-chat-icon-container {
          width: 1.5rem;
          height: 1.5rem;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;
        }


        .new-chat-icon {
          font-size: 1.5rem;
          line-height: 1;

          font-weight: 300;
        }


        .new-chat-text-container {
          min-width: 0;

          flex: 1;

          overflow: hidden;

          transition:
            opacity 0.2s ease,
            width 0.3s ease;
        }


        .new-chat-text {
          display: block;

          white-space: nowrap;

          overflow: hidden;

          text-overflow: ellipsis;

          font-size: 0.875rem;
          line-height: 1.3;
        }


        :host([data-theme="light"]) {

          color:
            hsl(0, 0%, 10%);
        }


        :host([data-theme="light"])
        .new-chat-button {

          background:
            hsl(0, 0%, 96%);

          border-color:
            hsl(0, 0%, 82%);

          color:
            hsl(0, 0%, 10%);
        }


        :host([data-theme="light"])
        .new-chat-button:hover {

          background:
            hsl(0, 0%, 92%);

          border-color:
            hsl(0, 0%, 72%);
        }


        :host([collapsed])
        .new-chat-container {

          padding:
            1rem 0.625rem;
        }


        :host([collapsed])
        .new-chat-button {

          justify-content: center;

          gap: 0;

          padding:
            0.625rem;
        }


        :host([collapsed])
        .new-chat-text-container {

          width: 0;

          flex: 0 0 0;

          opacity: 0;
        }


        @media (max-width: 64rem) {

          .new-chat-container {

            padding:
              1rem 0.75rem;
          }


          .new-chat-button {

            min-height: 2.75rem;
          }


          :host([collapsed])
          .new-chat-container {

            padding:
              1rem 0.75rem;
          }


          :host([collapsed])
          .new-chat-button {

            justify-content: flex-start;

            gap: 0.75rem;

            padding:
              0.625rem 0.75rem;
          }


          :host([collapsed])
          .new-chat-text-container {

            width: auto;

            flex: 1;

            opacity: 1;
          }

        }


        @media (max-width: 30rem) {

          .new-chat-container {

            padding:
              0.75rem;
          }

        }


        @media (max-width: 22rem) {

          .new-chat-container {

            padding:
              0.625rem 0.75rem;
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


  connectedCallback() {

    this.newChatButton.addEventListener(
      "click",
      this.handleClick
    );

    this.syncWithSidebar();

  }


  disconnectedCallback() {

    this.newChatButton.removeEventListener(
      "click",
      this.handleClick
    );

  }


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


  syncWithSidebar() {

    const sidebar =
      this.closest("chat-sidebar");


    if (!sidebar) {
      return;
    }


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