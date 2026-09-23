class ChatHistory extends HTMLElement {

  constructor() {

    super();

    this.attachShadow({
      mode: "open"
    });

    this.shadowRoot.innerHTML = /* html */ `

      <style>

        :host {
          display: flex;

          flex: 1 1 auto;

          width: 100%;
          min-width: 0;
          min-height: 0;

          overflow: hidden;

          color:
            hsl(0, 0%, 96%);

          transition:
            color 0.3s ease;
        }


        .chat-history {
          width: 100%;
          height: 100%;

          min-width: 0;
          min-height: 0;

          display: flex;
          flex-direction: column;

          overflow: hidden;
        }


        .chat-history-button {
          display: none;

          width: 100%;

          align-items: center;

          gap: 0.625rem;

          padding:
            0.625rem 0.75rem;

          border: 0;

          background: transparent;

          color:
            hsl(0, 0%, 72%);

          font-family: inherit;

          font-size: 0.8125rem;

          text-align: left;

          cursor: pointer;

          transition:
            background-color 0.3s ease,
            color 0.3s ease;
        }


        .chat-history-button:hover {
          background:
            hsl(0, 0%, 11%);

          color:
            hsl(0, 0%, 96%);
        }


        .chat-history-icon {
          width: 1rem;
          height: 1rem;

          flex-shrink: 0;

          display: block;

          position: relative;

          border:
            0.0625rem solid
            currentColor;

          border-radius:
            0.1875rem;
        }


        .chat-history-icon::before,
        .chat-history-icon::after {

          content: "";

          position: absolute;

          left: 0.1875rem;
          right: 0.1875rem;

          height: 0.0625rem;

          background:
            currentColor;
        }


        .chat-history-icon::before {
          top: 0.3125rem;
        }


        .chat-history-icon::after {
          top: 0.5625rem;
        }


        .chat-history-title {
          min-width: 0;

          overflow: hidden;

          white-space: nowrap;

          text-overflow: ellipsis;
        }


        .chat-history-list {
          width: 100%;

          height: 100%;

          min-width: 0;
          min-height: 0;

          overflow-x: hidden;
          overflow-y: auto;

          scrollbar-width: thin;

          scrollbar-color:
            hsl(0, 0%, 28%)
            transparent;
        }


        .chat-history-list::-webkit-scrollbar {
          width: 0.375rem;
        }


        .chat-history-list::-webkit-scrollbar-track {
          background: transparent;
        }


        .chat-history-list::-webkit-scrollbar-thumb {
          background:
            hsl(0, 0%, 28%);

          border-radius:
            999rem;
        }


        .chat-history-item {
          width: 100%;

          min-width: 0;

          padding:
            0.125rem 0.75rem;
        }


        .chat-history-link {
          display: block;

          width: 100%;

          min-width: 0;

          padding:
            0.5625rem 0.625rem;

          border-radius:
            0.375rem;

          overflow: hidden;

          color:
            hsl(0, 0%, 75%);

          text-decoration: none;

          font-size: 0.8125rem;

          line-height: 1.4;

          white-space: nowrap;

          text-overflow: ellipsis;

          transition:
            background-color 0.3s ease,
            color 0.3s ease;
        }


        .chat-history-link:hover {
          background:
            hsl(0, 0%, 12%);

          color:
            hsl(0, 0%, 96%);
        }


        :host([data-theme="light"]) {

          color:
            hsl(0, 0%, 10%);
        }


        :host([data-theme="light"])
        .chat-history-button {

          color:
            hsl(0, 0%, 42%);
        }


        :host([data-theme="light"])
        .chat-history-button:hover {

          background:
            hsl(0, 0%, 92%);

          color:
            hsl(0, 0%, 10%);
        }


        :host([data-theme="light"])
        .chat-history-list {

          scrollbar-color:
            hsl(0, 0%, 72%)
            transparent;
        }


        :host([data-theme="light"])
        .chat-history-list::-webkit-scrollbar-thumb {

          background:
            hsl(0, 0%, 72%);
        }


        :host([data-theme="light"])
        .chat-history-link {

          color:
            hsl(0, 0%, 35%);
        }


        :host([data-theme="light"])
        .chat-history-link:hover {

          background:
            hsl(0, 0%, 92%);

          color:
            hsl(0, 0%, 10%);
        }


        :host([collapsed])
        .chat-history-list {

          display: none;
        }


        :host([collapsed])
        .chat-history-button {

          display: flex;
        }


        @media (max-width: 64rem) {

          .chat-history-button {
            display: flex;
          }


          .chat-history-list {
            display: block;
          }


          :host([collapsed])
          .chat-history-list {
            display: block;
          }

        }


        @media (max-width: 30rem) {

          .chat-history-item {
            padding:
              0.125rem 0.625rem;
          }


          .chat-history-link {
            padding:
              0.5rem 0.5625rem;
          }

        }


        @media (max-width: 22rem) {

          .chat-history-item {
            padding:
              0.125rem 0.5rem;
          }

        }

      </style>


      <div class="chat-history">

        <button
          type="button"
          class="chat-history-button"
          aria-label="Historial de chats">

          <span class="chat-history-icon"></span>

          <span class="chat-history-title">
            Historial de chats
          </span>

        </button>


        <div class="chat-history-list"></div>

      </div>

    `;


    this.historyButton =
      this.shadowRoot.querySelector(
        ".chat-history-button"
      );


    this.chatHistoryList =
      this.shadowRoot.querySelector(
        ".chat-history-list"
      );


    this.handleHistoryButton =
      this.handleHistoryButton.bind(this);


    this.handleHistoryLink =
      this.handleHistoryLink.bind(this);

  }


  connectedCallback() {

    this.loadData();

    this.render();

    this.historyButton.addEventListener(
      "click",
      this.handleHistoryButton
    );

    this.syncWithSidebar();

  }


  loadData() {

    this.data = [

      {
        name:
          "Conversación sobre desarrollo web y user-avatar-container",

        url:
          "url1",

        id:
          1
      },

      {
        name:
          "Ideas para mi nuevo proyecto de iniciación a la programación en Python.",

        url:
          "url2",

        id:
          2
      },

      {
        name:
          "Preguntas sobre HTML y CSS",

        url:
          "url3",

        id:
          3
      },

      {
        name:
          "Diseño de interfaz para aplicación",

        url:
          "url4",

        id:
          4
      },

      {
        name:
          "Conversación especialmente larga cuyo nombre debe cortarse automáticamente",

        url:
          "url5",

        id:
          5
      }

    ];

  }


  render() {

    this.chatHistoryList.innerHTML = "";


    this.data.forEach(
      (item) => {

        const chatHistoryItem =
          document.createElement("div");


        chatHistoryItem.classList.add(
          "chat-history-item"
        );


        const chatHistoryLink =
          document.createElement("a");


        chatHistoryLink.classList.add(
          "chat-history-link"
        );


        chatHistoryLink.href =
          item.url;


        chatHistoryLink.textContent =
          item.name;


        chatHistoryLink.dataset.id =
          item.id;


        chatHistoryItem.appendChild(
          chatHistoryLink
        );


        this.chatHistoryList.appendChild(
          chatHistoryItem
        );


        chatHistoryLink.addEventListener(
          "click",
          this.handleHistoryLink
        );

      }
    );

  }


  disconnectedCallback() {

    this.historyButton.removeEventListener(
      "click",
      this.handleHistoryButton
    );


    const historyLinks =
      this.shadowRoot.querySelectorAll(
        ".chat-history-link"
      );


    historyLinks.forEach(
      (link) => {

        link.removeEventListener(
          "click",
          this.handleHistoryLink
        );

      }
    );

  }


  handleHistoryButton(event) {

    event.preventDefault();


    const sidebar =
      this.closest("chat-sidebar");


    if (!sidebar) {
      return;
    }


    if (
      window.innerWidth > 1024 &&
      sidebar.hasAttribute("collapsed")
    ) {

      this.dispatchEvent(
        new CustomEvent(
          "sidebar-open-request",
          {
            bubbles: true,
            composed: true
          }
        )
      );

    }

  }


  handleHistoryLink(event) {

    event.preventDefault();


    if (window.innerWidth <= 1024) {

      this.dispatchEvent(
        new CustomEvent(
          "sidebar-close-request",
          {
            bubbles: true,
            composed: true
          }
        )
      );

    }

  }


  syncWithSidebar() {

    const sidebar =
      this.closest("chat-sidebar");


    if (!sidebar) {
      return;
    }


    const theme =
      sidebar.getAttribute(
        "data-theme"
      );


    if (theme) {

      this.setAttribute(
        "data-theme",
        theme
      );

    } else {

      this.removeAttribute(
        "data-theme"
      );

    }


    if (
      sidebar.hasAttribute(
        "collapsed"
      )
    ) {

      this.setAttribute(
        "collapsed",
        ""
      );

    } else {

      this.removeAttribute(
        "collapsed"
      );

    }

  }

}


customElements.define(
  "chat-history",
  ChatHistory
);