class ChatFilePreview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = /* html */ `
      <style>
        :host {
          display: none;
          width: 100%;
          max-width: 56.25rem;
          margin: 0 auto;
          padding: 0 0 0.5rem;
          color: hsl(0, 0%, 96%);
          transition: color 0.3s ease;
        }

        :host([visible]) { display: block; }

        .file-preview {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding: 0.625rem 0.75rem;
          border: 0.0625rem solid hsl(0, 0%, 25%);
          border-radius: 0.625rem;
          background: hsl(0, 0%, 12%);
          color: hsl(0, 0%, 96%);
          box-shadow: 0 0.25rem 1rem hsla(0, 0%, 0%, 0.2);
          transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
        }

        .file-preview-info { min-width: 0; flex: 1; display: flex; align-items: center; gap: 0.625rem; overflow: hidden; }
        .file-preview-icon { width: 2rem; height: 2rem; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 1.125rem; border-radius: 0.375rem; background: hsl(0, 0%, 20%); }
        .file-preview-details { min-width: 0; display: flex; flex-direction: column; gap: 0.125rem; overflow: hidden; }
        .file-preview-name { display: block; max-width: 100%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-size: 0.8125rem; color: hsl(0, 0%, 94%); }
        .file-preview-size { display: block; font-size: 0.6875rem; color: hsl(0, 0%, 58%); }

        .file-preview-remove {
          width: 2rem; height: 2rem; flex-shrink: 0; display: flex; align-items: center; justify-content: center;
          border: 0; border-radius: 0.375rem; background: transparent; color: hsl(0, 0%, 70%); font-size: 1.25rem; cursor: pointer; transition: background-color 0.3s ease, color 0.3s ease;
        }
        .file-preview-remove:hover { background: hsl(0, 0%, 22%); color: hsl(0, 0%, 100%); }

        :host([data-theme="light"]) .file-preview { background: hsl(0, 0%, 100%); border-color: hsl(0, 0%, 80%); color: hsl(0, 0%, 10%); box-shadow: 0 0.25rem 1rem hsla(0, 0%, 0%, 0.1); }
        :host([data-theme="light"]) .file-preview-icon { background: hsl(0, 0%, 92%); }
        :host([data-theme="light"]) .file-preview-name { color: hsl(0, 0%, 15%); }
        :host([data-theme="light"]) .file-preview-size { color: hsl(0, 0%, 48%); }
        :host([data-theme="light"]) .file-preview-remove { color: hsl(0, 0%, 40%); }
        :host([data-theme="light"]) .file-preview-remove:hover { background: hsl(0, 0%, 92%); color: hsl(0, 0%, 10%); }

        @media (min-width: 120rem) { :host { max-width: 62rem; } }
      </style>

      <div class="file-preview">
        <div class="file-preview-info">
          <span class="file-preview-icon">📎</span>
          <div class="file-preview-details">
            <span class="file-preview-name"></span>
            <span class="file-preview-size"></span>
          </div>
        </div>
        <button type="button" class="file-preview-remove" aria-label="Eliminar archivo adjunto">×</button>
      </div>
    `;

    this.filePreview = this.shadowRoot.querySelector(".file-preview");
    this.fileName = this.shadowRoot.querySelector(".file-preview-name");
    this.fileSize = this.shadowRoot.querySelector(".file-preview-size");
    this.removeButton = this.shadowRoot.querySelector(".file-preview-remove");
    this.handleRemove = this.handleRemove.bind(this);
    this.syncWithTheme();
  }

  connectedCallback() { this.removeButton.addEventListener("click", this.handleRemove); this.syncWithTheme(); }
  disconnectedCallback() { this.removeButton.removeEventListener("click", this.handleRemove); }

  setFile(file) {
    if (!file) { this.clear(); return; }
    this.fileName.textContent = file.name;
    this.fileName.title = file.name;
    this.fileSize.textContent = this.formatFileSize(file.size);
    this.setAttribute("visible", "");
  }

  clear() { this.fileName.textContent = ""; this.fileName.removeAttribute("title"); this.fileSize.textContent = ""; this.removeAttribute("visible"); }

  handleRemove() {
    this.clear();
    this.dispatchEvent(new CustomEvent("remove-file-request", { bubbles: true, composed: true }));
  }

  formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    const units = ["Bytes", "KB", "MB", "GB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, index)).toFixed(1)} ${units[index]}`;
  }

  syncWithTheme() {
    const theme = document.documentElement.getAttribute("data-theme");
    if (theme === "light") this.setAttribute("data-theme", "light");
    else this.removeAttribute("data-theme");
  }
}
customElements.define("chat-file-preview", ChatFilePreview);
