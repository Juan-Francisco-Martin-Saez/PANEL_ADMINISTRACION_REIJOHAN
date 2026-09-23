class ChatTheme extends HTMLElement {

  constructor() {

    super();

    this.attachShadow({
      mode: "open"
    });

    this.shadowRoot.innerHTML = /* html */ `

      <style>

        /* =====================================
           COMPONENTE TEMA
        ===================================== */

        :host {
          display: block;

          width: 100%;
          min-width: 0;

          flex-shrink: 0;

          box-sizing: border-box;

          color:
            hsl(0, 0%, 75%);

          transition:
            color 0.3s ease;
        }


        /* =====================================
           CONTENEDOR
        ===================================== */

        .theme-switch-container {
          width: 100%;
          min-width: 0;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap:
            0.75rem;

          padding:
            0.875rem 1rem;

          box-sizing: border-box;

          border-top:
            0.0625rem solid
            hsl(0, 0%, 15%);

          transition:
            border-color 0.3s ease;
        }


        /* =====================================
           ETIQUETA
        ===================================== */

        .theme-switch-label {
          min-width: 0;

          overflow: hidden;

          white-space: nowrap;

          text-overflow: ellipsis;

          font-size:
            0.8125rem;

          line-height:
            1.3;

          color:
            hsl(0, 0%, 70%);

          transition:
            color 0.3s ease,
            opacity 0.3s ease;
        }


        /* =====================================
           INTERRUPTOR
        ===================================== */

        .theme-switch {
          position: relative;

          width:
            4.125rem;

          height:
            2rem;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding:
            0 0.4375rem;

          box-sizing: border-box;

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


        /* =====================================
           ICONOS
        ===================================== */

        .theme-icon {
          position: relative;

          z-index: 2;

          width:
            1rem;

          height:
            1rem;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size:
            0.875rem;

          line-height:
            1;

          color:
            hsl(0, 0%, 75%);

          pointer-events: none;

          transition:
            color 0.3s ease;
        }


        /* =====================================
           DESLIZADOR
        ===================================== */

        .theme-switch-slider {
          position: absolute;

          top:
            0.1875rem;

          left:
            0.1875rem;

          width:
            1.5rem;

          height:
            1.5rem;

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


        /* =====================================
           TEMA CLARO
        ===================================== */

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
        .theme-switch:hover {

          border-color:
            hsl(0, 0%, 68%);
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


        /* =====================================
           SIDEBAR COLAPSADO
        ===================================== */

        :host([collapsed])
        .theme-switch-container {

          justify-content:
            center;

          padding:
            0.375rem 0;
        }


        :host([collapsed])
        .theme-switch-label {

          display:
            none;
        }


        :host([collapsed])
        .theme-switch {

          width:
            2.75rem;

          height:
            1.625rem;
        }


        :host([collapsed])
        .theme-icon {

          width:
            0.8rem;

          height:
            0.8rem;

          font-size:
            0.65rem;
        }


        :host([collapsed])
        .theme-switch-slider {

          top:
            0.1625rem;

          left:
            0.1625rem;

          width:
            1.2rem;

          height:
            1.2rem;
        }


        :host([collapsed][data-theme="light"])
        .theme-switch-slider {

          transform:
            translateX(1.125rem);
        }


        /* =====================================
           TABLET / MÓVIL
        ===================================== */

        @media (max-width: 64rem) {

          :host([collapsed])
          .theme-switch-container {

            justify-content:
              space-between;

            padding:
              0.875rem 1rem;
          }


          :host([collapsed])
          .theme-switch-label {

            display:
              block;
          }


          :host([collapsed])
          .theme-switch {

            width:
              4.125rem;

            height:
              2rem;
          }


          :host([collapsed])
          .theme-icon {

            width:
              1rem;

            height:
              1rem;

            font-size:
              0.875rem;
          }


          :host([collapsed])
          .theme-switch-slider {

            top:
              0.1875rem;

            left:
              0.1875rem;

            width:
              1.5rem;

            height:
              1.5rem;
          }


          :host([collapsed][data-theme="light"])
          .theme-switch-slider {

            transform:
              translateX(2.125rem);
          }

        }


        /* =====================================
           MÓVIL
        ===================================== */

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


        /* =====================================
           ALTURA REDUCIDA
        ===================================== */

        @media (max-height: 40rem) {

          .theme-switch-container {

            padding-top:
              0.625rem;

            padding-bottom:
              0.625rem;
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

    this.handleSidebarChange =
      this.handleSidebarChange.bind(this);

  }


  /* =====================================
     CONECTAR COMPONENTE
  ===================================== */

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

    this.observeSidebar();

  }


  /* =====================================
     DESCONECTAR COMPONENTE
  ===================================== */

  disconnectedCallback() {

    this.themeSwitch.removeEventListener(
      "click",
      this.handleClick
    );


    this.themeSwitch.removeEventListener(
      "keydown",
      this.handleKeyDown
    );


    if (this.sidebarObserver) {

      this.sidebarObserver.disconnect();

      this.sidebarObserver = null;

    }

  }


  /* =====================================
     CLICK
  ===================================== */

  handleClick(event) {

    event.preventDefault();

    this.toggleTheme();

  }


  /* =====================================
     TECLADO
  ===================================== */

  handleKeyDown(event) {

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {

      event.preventDefault();

      this.toggleTheme();

    }

  }


  /* =====================================
     CAMBIAR TEMA
  ===================================== */

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


    const newTheme =
      currentTheme === "light"
        ? "dark"
        : "light";


    /*
      ChatSidebar continúa siendo el
      propietario del estado del tema.
    */

    if (
      typeof sidebar.setTheme ===
      "function"
    ) {

      sidebar.setTheme(
        newTheme
      );

    }

  }


  /* =====================================
     SINCRONIZAR CON SIDEBAR
  ===================================== */

  syncWithSidebar() {

    const sidebar =
      this.closest("chat-sidebar");


    if (!sidebar) {
      return;
    }


    /* ---------- TEMA ---------- */

    const theme =
      sidebar.getAttribute(
        "data-theme"
      );


    if (
      theme === "light"
    ) {

      this.setAttribute(
        "data-theme",
        "light"
      );

    } else {

      this.removeAttribute(
        "data-theme"
      );

    }


    /* ---------- COLAPSADO ---------- */

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


  /* =====================================
     OBSERVAR SIDEBAR
  ===================================== */

  observeSidebar() {

    const sidebar =
      this.closest("chat-sidebar");


    if (!sidebar) {
      return;
    }


    if (this.sidebarObserver) {

      this.sidebarObserver.disconnect();

    }


    this.sidebarObserver =
      new MutationObserver(
        this.handleSidebarChange
      );


    this.sidebarObserver.observe(
      sidebar,
      {
        attributes: true,

        attributeFilter: [
          "data-theme",
          "collapsed"
        ]
      }
    );

  }


  /* =====================================
     CAMBIO DEL SIDEBAR
  ===================================== */

  handleSidebarChange() {

    this.syncWithSidebar();

  }

}


customElements.define("chat-theme", ChatTheme);