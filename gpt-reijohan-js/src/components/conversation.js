class ChatConversation extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" })
    this.shadow.innerHTML = /* html */`
      
      <style>
        :host {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
          width: 100%;
          height: auto;
          min-width: 0;
          min-height: 0;
          overflow: hidden;
          box-sizing: border-box;
          color: hsl(0, 0%, 96%);
          transition: color 0.3s ease;
        }

        .chat-conversation {
          width: 100%;
          height: 100%;
          min-width: 0;
          min-height: 0;
          display: block;
          overflow-x: hidden;
          overflow-y: auto;
          box-sizing: border-box;
          background: hsl(0, 0%, 9%);
          color: hsl(0, 0%, 96%);
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .conversation-container {
          width: 100%;
          max-width: 56.25rem;
          min-width: 0;
          min-height: 100%;
          margin: 0 auto;
          padding: 2rem 1.25rem;
          display: flex;
          flex: 1 1 auto;
          flex-direction: column;
          box-sizing: border-box;
          color: hsl(0, 0%, 96%);
        }

        ::slotted(chat-welcome),
        ::slotted(chat-status),
        ::slotted(chat-messages) {
          width: 100%;
          max-width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }

        ::slotted(chat-welcome) {
          margin-top: auto;
          margin-bottom: auto;
          flex-shrink: 0;
        }

        ::slotted(chat-status) {
          flex-shrink: 0;
        }

        ::slotted(chat-messages) {
          flex-shrink: 0;
        }

        :host([data-theme="light"]) {
          color: hsl(0, 0%, 10%);
        }

        :host([data-theme="light"])
        .chat-conversation {
          background: hsl(0, 0%, 97%);
          color: hsl(0, 0%, 10%);
        }


        :host([data-theme="light"])
        .conversation-container {
          color:hsl(0, 0%, 10%);
        }

        .chat-conversation {
          scrollbar-width: thin;
          scrollbar-color: hsl(0, 0%, 25%) transparent;
        }


        .chat-conversation::-webkit-scrollbar {
          width: 0.5rem;
        }


        .chat-conversation::-webkit-scrollbar-track {
          background: transparent;
        }

        .chat-conversation::-webkit-scrollbar-thumb {
          background: hsl(0, 0%, 25%);
          border-radius:999rem;
        }


        :host([data-theme="light"])
        .chat-conversation {
          scrollbar-color:hsl(0, 0%, 75%) transparent;
        }

        :host([data-theme="light"])
        .chat-conversation::-webkit-scrollbar-thumb {
          background: hsl(0, 0%, 75%);
        }


        @media (max-width: 64rem) {
          .conversation-container {
            padding:1.5rem 1rem;
          }
        }

        @media (max-width: 48rem) {
          .conversation-container {
            padding:1.25rem 0.875rem;
          }
        }

        @media (max-width: 30rem) {
          .conversation-container {
            padding:1rem 0.75rem;
          }

        }

        @media (min-width: 120rem) {
          .conversation-container {
            max-width:62rem;
          }
        }

        @media (max-height: 40rem) {
          .conversation-container {
            padding-top:1.25rem;
            padding-bottom:1.25rem;
          }

        }

        @media (max-width: 30rem)
        and (max-height: 40rem) {
          .conversation-container {
            padding-top:1rem;
            padding-bottom:1rem;
          }

        }

      </style>

      <section class="chat-conversation">
        <div class="conversation-container">
          <slot name="welcome"></slot>
          <slot name="status"></slot>
          <slot name="messages"></slot>
        </div>
      </section>
    `;

    this.chatConversation = this.shadowRoot.querySelector(".chat-conversation");
    this.conversationContainer = this.shadowRoot.querySelector(".conversation-container");
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


customElements.define("chat-conversation", ChatConversation);