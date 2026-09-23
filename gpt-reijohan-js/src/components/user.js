class ChatUser extends HTMLElement {

  constructor() {

    super();

    this.attachShadow({
      mode: "open"
    });

    this.shadowRoot.innerHTML = /* html */ `

      <style>

        /* =====================================
           COMPONENTE USUARIO
        ===================================== */

        :host {
          display: block;

          width: 100%;

          min-width: 0;

          flex-shrink: 0;

          box-sizing: border-box;

          color:
            hsl(0, 0%, 96%);

          transition:
            color 0.3s ease;
        }


        /* =====================================
           CONTENEDOR USUARIO
        ===================================== */

        .sidebar-user {
          width: 100%;

          min-width: 0;

          display: flex;
          align-items: center;

          gap: 0.75rem;

          flex-shrink: 0;

          padding:
            0.9375rem;

          box-sizing: border-box;

          overflow: hidden;

          background:
            hsl(0, 0%, 6%);

          border-top:
            0.0625rem solid
            hsl(0, 0%, 19%);

          transition:
            background-color 0.3s ease,
            border-color 0.3s ease,
            padding 0.3s ease,
            gap 0.3s ease;
        }


        /* =====================================
           AVATAR
        ===================================== */

        .user-avatar-container {
          width: 2.75rem;
          height: 2.75rem;

          flex-shrink: 0;

          overflow: hidden;

          border-radius: 50%;

          background:
            hsl(0, 0%, 20%);

          border:
            0.15rem solid
            hsl(0, 0%, 41%);

          box-sizing: border-box;

          transition:
            background-color 0.3s ease,
            border-color 0.3s ease;
        }


        .user-avatar {
          display: block;

          width: 100%;
          height: 100%;

          max-width: none;

          object-fit: cover;
        }


        /* =====================================
           INFORMACIÓN
        ===================================== */

        .user-info {
          min-width: 0;

          flex: 1 1 auto;

          overflow: hidden;

          transition:
            opacity 0.2s ease,
            width 0.3s ease;
        }


        .user-name {
          display: block;

          width: 100%;

          min-width: 0;

          overflow: hidden;

          color:
            hsl(0, 0%, 96%);

          font-size:
            0.875rem;

          font-weight: 700;

          line-height: 1.4;

          white-space: nowrap;

          text-overflow: ellipsis;

          transition:
            color 0.3s ease;
        }


        /* =====================================
           TEMA CLARO
        ===================================== */

        :host([data-theme="light"]) {

          color:
            hsl(0, 0%, 10%);
        }


        :host([data-theme="light"])
        .sidebar-user {

          background:
            hsl(0, 0%, 98%);

          border-top-color:
            hsl(0, 0%, 84%);
        }


        :host([data-theme="light"])
        .user-avatar-container {

          background:
            hsl(0, 0%, 88%);

          border-color:
            hsl(0, 0%, 70%);
        }


        :host([data-theme="light"])
        .user-name {

          color:
            hsl(0, 0%, 12%);
        }


        /* =====================================
           SIDEBAR COLAPSADO
        ===================================== */

        :host([collapsed])
        .sidebar-user {

          justify-content: center;

          gap: 0;

          padding:
            0.75rem 0.625rem;
        }


        :host([collapsed])
        .user-info {

          width: 0;

          flex:
            0 0 0;

          opacity: 0;
        }


        /* =====================================
           TABLET / MÓVIL
        ===================================== */

        @media (max-width: 64rem) {

          :host([collapsed])
          .sidebar-user {

            justify-content: flex-start;

            gap: 0.75rem;

            padding:
              0.9375rem;
          }


          :host([collapsed])
          .user-info {

            width: auto;

            flex:
              1 1 auto;

            opacity: 1;
          }

        }


        /* =====================================
           PANTALLAS PEQUEÑAS
        ===================================== */

        @media (max-width: 30rem) {

          .sidebar-user {

            padding:
              0.75rem;
          }

        }


        @media (max-width: 22rem) {

          .sidebar-user {

            padding:
              0.625rem 0.75rem;
          }

        }


        /* =====================================
           ALTURA REDUCIDA
        ===================================== */

        @media (max-height: 40rem) {

          .sidebar-user {

            padding:
              0.75rem;
          }


          :host([collapsed])
          .sidebar-user {

            padding:
              0.625rem;
          }

        }

      </style>


      <div class="sidebar-user">

        <div class="user-avatar-container">

          <img
            src="img/logo.svg"
            alt="Avatar del usuario"
            class="user-avatar">

        </div>


        <div class="user-info">

          <span class="user-name">
            Juan Francisco Martín Sáez
          </span>

        </div>

      </div>

    `;


    this.handleSidebarChange =
      this.handleSidebarChange.bind(this);

    this.syncWithSidebar();

  }


  /* =====================================
     CONECTAR COMPONENTE
  ===================================== */

  connectedCallback() {

    this.syncWithSidebar();

    this.observeSidebar();

  }


  /* =====================================
     DESCONECTAR COMPONENTE
  ===================================== */

  disconnectedCallback() {

    if (this.sidebarObserver) {

      this.sidebarObserver.disconnect();

      this.sidebarObserver = null;

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


    /* ---------- ESTADO COLAPSADO ---------- */

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
     OBSERVAR CAMBIOS DEL SIDEBAR
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
     CAMBIO EN SIDEBAR
  ===================================== */

  handleSidebarChange() {

    this.syncWithSidebar();

  }

}


customElements.define("chat-user", ChatUser);