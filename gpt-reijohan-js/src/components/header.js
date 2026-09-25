class ChatHeader extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = /* html */ `

      <style>

        :host {
          display: block;
          width: 100%;
          min-width: 0;
          min-height: 0;
          flex-shrink: 0;
          box-sizing: border-box;
          color: hsl(0, 0%, 96%);
          transition: color 0.3s ease;
        }

        .chat-header {
          width: 100%;
          height: 4.375rem;
          min-width: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
          gap: 1rem;
          padding: 0 1.25rem;
          box-sizing: border-box;
          background: hsl(0, 0%, 9%);
          border-bottom: 0.0625rem solid hsl(0, 0%, 19%);
          color: hsl(0, 0%, 96%);
          transition:
            background-color 0.3s ease,
            border-color 0.3s ease,
            color 0.3s ease,
            padding 0.3s ease,
            height 0.3s ease;
        }

        ::slotted(chat-header-content) {
          width: 100%;
          min-width: 0;
        }

        :host([data-theme="light"]) {
          color: hsl(0, 0%, 10%);
        }

        :host([data-theme="light"])
        .chat-header {
          background: hsl(0, 0%, 97%);
          border-bottom-color: hsl(0, 0%, 84%);
          color: hsl(0, 0%, 10%);
        }

        @media (max-width: 64rem) {

          .chat-header {
            height: 4rem;
            gap: 0.75rem;
            padding: 0 1rem;
          }

        }

        @media (max-width: 48rem) {

          .chat-header {
            height: 3.875rem;
            padding: 0 0.875rem;
          }

        }

        @media (max-width: 30rem) {

          .chat-header {
            height: 3.625rem;
            gap: 0.5rem;
            padding: 0 0.625rem;
          }

        }

        @media (max-width: 22rem) {

          .chat-header {
            height: 3.5rem;
            padding: 0 0.5rem;
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
            padding: 0 1.5rem;
          }

        }

      </style>
      <header class="chat-header">
        <slot name="content"></slot>
      </header>
    `;

    this.mobileMenuButton = null;
    this.logo = null;
    this.sidebarObserver = null;

  }


  connectedCallback() {
    this.syncWithSidebar();
    this.observeSidebar();

  }


  disconnectedCallback() {

    if (this.sidebarObserver) {

      this.sidebarObserver = null;

    }

  }


  syncWithSidebar() {

    const sidebar = document.querySelector("chat-sidebar");

    if (!sidebar) {

      return;

    }

    const theme = sidebar.getAttribute("data-theme");

    if (theme === "light") {

      this.setAttribute("data-theme", "light");

    } else {

      this.removeAttribute("data-theme");

    }

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

    this.sidebarObserver.observe(sidebar, {
      attributes: true,
      attributeFilter: ["data-theme"]
    }
    );

  }

}

customElements.define("chat-header", ChatHeader);