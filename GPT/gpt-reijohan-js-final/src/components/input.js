class ChatInput extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" })
    this.shadow.innerHTML = /* html */ `

      <style>

        :host {
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
          transform: translateY(-50%);
          color: hsl(0, 0%, 96%);
          transition:
            top 0.4s ease,
            bottom 0.4s ease,
            transform 0.4s ease,
            color 0.3s ease;
        }

        :host([has-messages]) {
          top: auto;
          bottom: 7rem;
          transform: none;
        }

        .chat-input-section {
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
          padding: 0 1.25rem 1.25rem;
          background: hsl(0, 0%, 9%);
          color: hsl(0, 0%, 96%);
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .chat-input-wrapper {
          width: 100%;
          max-width: 56.25rem;
          min-width: 0;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        .chat-input-container {
          width: 100%;
          min-width: 0;
          display: flex;
          align-items: flex-end;
          gap: 0.625rem;
          padding: 0.625rem;
          box-sizing: border-box;
          border: 0.0625rem solid hsl(0, 0%, 25%);
          border-radius: 0.75rem;
          background: hsl(0, 0%, 12%);
          color: hsl(0, 0%, 96%);
          transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
        }

        .file-attach-container {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .file-attach-input {
          position: absolute;
          width: 0.0625rem;
          height: 0.0625rem;
          opacity: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .file-attach-button {
          width: 2.25rem;
          height: 2.25rem;

          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 0.5rem;
          color: hsl(0, 0%, 80%);
          cursor: pointer;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .file-attach-button:hover {
          background: hsl(0, 0%, 20%);
          color: hsl(0, 0%, 100%);
        }

        .file-attach-icon {
          font-size: 1.5rem;
          line-height: 1;
        }

        .message-input-container {
          flex: 1 1 auto;
          min-width: 0;
          display: flex;
          align-items: flex-end;
        }

        .message-input {
          width: 100%;
          min-width: 0;
          min-height: 2.25rem;
          max-height: 11.25rem;
          resize: none;
          overflow-y: auto;
          padding: 0.5rem 0;
          box-sizing: border-box;
          border: none;
          outline: none;
          background: transparent;
          color: hsl(0, 0%, 96%);
          font-family: inherit;
          font-size: 0.9375rem;
          line-height: 1.4;
          scrollbar-width: thin;
          scrollbar-color: hsl(0, 0%, 32%) transparent;
        }

        .message-input::-webkit-scrollbar {
          width: 0.45rem;
        }

        .message-input::-webkit-scrollbar-track {
          background: transparent;
        }

        .message-input::-webkit-scrollbar-thumb {
          background: hsl(0, 0%, 28%);
          border: 0.1rem solid transparent;
          border-radius: 1rem;
          background-clip: padding-box;
        }

        .message-input::-webkit-scrollbar-thumb:hover {
          background: hsl(0, 0%, 45%);
          border: 0.1rem solid transparent;
          background-clip: padding-box;
        }

        .message-input::placeholder {
          color: hsl(0, 0%, 55%);
          opacity: 1;
        }

        .message-send-container {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .message-send-button {
          width: 2.25rem;
          height: 2.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          padding: 0;
          border: none;
          border-radius: 0.5rem;
          background: hsl(0, 0%, 96%);
          color: hsl(0, 0%, 10%);
          cursor: pointer;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .message-send-button:hover {
          background: hsl(0, 0%, 82%);
        }

        .message-send-icon {
          font-size: 1.25rem;
          line-height: 1;
        }

        :host([data-theme="light"]) {
          color: hsl(0, 0%, 10%);
        }

        :host([data-theme="light"])
        .chat-input-section {
          background: hsl(0, 0%, 97%);
          color: hsl(0, 0%, 10%);
        }

        :host([data-theme="light"])
        .chat-input-container {
          background: hsl(0, 0%, 100%);
          border-color: hsl(0, 0%, 80%);
          color: hsl(0, 0%, 10%);
        }

        :host([data-theme="light"])
        .message-input {
          color: hsl(0, 0%, 10%);
        }

        :host([data-theme="light"])
        .message-input::placeholder {
          color: hsl(0, 0%, 55%);
        }

        :host([data-theme="light"])
        .file-attach-button {
          color: hsl(0, 0%, 35%);
        }

        :host([data-theme="light"])
        .file-attach-button:hover {
          background: hsl(0, 0%, 92%);
          color: hsl(0, 0%, 10%);
        }


        :host([data-theme="light"])
        .message-send-button {
          background: hsl(0, 0%, 10%);
          color: hsl(0, 0%, 96%);
        }

        :host([data-theme="light"])
        .message-send-button:hover {
          background: hsl(0, 0%, 22%);
        }

        @media (min-width: 64.0625rem) {

          :host {
            left: 0;
            right: 0;
            width: 100%;
            top: 50%;
            transform: translateY(-50%);
          }

          :host([has-messages]) {
            top: auto;
            bottom: 7rem;
            transform: none;
          }

        }

        @media (min-width: 120rem) {

          .chat-input-wrapper {
            max-width: 62rem;
          }

        }

        @media (max-width: 64rem) {

          .chat-input-section {
            padding: 0 1rem 1rem;
          }

          .chat-input-wrapper {
            max-width: 100%;
          }

          :host {
            left: 0; right: 0; width: 100%; top: 50%; transform: translateY(-50%);
          }

          :host([has-messages]) {
            top: auto; bottom: 7rem; transform: none;
          }

        }

        @media (max-width: 48rem) {

          .chat-input-section {
            padding: 0 0.875rem 0.875rem;
          }

        }

        @media (max-width: 30rem) {

          .chat-input-section {
            padding: 0 0.75rem 0.75rem;
          }

          .chat-input-container {
            gap: 0.5rem;
            padding: 0.5rem;
          }

        }


        @media (max-width: 22rem) {

          .chat-input-section {
            padding: 0 0.625rem 0.625rem;
          }

        }

        @media (max-height: 40rem) {

          .chat-input-section {
            padding-bottom: 0.875rem;
          }

          :host([has-messages]) {
            bottom: 6rem;
          }

        }

        @media (max-width: 30rem)
        and (max-height: 40rem) {

          .chat-input-section {
            padding-bottom: 0.75rem;
          }

          :host([has-messages]) {
            bottom: 5rem;
          }

        }

      </style>


      <section class="chat-input-section">
        <div class="chat-input-wrapper">
          <slot name="file-preview"></slot>
          <div class="chat-input-container">
            <div class="file-attach-container">
              <input type="file" id="file-attach" class="file-attach-input">
              <label for="file-attach" class="file-attach-button" aria-label="Adjuntar archivo">
                <span class="file-attach-icon">
                  +
                </span>
              </label>
            </div>
            <div class="message-input-container">
              <textarea class="message-input" placeholder="Escribe tu consulta..." rows="1"></textarea>
            </div>
            <div class="message-send-container">
              <button type="button" class="message-send-button" aria-label="Enviar consulta">
                <span class="message-send-icon">
                  ↑
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    `;

    this.messageInput = this.shadowRoot.querySelector(".message-input");
    this.sendButton = this.shadowRoot.querySelector(".message-send-button");
    this.fileInput = this.shadowRoot.querySelector("#file-attach");
    this.handleInput = this.handleInput.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleFileSelection = this.handleFileSelection.bind(this);
    this.handleSidebarChange = this.handleSidebarChange.bind(this);

    this.sidebarObserver = null;

  }

  connectedCallback() {

    this.messageInput.addEventListener("input", this.handleInput);
    this.messageInput.addEventListener("keydown", this.handleKeyDown);
    this.sendButton.addEventListener("click", this.handleSend);
    this.fileInput.addEventListener("change", this.handleFileSelection);
    this.syncWithSidebar();
    this.observeSidebar();

  }

  disconnectedCallback() {

    this.messageInput.removeEventListener("input", this.handleInput);
    this.messageInput.removeEventListener("keydown", this.handleKeyDown);
    this.sendButton.removeEventListener("click", this.handleSend);
    this.fileInput.removeEventListener("change", this.handleFileSelection);

    if (this.sidebarObserver) {
      this.sidebarObserver.disconnect();
      this.sidebarObserver = null;
    }

  }

  handleInput() {

    this.autoResize();

  }

  handleKeyDown(event) {

    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      this.handleSend();

    }

  }

  handleSend() {

    const message = this.messageInput.value.trim();
    const file = this.fileInput.files[0] || null;


    if (!message && !file) {

      return;
    }

    this.dispatchEvent(new CustomEvent("send-message-request", {
      bubbles: true,
      composed: true,
      detail: { message, file }
    }));

  }

  handleFileSelection() {
    const file = this.fileInput.files[0];

    if (!file) {

      return;

    }

    this.dispatchEvent(new CustomEvent("file-selected", {
      bubbles: true,
      composed: true,
      detail: { file }
    }));

  }

  autoResize() {
    this.messageInput.style.height = "auto";

    const maxHeight = parseFloat(getComputedStyle(this.messageInput).maxHeight);
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const height = Math.min(this.messageInput.scrollHeight, maxHeight);
    this.messageInput.style.height = `${height / rootFontSize}rem`;

  }

  clear() {
    this.messageInput.value = "";
    this.messageInput.style.height = "auto";

  }


  clearFile() {
    this.fileInput.value = "";
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

}


customElements.define("chat-input", ChatInput);