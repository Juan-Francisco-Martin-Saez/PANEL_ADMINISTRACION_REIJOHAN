class ChatInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = /* html */ `
      <style>
        :host {
          display: block;
          width: 100%;
          flex-shrink: 0;
          color: hsl(0, 0%, 96%);
          transition: color 0.3s ease;
        }

        .chat-input-section {
          width: 100%;
          padding: 0 1.25rem 1.25rem;
          background: hsl(0, 0%, 9%);
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .chat-input-wrapper {
          width: 100%;
          max-width: 56.25rem;
          margin: 0 auto;
          display: flex;
          flex-direction: column; /* Cambiado para apilar la previsualización del archivo limpiamente arriba */
        }

        .chat-input-container {
          width: 100%;
          display: flex;
          align-items: flex-end;
          gap: 0.625rem;
          padding: 0.625rem;
          border: 0.0625rem solid hsl(0, 0%, 25%);
          border-radius: 0.75rem;
          background: hsl(0, 0%, 12%);
          transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
        }

        .file-attach-container { flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
        .file-attach-input { position: absolute; width: 0.0625rem; height: 0.0625rem; opacity: 0; overflow: hidden; pointer-events: none; }
        
        .file-attach-button {
          width: 2.25rem; height: 2.25rem; display: flex; align-items: center; justify-content: center;
          border-radius: 0.5rem; cursor: pointer; color: hsl(0, 0%, 80%); transition: background-color 0.3s ease, color 0.3s ease;
        }
        .file-attach-button:hover { background: hsl(0, 0%, 20%); color: hsl(0, 0%, 100%); }
        .file-attach-icon { font-size: 1.5rem; line-height: 1; }

        .message-input-container { flex: 1; min-width: 0; display: flex; align-items: flex-end; }
        .message-input {
          width: 100%; min-width: 0; min-height: 2.25rem; max-height: 11.25rem; resize: none; overflow-y: auto;
          border: 0; outline: 0; background: transparent; color: hsl(0, 0%, 96%); font-size: 0.9375rem; line-height: 1.4; padding: 0.5rem 0;
        }
        .message-input::placeholder { color: hsl(0, 0%, 55%); opacity: 1; }

        .message-send-container { flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
        .message-send-button {
          width: 2.25rem; height: 2.25rem; display: flex; align-items: center; justify-content: center;
          border: 0; border-radius: 0.5rem; background: hsl(0, 0%, 96%); color: hsl(0, 0%, 10%); cursor: pointer; transition: all 0.3s ease;
        }
        .message-send-button:hover { background: hsl(0, 0%, 82%); }

        :host([data-theme="light"]) .chat-input-section { background: hsl(0, 0%, 98%); color: hsl(0, 0%, 10%); }
        :host([data-theme="light"]) .chat-input-container { background: hsl(0, 0%, 100%); border-color: hsl(0, 0%, 80%); }
        :host([data-theme="light"]) .message-input { color: hsl(0, 0%, 10%); }
        :host([data-theme="light"]) .file-attach-button { color: hsl(0, 0%, 35%); }
        :host([data-theme="light"]) .file-attach-button:hover { background: hsl(0, 0%, 92%); }
        :host([data-theme="light"]) .message-send-button { background: hsl(0, 0%, 10%); color: hsl(0, 0%, 96%); }
        :host([data-theme="light"]) .message-send-button:hover { background: hsl(0, 0%, 22%); }

        @media (min-width: 120rem) { .chat-input-wrapper { max-width: 62rem; } }
        @media (max-width: 64rem) { .chat-input-section { padding: 0 1rem 1rem; } }
      </style>

      <section class="chat-input-section">
        <div class="chat-input-wrapper">
          <slot name="file-preview"></slot>
          
          <div class="chat-input-container">
            <div class="file-attach-container">
              <input type="file" id="file-attach" class="file-attach-input">
              <label for="file-attach" class="file-attach-button" aria-label="Adjuntar archivo">
                <span class="file-attach-icon">+</span>
              </label>
            </div>

            <div class="message-input-container">
              <textarea class="message-input" placeholder="Escribe tu consulta..." rows="1"></textarea>
            </div>

            <div class="message-send-container">
              <button type="button" class="message-send-button" aria-label="Enviar consulta">
                <span class="message-send-icon">↑</span>
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
    this.syncWithChatApp();
  }

  connectedCallback() {
    this.messageInput.addEventListener("input", this.handleInput);
    this.messageInput.addEventListener("keydown", this.handleKeyDown);
    this.sendButton.addEventListener("click", this.handleSend);
    this.fileInput.addEventListener("change", this.handleFileSelection);
    this.syncWithChatApp();
  }

  disconnectedCallback() {
    this.messageInput.removeEventListener("input", this.handleInput);
    this.messageInput.removeEventListener("keydown", this.handleKeyDown);
    this.sendButton.removeEventListener("click", this.handleSend);
    this.fileInput.removeEventListener("change", this.handleFileSelection);
  }

  handleInput() { this.autoResize(); }
  handleKeyDown(event) { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); this.handleSend(); } }

  handleSend() {
    const message = this.messageInput.value.trim();
    const file = this.fileInput.files[0] || null;
    if (!message && !file) return;

    this.dispatchEvent(new CustomEvent("send-message-request", {
      bubbles: true, composed: true, detail: { message, file }
    }));
  }

  handleFileSelection() {
    const file = this.fileInput.files[0];
    if (!file) return;
    this.dispatchEvent(new CustomEvent("file-selected", { bubbles: true, composed: true, detail: { file } }));
  }

  autoResize() {
    this.messageInput.style.height = "auto";
    const maxHeight = parseFloat(getComputedStyle(this.messageInput).maxHeight);
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    this.messageInput.style.height = `${Math.min(this.messageInput.scrollHeight / rootFontSize, maxHeight / rootFontSize)}rem`;
  }

  clear() { this.messageInput.value = ""; this.messageInput.style.height = "auto"; }
  clearFile() { this.fileInput.value = ""; }

  syncWithChatApp() {
    const theme = document.documentElement.getAttribute("data-theme");
    if (theme === "light") this.setAttribute("data-theme", "light");
    else this.removeAttribute("data-theme");
  }
}
customElements.define("chat-input", ChatInput);