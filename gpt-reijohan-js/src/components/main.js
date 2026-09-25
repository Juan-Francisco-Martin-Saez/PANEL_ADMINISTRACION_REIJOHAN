class ChatMain extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = /* html */`
      <slot name="header"></slot>
      <slot name="conversation"></slot>
      <slot name="input"></slot>
    `;

  }

}

customElements.define("chat-main", ChatMain);
