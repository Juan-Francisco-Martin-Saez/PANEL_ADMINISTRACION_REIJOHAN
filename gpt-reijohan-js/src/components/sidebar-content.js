class ChatSidebarContent extends HTMLElement {
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
          min-height: 0;
          overflow: hidden;
        }

        .sidebar-content {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        ::slotted(chat-new-button) { flex-shrink: 0; }
        ::slotted(chat-history) { flex: 1 1 auto; min-height: 0; }
        ::slotted(chat-theme), ::slotted(chat-user) { flex-shrink: 0; }

        :host([data-theme="light"]) { color: hsl(0, 0%, 10%); }
      </style>
      <div class="sidebar-content">
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() { this.syncWithSidebar(); }

  syncWithSidebar() {
    const sidebar = this.closest("chat-sidebar");
    if (!sidebar) return;

    const theme = sidebar.getAttribute("data-theme");
    const collapsed = sidebar.hasAttribute("collapsed");

    if (theme) this.setAttribute("data-theme", theme);
    else this.removeAttribute("data-theme");

    if (collapsed) this.setAttribute("collapsed", "");
    else this.removeAttribute("collapsed");

    const children = this.querySelectorAll("chat-new-button, chat-history, chat-theme, chat-user");
    children.forEach(child => {
      if (theme) child.setAttribute("data-theme", theme);
      else child.removeAttribute("data-theme");

      if (collapsed) child.setAttribute("collapsed", "");
      else child.removeAttribute("collapsed");

      if (typeof child.syncWithSidebar === "function") child.syncWithSidebar();
    });
  }
}
customElements.define("chat-sidebar-content", ChatSidebarContent);