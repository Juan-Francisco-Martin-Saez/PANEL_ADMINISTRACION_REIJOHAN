class ChatMessages extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" })
    this.shadow.innerHTML = /* html */ `

      <style>

        :host {
          display: block;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
          color: hsl(0, 0%, 96%);
          transition: color 0.3s ease;
        }

        .messages-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          min-width: 0;
          gap: 1rem;
          box-sizing: border-box;
          color: hsl(0, 0%, 96%);
          transition: color 0.3s ease;
        }

        :host([data-theme="light"]).messages-container {
          color: hsl(0, 0%, 10%);
        }

        @media (max-width: 64rem) {

          .messages-container {
            gap: 0.875rem;
          }

        }

        @media (max-width: 48rem) {

          .messages-container {
            gap: 0.75rem;
          }

        }

        @media (max-width: 30rem) {

          .messages-container {
            gap: 0.625rem;
          }

        }

        @media (max-width: 22rem) {

          .messages-container {
            gap: 0.5rem;
          }

        }

      </style>

      <div class="messages-container"></div>
    `;

    this.messagesContainer = this.shadowRoot.querySelector(".messages-container");
    this.handleSidebarChange = this.handleSidebarChange.bind(this);
    this.sidebarObserver = null;

  }


  connectedCallback() {

    this.syncWithSidebar();
    this.observeSidebar();

  }

  disconnectedCallback() {

    if (this.sidebarObserver) {

      this.sidebarObserver.disconnect();

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

    this.sidebarObserver = new MutationObserver(this.handleSidebarChange);

    this.sidebarObserver.observe(sidebar, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });

  }

  handleSidebarChange() {

    this.syncWithSidebar();

  }

  clear() {

    this.messagesContainer.innerHTML = "";

  }

}


customElements.define("chat-messages", ChatMessages);