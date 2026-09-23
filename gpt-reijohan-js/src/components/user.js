class ChatUser extends HTMLElement {

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
            hsl(0, 0%, 96%);

          transition:
            color 0.3s ease;
        }


        .sidebar-user {
          width: 100%;

          display: flex;
          align-items: center;

          gap: 0.75rem;

          padding:
            0.875rem 1rem;

          border-top:
            0.0625rem solid
            hsl(0, 0%, 15%);

          overflow: hidden;

          transition:
            background-color 0.3s ease,
            border-color 0.3s ease,
            padding 0.3s ease,
            gap 0.3s ease;
        }


        .user-avatar-container {
          width: 2.25rem;
          height: 2.25rem;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          overflow: hidden;

          border-radius:
            50%;

          background:
            hsl(0, 0%, 16%);

          transition:
            background-color 0.3s ease;
        }


        .user-avatar {
          display: block;

          width: 100%;
          height: 100%;

          max-width: none;

          object-fit: cover;
        }


        .user-info {
          min-width: 0;

          flex: 1;

          overflow: hidden;

          transition:
            opacity 0.2s ease,
            width 0.3s ease;
        }


        .user-name {
          display: block;

          width: 100%;

          overflow: hidden;

          white-space: nowrap;

          text-overflow: ellipsis;

          color:
            hsl(0, 0%, 82%);

          font-size:
            0.8125rem;

          line-height: 1.4;

          transition:
            color 0.3s ease;
        }


        :host([data-theme="light"]) {

          color:
            hsl(0, 0%, 10%);
        }


        :host([data-theme="light"])
        .sidebar-user {

          border-top-color:
            hsl(0, 0%, 86%);
        }


        :host([data-theme="light"])
        .user-avatar-container {

          background:
            hsl(0, 0%, 90%);
        }


        :host([data-theme="light"])
        .user-name {

          color:
            hsl(0, 0%, 25%);
        }


        :host([collapsed])
        .sidebar-user {

          justify-content: center;

          gap: 0;

          padding:
            0.875rem 0.625rem;
        }


        :host([collapsed])
        .user-info {

          width: 0;

          flex: 0 0 0;

          opacity: 0;
        }


        @media (max-width: 64rem) {

          :host([collapsed])
          .sidebar-user {

            justify-content: flex-start;

            gap: 0.75rem;

            padding:
              0.875rem 1rem;
          }


          :host([collapsed])
          .user-info {

            width: auto;

            flex: 1;

            opacity: 1;
          }

        }


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


    this.syncWithSidebar();

  }


  connectedCallback() {

    this.syncWithSidebar();

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


customElements.define("chat-user", ChatUser);