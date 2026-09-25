class ChatFilePreview extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" })
    this.shadow.innerHTML = /* html */ `

      <style>

        :host {
          display: none;
          width: 100%;
          max-width: 56.25rem;
          min-width: 0;
          margin: 0 auto;
          padding: 0 0 0.5rem;
          box-sizing: border-box;
          color: hsl(0, 0%, 96%);
          transition: color 0.3s ease;
        }

        :host([visible]) {
          display: block;
        }

        .file-preview {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          min-width: 0;
          gap: 0.75rem;
          padding: 0.625rem 0.75rem;
          box-sizing: border-box;
          border: 0.0625rem solid hsl(0, 0%, 25%);
          border-radius: 0.625rem;
          background: hsl(0, 0%, 12%);
          color: hsl(0, 0%, 96%);
          box-shadow: 0 0.25rem 1rem hsla(0, 0%, 0%, 0.2);
          transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
        }

        .file-preview-info {
          display: flex;
          align-items: center;
          min-width: 0;
          flex: 1 1 auto;
          gap: 0.625rem;
          overflow: hidden;
        }

        .file-preview-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          flex-shrink: 0;
          border-radius: 0.375rem;
          background:hsl(0, 0%, 20%);
          font-size: 1.125rem;
          line-height: 1;
        }

        .file-preview-details {
          display: flex;
          flex-direction: column;
          min-width: 0;
          gap: 0.125rem;
          overflow: hidden;
        }

        .file-preview-name {
          display: block;
          max-width: 100%;
          overflow: hidden;
          color:hsl(0, 0%, 94%);
          font-size: 0.8125rem;
          line-height: 1.2;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .file-preview-size {
          display: block;
          color:hsl(0, 0%, 58%);
          font-size: 0.6875rem;
          line-height: 1.2;
        }

        .file-preview-remove {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          flex-shrink: 0;
          padding: 0;
          border: 0;
          border-radius: 0.375rem;
          background: transparent;
          color: hsl(0, 0%, 70%);
          font-family: inherit;
          font-size: 1.25rem;
          line-height: 1;
          cursor: pointer;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .file-preview-remove:hover {
          background: hsl(0, 0%, 22%);
          color: hsl(0, 0%, 100%);
        }

        :host([data-theme="light"]) .file-preview {
          background: hsl(0, 0%, 100%);
          border-color: hsl(0, 0%, 80%);
          color: hsl(0, 0%, 10%);
          box-shadow: 0 0.25rem 1rem hsla(0, 0%, 0%, 0.1);
        }

        :host([data-theme="light"]) .file-preview-icon {
          background: hsl(0, 0%, 92%);
        }

        :host([data-theme="light"]) .file-preview-name {
          color: hsl(0, 0%, 15%);
        }

        :host([data-theme="light"]) .file-preview-size {
          color: hsl(0, 0%, 48%);
        }

        :host([data-theme="light"]) .file-preview-remove {
          color: hsl(0, 0%, 40%);
        }

        :host([data-theme="light"]) .file-preview-remove:hover {
          background: hsl(0, 0%, 92%);
          color: hsl(0, 0%, 10%);
        }

        @media (max-width: 120rem) {

          :host {
            max-width: 62rem;
          }

        }

      </style>

      <div class="file-preview">
        <div class="file-preview-info">
          <span
            class="file-preview-icon"
            aria-hidden="true">
            📎
          </span>
          <div class="file-preview-details">
            <span
              class="file-preview-name">
            </span>
            <span
              class="file-preview-size">
            </span>
          </div>
        </div>
        <button
          type="button"
          class="file-preview-remove"
          aria-label="Eliminar archivo adjunto">
          ×
        </button>
      </div>
    `;

    this.filePreview = this.shadowRoot.querySelector(".file-preview");
    this.fileName = this.shadowRoot.querySelector(".file-preview-name");
    this.fileSize = this.shadowRoot.querySelector(".file-preview-size");
    this.removeButton = this.shadowRoot.querySelector(".file-preview-remove");

    this.handleRemove = this.handleRemove.bind(this);
    this.handleSidebarChange = this.handleSidebarChange.bind(this);
    this.sidebarObserver = null;

  }


  connectedCallback() {

    this.removeButton.addEventListener("click", this.handleRemove);
    this.syncWithSidebar();
    this.observeSidebar();

  }

  disconnectedCallback() {

    this.removeButton.removeEventListener("click", this.handleRemove);

    if (this.sidebarObserver) {

      this.sidebarObserver.disconnect();
      this.sidebarObserver = null;

    }

  }

  setFile(file) {

    if (!file) {

      this.clear();

      return;

    }


    this.fileName.textContent = file.name;
    this.fileName.title = file.name;
    this.fileSize.textContent = this.formatFileSize(file.size);
    this.setAttribute("visible", "");
  }

  clear() {

    this.fileName.textContent = "";
    this.fileName.removeAttribute("title");
    this.fileSize.textContent = "";
    this.removeAttribute("visible");

  }

  handleRemove() {

    this.clear();
    this.dispatchEvent(new CustomEvent("remove-file-request", { bubbles: true, composed: true }));

  }


  formatFileSize(bytes) {

    if (bytes === 0) {
      return "0 Bytes";
    }

    const units = ["Bytes", "KB", "MB", "GB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, index)).toFixed(1)} ${units[index]}`;

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
    this.sidebarObserver.observe(
      sidebar,
      {
        attributes: true,
        attributeFilter: [
          "data-theme"
        ]
      }
    );

  }

  handleSidebarChange() {

    this.syncWithSidebar();

  }

}


customElements.define("chat-file-preview", ChatFilePreview);