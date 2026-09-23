class ChatHeader extends HTMLElement {

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


        .chat-header {
          width: 100%;
          height: 4.375rem;

          display: flex;
          align-items: center;

          padding:
            0 1.25rem;

          background:
            hsl(0, 0%, 9%);

          border-bottom:
            0.0625rem solid
            hsl(0, 0%, 19%);

          color:
            hsl(0, 0%, 96%);

          transition:
            background-color 0.3s ease,
            border-color 0.3s ease,
            color 0.3s ease;
        }


        .mobile-menu-container {
          display: none;

          width: 2.5rem;

          flex-shrink: 0;
        }


        .mobile-menu-button {
          width: 2.25rem;
          height: 2.25rem;

          display: flex;
          flex-direction: column;

          align-items: center;
          justify-content: center;

          gap: 0.25rem;

          border-radius:
            0.375rem;

          cursor: pointer;

          transition:
            background-color 0.3s ease;
        }


        .mobile-menu-button:hover {
          background:
            hsl(0, 0%, 14%);
        }


        .mobile-menu-button span {
          display: block;

          width: 1.125rem;
          height: 0.125rem;

          border-radius:
            999rem;

          background:
            currentColor;
        }


        .chat-header-title-container {
          min-width: 0;

          flex: 1;

          display: flex;
          align-items: center;
        }


        .chat-header-title {
          display: block;

          min-width: 0;

          overflow: hidden;

          white-space: nowrap;

          text-overflow: ellipsis;

          font-size:
            0.9375rem;

          font-weight: 500;

          line-height: 1.3;
        }


        .chat-header-logo-container {
          width: auto;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: flex-end;

          margin-left: 1rem;
        }


        .chat-header-logo {
          display: block;

          width: auto;
          height: 2rem;

          max-width: 10rem;

          object-fit: contain;

          transition:
            opacity 0.3s ease;
        }


        :host([data-theme="light"]) {

          color:
            hsl(0, 0%, 10%);
        }


        :host([data-theme="light"])
        .chat-header {

          background:
            hsl(0, 0%, 98%);

          border-bottom-color:
            hsl(0, 0%, 84%);

          color:
            hsl(0, 0%, 10%);
        }


        :host([data-theme="light"])
        .mobile-menu-button:hover {

          background:
            hsl(0, 0%, 92%);
        }


        @media (max-width: 64rem) {

          .chat-header {

            height: 4rem;

            padding:
              0 1rem;
          }


          .mobile-menu-container {

            display: block;
          }


          .chat-header-logo {

            height: 1.875rem;

            max-width: 8.5rem;
          }

        }


        @media (max-width: 48rem) {

          .chat-header {

            height: 3.875rem;

            padding:
              0 0.875rem;
          }


          .chat-header-logo {

            height: 1.75rem;

            max-width: 7.5rem;
          }


          .chat-header-title {

            font-size:
              0.875rem;
          }

        }


        @media (max-width: 30rem) {

          .chat-header {

            height: 3.625rem;

            padding:
              0 0.75rem;
          }


          .mobile-menu-container {

            width: 2.25rem;
          }


          .mobile-menu-button {

            width: 2rem;
            height: 2rem;
          }


          .chat-header-logo {

            height: 1.625rem;

            max-width: 6.5rem;
          }


          .chat-header-title {

            font-size:
              0.8125rem;
          }

        }


        @media (max-width: 22rem) {

          .chat-header {

            height: 3.5rem;

            padding:
              0 0.625rem;
          }


          .mobile-menu-container {

            width: 2rem;
          }


          .chat-header-logo {

            height: 1.5rem;

            max-width: 5.75rem;
          }


          .chat-header-title {

            font-size:
              0.75rem;
          }

        }


        @media (max-height: 40rem) {

          .chat-header {

            height: 3.5rem;
          }

        }


        @media (max-width: 64rem)
        and (max-height: 40rem) {

          .chat-header {

            height: 3.375rem;
          }

        }


        @media (min-width: 120rem) {

          .chat-header {

            padding:
              0 1.5rem;
          }

        }

      </style>


      <header class="chat-header">

        <div class="mobile-menu-container">

          <button
            type="button"
            class="mobile-menu-button"
            aria-label="Abrir menú">

            <span></span>
            <span></span>
            <span></span>

          </button>

        </div>


        <div class="chat-header-title-container">

          <span class="chat-header-title">
            Chat EA (Versión Alpha 0.1)
          </span>

        </div>


        <div class="chat-header-logo-container">

          <img
            src="img/logo-cab.svg"
            alt="Logotipo de ReijohanGPT"
            class="chat-header-logo">

        </div>

      </header>

    `;


    this.mobileMenuButton =
      this.shadowRoot.querySelector(
        ".mobile-menu-button"
      );


    this.chatHeaderLogo =
      this.shadowRoot.querySelector(
        ".chat-header-logo"
      );


    this.handleMobileMenu =
      this.handleMobileMenu.bind(this);

  }


  connectedCallback() {

    this.mobileMenuButton.addEventListener(
      "click",
      this.handleMobileMenu
    );


    this.syncWithTheme();

  }


  disconnectedCallback() {

    this.mobileMenuButton.removeEventListener(
      "click",
      this.handleMobileMenu
    );

  }


  handleMobileMenu() {

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


      this.chatHeaderLogo.src =
        "img/logo-cab-negro.svg";

    } else {

      this.removeAttribute(
        "data-theme"
      );


      this.chatHeaderLogo.src =
        "img/logo-cab.svg";

    }

  }

}


customElements.define("chat-header", ChatHeader);