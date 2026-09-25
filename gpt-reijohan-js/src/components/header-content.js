class ChatHeaderContent extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = /* html */ `

      <style>

        :host {
          display: flex;
          width: 100%;
          min-width: 0;
          min-height: 0;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          box-sizing: border-box;
        }

        .mobile-menu-container {
          display: none;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .mobile-menu-button {
          width: 2.625rem;
          height: 2.625rem;
          min-width: 2.625rem;
          min-height: 2.625rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.3rem;
          padding: 0;
          margin: 0;
          box-sizing: border-box;
          border: none;
          border-radius: 0.4375rem;
          background: transparent;
          color: hsl(0, 0%, 96%);
          cursor: pointer;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .mobile-menu-button:hover {
          background: hsl(0, 0%, 16%);
        }

        .mobile-menu-button:focus-visible {
          outline: 0.125rem solid currentColor;
          outline-offset: 0.125rem;
        }

        .mobile-menu-button span {
          display: block;
          width: 1.3rem;
          height: 0.125rem;
          flex-shrink: 0;
          background: currentColor;
          border-radius: 0.125rem;
        }

        .chat-header-title-container {
          min-width: 0;
          flex: 1 1 auto;
          margin-left: 0.3125rem;
          overflow: hidden;

        }

        .chat-header-title {
          display: block;
          max-width: 100%;
          min-width: 0;
          color: hsl(0, 0%, 96%);
          font-size: 1.3rem;
          font-weight: 600;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }


        .chat-header-logo-container {
          width: 3.25rem;
          height: 3.25rem;
          min-width: 3.25rem;
          min-height: 3.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }

        .chat-header-logo {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        @media (max-width: 64rem) {

          .mobile-menu-container {
            display: flex;
          }

          :host {
            gap: 0.75rem;
          }

          .chat-header-title-container {
            margin-left: 0;
          }

          .chat-header-title {
            font-size: 1rem;
          }

          .chat-header-logo-container {
            width: 2.875rem;
            height: 2.875rem;
            min-width: 2.875rem;
            min-height: 2.875rem;
          }

        }


        @media (max-width: 48rem) {

          .mobile-menu-button {
            width: 2.5rem;
            height: 2.5rem;
            min-width: 2.5rem;
            min-height: 2.5rem;
          }

          .mobile-menu-button span {
            width: 1.25rem;
          }

          .chat-header-title {
            font-size: 0.9375rem;
          }

          .chat-header-logo-container {
            width: 2.75rem;
            height: 2.75rem;
            min-width: 2.75rem;
            min-height: 2.75rem;
          }

        }

        @media (max-width: 30rem) {

          :host {
            gap: 0.5rem;
          }

          .mobile-menu-button {
            width: 2.375rem;
            height: 2.375rem;
            min-width: 2.375rem;
            min-height: 2.375rem;
          }

          .mobile-menu-button span {
            width: 1.2rem;
          }

          .chat-header-title {
            font-size: 0.875rem;
          }

          .chat-header-logo-container {
            width: 2.5rem;
            height: 2.5rem;
            min-width: 2.5rem;
            min-height: 2.5rem;
          }

        }

        @media (max-width: 22rem) {

          .mobile-menu-button {
            width: 2.25rem;
            height: 2.25rem;
            min-width: 2.25rem;
            min-height: 2.25rem;
          }

          .chat-header-logo-container {
            width: 2.25rem;
            height: 2.25rem;
            min-width: 2.25rem;
            min-height: 2.25rem;
          }

          .chat-header-title {
            font-size: 0.8125rem;
          }

        }

      </style>

      <div class="mobile-menu-container">
        <button
          type="button"
          class="mobile-menu-button"
          aria-label="Abrir menú lateral"
          aria-expanded="false">
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
        <img class="chat-header-logo" src="img/logo-cab.svg" alt="ReijohanGPT">
      </div>
    `;

    this.mobileMenuButton = this.shadowRoot.querySelector(".mobile-menu-button");
    this.logo = this.shadowRoot.querySelector(".chat-header-logo");

    this.sidebarObserver = null;

    this.handleMobileMenu = this.handleMobileMenu.bind(this);

  }

  connectedCallback() {

    this.mobileMenuButton.addEventListener("click", this.handleMobileMenu);
    this.syncWithSidebar();
    this.observeSidebar();

  }


  disconnectedCallback() {

    this.mobileMenuButton.removeEventListener("click", this.handleMobileMenu);

    if (this.sidebarObserver) {

      this.sidebarObserver.disconnect();
      this.sidebarObserver = null;

    }

  }

  handleMobileMenu() {

    this.dispatchEvent(new CustomEvent("sidebar-open-request", { bubbles: true, composed: true }));

  }

  syncWithSidebar() {

    const sidebar = document.querySelector("chat-sidebar");

    if (!sidebar) {

      return;

    }

    const theme = sidebar.getAttribute("data-theme");

    if (theme === "light") {

      this.updateLogo("img/logo-cab-negro.svg");

    } else {

      this.updateLogo("img/logo-cab.svg");

    }

    const isOpen = sidebar.hasAttribute("open");

    this.mobileMenuButton.setAttribute("aria-expanded", String(isOpen));

  }


  observeSidebar() {

    const sidebar = document.querySelector("chat-sidebar");

    if (!sidebar) {

      return;

    }

    if (this.sidebarObserver) {

      this.sidebarObserver.disconnect();

    }

    this.sidebarObserver = new MutationObserver(() => {

      this.syncWithSidebar();

    });

    this.sidebarObserver.observe(sidebar, { attributes: true, attributeFilter: ["data-theme", "open"] });

  }

  updateLogo(src) {

    if (!this.logo) {

      return;

    }

    if (this.logo.getAttribute("src") !== src) {

      this.logo.setAttribute("src", src);

    }

  }

}


customElements.define("chat-header-content", ChatHeaderContent);