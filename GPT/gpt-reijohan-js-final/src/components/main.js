class ChatMain extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = /* html */`
      
      <style>
        :host {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
          width: auto;
          min-width: 0;
          height: 100%;
          min-height: 0;
          overflow: hidden;
          box-sizing: border-box;
          position: relative;
        }

        ::slotted([slot="conversation"]) {
          flex: 1 1 auto;
          min-height: 0;
          min-width: 0;
        }
      </style>

      <slot name="header"></slot>
      <slot name="conversation"></slot>
      <slot name="input"></slot>
    `;

  }

}

customElements.define("chat-main", ChatMain);