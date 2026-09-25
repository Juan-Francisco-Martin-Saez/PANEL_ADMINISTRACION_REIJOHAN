class ChatStatus extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" })
    this.shadow.innerHTML = /* html */ `

      <style>

        :host {
          display: none;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
          color:hsl(0, 0%, 72%);
          transition: opacity 0.3s ease,color 0.3s ease;
        }

        .search-status-container {
          width: 100%;
          min-width: 0;
          max-width: 56.25rem;
          margin:0 auto;
          padding: 0.5rem 0 1.5rem;
          box-sizing: border-box;
          text-align: center;
          color: hsl(0, 0%, 72%);
          transition: color 0.3s ease;
        }

        .search-status {
          margin:0 0 0.75rem;
          font-size:0.9375rem;
          line-height:1.4;
          font-weight: 500;
        }

        .search-funny-message {
          margin:0;
          font-size:0.8125rem;
          line-height:1.6;
          color:hsl(0, 0%, 58%);
          transition: color 0.3s ease;
        }

        :host([visible]) {
          display: block;
        }

        :host([data-theme="light"])
        .search-status-container {
          color: hsl(0, 0%, 35%);
        }

        :host([data-theme="light"])
        .search-funny-message {
          color: hsl(0, 0%, 48%);
        }

        @media (max-width: 64rem) {

          .search-status-container {
            padding:0.5rem 0 1.25rem;
          }
        }

        @media (max-width: 48rem) {

          .search-status-container {
            padding:0.5rem 0 1rem;
          }

          .search-status {
            font-size:0.875rem;
          }

          .search-funny-message {
            font-size:0.75rem;
            line-height:1.55;
          }

        }

        @media (max-width: 30rem) {

          .search-status-container {
            padding:0.375rem 0 0.875rem;
          }

          .search-status {
            font-size:0.8125rem;
          }

        }

        @media (max-width: 22rem) {

          .search-status-container {
            padding:0.375rem 0 0.75rem;
          }

          .search-status {
            font-size:0.75rem;
          }

          .search-funny-message {
            font-size:0.6875rem;
          }

        }

        @media (min-width: 120rem) {

          .search-status-container {
            max-width: 62rem;
          }

        }

      </style>


      <div class="search-status-container">
        <p class="search-status">
          Tu consulta está en proceso...
        </p>
        <p class="search-funny-message">
          Estoy revolviendo mis neuronas digitales,
          ordenando un ejército de unos y ceros y
          preguntándole a mis circuitos si recuerdan
          dónde guardaron la respuesta. Mientras tanto,
          algunos bits están corriendo de un lado para
          otro con cara de absoluta importancia, otros
          están fingiendo que están trabajando y uno
          probablemente se ha ido a por café. Dame un
          momento y trataré de convertir todo este
          espectáculo tecnológico en una respuesta que
          parezca perfectamente normal. Si escuchas
          pequeños ruidos de fondo, no te preocupes:
          probablemente sea mi dignidad intentando
          mantenerse conectada.
        </p>
      </div>
    `;


    this.handleSidebarChange = this.handleSidebarChange.bind(this);
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

    this.sidebarObserver = new MutationObserver(this.handleSidebarChange);

    this.sidebarObserver.observe(sidebar, {
      attributes: true,
      attributeFilter: ["data-theme"]
    }
    );

  }

  handleSidebarChange() {

    this.syncWithSidebar();

  }

}


customElements.define("chat-status", ChatStatus);