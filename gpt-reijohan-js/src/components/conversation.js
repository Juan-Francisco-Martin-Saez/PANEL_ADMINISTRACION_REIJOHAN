class ChatConversation extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = /* html */ `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
          width: 100%;
          height: 100%;
          min-width: 0;
          min-height: 0;
          overflow: hidden;
          color: hsl(0, 0%, 96%);
          transition: color 0.3s ease;
        }

        .chat-conversation {
          width: 100%;
          height: 100%;
          min-width: 0;
          min-height: 0;
          overflow-x: hidden;
          overflow-y: auto; /* Activa scroll si la conversación es larga */
          background: hsl(0, 0%, 9%);
          color: hsl(0, 0%, 96%);
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .conversation-container {
          width: 100%;
          max-width: 56.25rem;
          min-width: 0;
          margin: 0 auto;
          padding: 2rem 1.25rem;
          display: flex;
          flex-direction: column;
          color: hsl(0, 0%, 96%);
        }

        ::slotted(chat-welcome),
        ::slotted(chat-status),
        ::slotted(chat-messages) {
          width: 100%;
          min-width: 0;
        }

        ::slotted(chat-messages) { flex-shrink: 0; }

        :host([data-theme="light"]) .chat-conversation {
          background: hsl(0, 0%, 98%);
          color: hsl(0, 0%, 10%);
        }

        :host([data-theme="light"]) .conversation-container { color: hsl(0, 0%, 10%); }

        .chat-conversation::-webkit-scrollbar { width: 0.5rem; }
        .chat-conversation::-webkit-scrollbar-track { background: transparent; }
        .chat-conversation::-webkit-scrollbar-thumb { background: hsl(0, 0%, 25%); border-radius: 999rem; }
        :host([data-theme="light"]) .chat-conversation::-webkit-scrollbar-thumb { background: hsl(0, 0%, 75%); }

        @media (max-width: 64rem) { .conversation-container { padding: 1.5rem 1rem; } }
        @media (max-width: 48rem) { .conversation-container { padding: 1.25rem 0.875rem; } }
        @media (max-width: 30rem) { .conversation-container { padding: 1rem 0.75rem; } }
        @media (min-width: 120rem) { .conversation-container { max-width: 62rem; } }
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
    this.syncWithTheme();
  }

  connectedCallback() { this.syncWithTheme(); }

  syncWithTheme() {
    const theme = document.documentElement.getAttribute("data-theme");
    if (theme === "light") this.setAttribute("data-theme", "light");
    else this.removeAttribute("data-theme");
  }
}
customElements.define("chat-conversation", ChatConversation);