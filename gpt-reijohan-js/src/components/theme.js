class ChatTheme extends HTMLElement {

  constructor() {

    super();

    this.attachShadow({
      mode: "open"
    });

    this.shadowRoot.innerHTML = /* html */ `

      <style>

        :host {
          display: block;

          width: 100%;

          flex-shrink: 0;

          color:
            hsl(0, 0%, 75%);

          transition:
            color 0.3s ease;
        }


        .theme-switch-container {
          width: 100%;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 0.75rem;

          padding:
            0.875rem 1rem;

          border-top:
            0.0625rem solid
            hsl(0, 0%, 15%);
        }


        .theme-switch-label {
          min-width: 0;

          overflow: hidden;

          white-space: nowrap;

          text-overflow: ellipsis;

          font-size:
            0.8125rem;

          line-height: 1.3;

          color:
            hsl(0, 0%, 70%);

          transition:
            color 0.3s ease,
            opacity 0.3s ease;
        }


        .theme-switch {
          position: relative;

          width: 4.125rem;
          height: 2rem;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding:
            0 0.4375rem;

          border:
            0.0625rem solid
            hsl(0, 0%, 27%);

          border-radius:
            999rem;

          background:
            hsl(0, 0%, 12%);

          cursor: pointer;

          overflow: hidden;

          transition:
            background-color 0.3s ease,
            border-color 0.3s ease;
        }


        .theme-switch:hover {
          border-color:
            hsl(0, 0%, 36%);
        }


        .theme-switch:focus-visible {
          outline:
            0.125rem solid
            hsl(0, 0%, 70%);

          outline-offset:
            0.125rem;
        }


        .theme-icon {
          position: relative;

          z-index: 2;

          display: flex;
          align-items: center;
          justify-content: center;

          width: 1rem;
          height: 1rem;

          font-size:
            0.875rem;

          line-height: 1;

          color:
            hsl(0, 0%, 75%);

          transition:
            color 0.3s ease;
        }


        .theme-switch-slider {
          position: absolute;

          top: 0.1875rem;
          left: 0.1875rem;

          width: 1.5rem;
          height: 1.5rem;

          border-radius:
            50%;

          background:
            hsl(0, 0%, 92%);

          box-shadow:
            0 0.125rem 0.375rem
            hsla(0, 0%, 0%, 0.35);

          transition:
            transform 0.3s ease,
            background-color 0.3s ease;
        }


        :host([data-theme="light"]) {

          color:
            hsl(0, 0%, 20%);
        }


        :host([data-theme="light"])
        .theme-switch-container {

          border-top-color:
            hsl(0, 0%, 86%);
        }


        :host([data-theme="light"])
        .theme-switch-label {

          color:
            hsl(0, 0%, 35%);
        }


        :host([data-theme="light"])
        .theme-switch {

          background:
            hsl(0, 0%, 91%);

          border-color:
            hsl(0, 0%, 78%);
        }


        :host([data-theme="light"])
        .theme-icon-dark {

          color:
            hsl(0, 0%, 48%);
        }


        :host([data-theme="light"])
        .theme-icon-light {

          color:
            hsl(0, 0%, 10%);
        }


        :host([data-theme="light"])
        .theme-switch-slider {

          transform:
            translateX(2.125rem);

          background:
            hsl(0, 0%, 18%);
        }


        :host([collapsed])
        .theme-switch-container {

          justify-content: center;

          padding:
            0.875rem 0.625rem;
        }


        :host([collapsed])
        .theme-switch-label {

          display: none;
        }


        @media (max-width: 64rem) {

          :host([collapsed])
          .theme-switch-container {

            justify-content: space-between;

            padding:
              0.875rem 1rem;
          }


          :host([collapsed])
          .theme-switch-label {

            display: block;
          }

        }


        @media (max-width: 30rem) {

          .theme-switch-container {

            padding:
              0.75rem;
          }

        }


        @media (max-width: 22rem) {

          .theme-switch-container {

            padding:
              0.625rem 0.75rem;
          }

        }

      </style>


      <div class="theme-switch-container">

        <span class="theme-switch-label">
          Apariencia
        </span>


        <div
          class="theme-switch"
          role="button"
          tabindex="0"
          aria-label="Cambiar entre tema oscuro y tema claro">

          <span class="theme-icon theme-icon-dark">
            ☾
          </span>

          <span class="theme-switch-slider"></span>

          <span class="theme-icon theme-icon-light">
            ☀
          </span>

        </div>

      </div>

    `;


    this.themeSwitch =
      this.shadowRoot.querySelector(
        ".theme-switch"
      );


    this.handleClick =
      this.handleClick.bind(this);

    this.handleKeyDown =
      this.handleKeyDown.bind(this);

  }


  connectedCallback() {

    this.themeSwitch.addEventListener(
      "click",
      this.handleClick
    );


    this.themeSwitch.addEventListener(
      "keydown",
      this.handleKeyDown
    );


    this.syncWithSidebar();

  }


  disconnectedCallback() {

    this.themeSwitch.removeEventListener(
      "click",
      this.handleClick
    );


    this.themeSwitch.removeEventListener(
      "keydown",
      this.handleKeyDown
    );

  }


  handleClick(event) {

    event.preventDefault();

    this.toggleTheme();

  }


  handleKeyDown(event) {

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {

      event.preventDefault();

      this.toggleTheme();

    }

  }


  toggleTheme() {

    const sidebar =
      this.closest("chat-sidebar");


    if (!sidebar) {
      return;
    }


    const currentTheme =
      sidebar.getAttribute(
        "data-theme"
      );


    if (currentTheme === "light") {

      sidebar.setTheme("dark");

    } else {

      sidebar.setTheme("light");

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


customElements.define("chat-theme", ChatTheme);