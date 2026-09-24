class ChatLogo extends HTMLElement {

  constructor() {

    super();

    this.attachShadow({
      mode: "open"
    });


    this.shadowRoot.innerHTML = /* html */ `

      <style>

        /* =====================================
           COMPONENTE CHAT LOGO
        ===================================== */

        :host {

          display: block;

          position: relative;
          z-index: 1;

          width: 100%;
          max-width: 100%;

          min-width: 0;

          box-sizing: border-box;

          flex:
            0 0 auto;

          color:
            hsl(0, 0%, 96%);

          transition:
            color 0.3s ease;
        }


        /* =====================================
           LOGO
        ===================================== */

        .sidebar-logo {

          position: relative;
          z-index: 1;

          width: 100%;
          max-width: 100%;

          min-width: 0;

          height: 4.375rem;

          display: flex;

          align-items: center;
          justify-content: flex-start;

          box-sizing: border-box;

          padding:
            0 1.25rem;

          overflow: hidden;

          background:
            hsl(0, 0%, 6%);

          border-bottom:
            0.0625rem solid
            hsl(0, 0%, 19%);

          color:
            inherit;

          white-space: nowrap;

          transition:
            background-color 0.3s ease,
            border-color 0.3s ease,
            color 0.3s ease,
            padding 0.3s ease,
            justify-content 0.3s ease;
        }


        /* =====================================
           TEXTO DEL LOGO
        ===================================== */

        .sidebar-logo span {

          display: block;

          width: auto;
          max-width: 100%;

          min-width: 0;

          overflow: hidden;

          color:
            inherit;

          font-size:
            1.25rem;

          font-weight:
            700;

          line-height:
            1.2;

          text-overflow:
            ellipsis;

          white-space: nowrap;

          opacity: 1;

          transition:
            opacity 0.3s ease,
            width 0.3s ease,
            max-width 0.3s ease;
        }


        /* =====================================
           TEMA CLARO
        ===================================== */

        :host([data-theme="light"]) {

          color:
            hsl(0, 0%, 10%);
        }


        :host([data-theme="light"])
        .sidebar-logo {

          background:
            hsl(0, 0%, 98%);

          border-bottom-color:
            hsl(0, 0%, 84%);
        }


        /* =====================================
           SIDEBAR CONTRAÍDO
        ===================================== */

        :host([collapsed])
        .sidebar-logo {

          justify-content:
            center;

          padding:
            0;

        }


        :host([collapsed])
        .sidebar-logo span {

          width: 0;
          max-width: 0;

          opacity: 0;
        }


        /* =====================================
           TABLET / MÓVIL
        ===================================== */

        /*
          En el layout móvil el sidebar funciona
          como un drawer. Cuando está abierto no
          debe conservar el aspecto contraído.
        */

        @media (max-width: 64rem) {

          .sidebar-logo {

            height: 4rem;

            padding:
              0 1.25rem;
          }


          :host([collapsed])
          .sidebar-logo {

            justify-content:
              flex-start;

            padding:
              0 1.25rem;
          }


          :host([collapsed])
          .sidebar-logo span {

            width: auto;
            max-width: 100%;

            opacity: 1;
          }
        }


        /* =====================================
           MÓVIL
        ===================================== */

        @media (max-width: 48rem) {

          .sidebar-logo {

            height: 3.875rem;

            padding:
              0 1rem;
          }


          :host([collapsed])
          .sidebar-logo {

            padding:
              0 1rem;
          }
        }


        /* =====================================
           MÓVIL PEQUEÑO
        ===================================== */

        @media (max-width: 30rem) {

          .sidebar-logo {

            height: 3.75rem;

            padding:
              0 0.875rem;
          }


          :host([collapsed])
          .sidebar-logo {

            padding:
              0 0.875rem;
          }
        }


        /* =====================================
           MÓVIL MUY PEQUEÑO
        ===================================== */

        @media (max-width: 22rem) {

          .sidebar-logo {

            height: 3.5rem;

            padding:
              0 0.75rem;
          }


          :host([collapsed])
          .sidebar-logo {

            padding:
              0 0.75rem;
          }
        }


        /* =====================================
           POCA ALTURA
        ===================================== */

        @media (max-height: 40rem) {

          .sidebar-logo {

            height: 3.5rem;
          }
        }


        /* =====================================
           POCA ALTURA + MÓVIL
        ===================================== */

        @media (max-width: 64rem)
        and (max-height: 40rem) {

          .sidebar-logo {

            height: 3.375rem;
          }
        }


        /* =====================================
           PRIORIDAD SOBRE EL BOTÓN DEL SIDEBAR
        ===================================== */

        /*
          El botón pertenece a ChatSidebarHeader.
          ChatLogo no debe colocarse por encima
          de él.
        */

        :host {

          pointer-events: none;
        }


        .sidebar-logo {

          pointer-events: none;
        }

      </style>


      <div class="sidebar-logo">

        <span>
          ReijohanGPT
        </span>

      </div>

    `;


    /* =====================================
       OBSERVADOR DEL SIDEBAR
    ===================================== */

    this.sidebarObserver = null;

  }


  /* =====================================
     COMPONENTE CONECTADO
  ===================================== */

  connectedCallback() {

    this.syncWithSidebar();

    this.observeSidebar();

  }


  /* =====================================
     COMPONENTE DESCONECTADO
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


    /* =================================
       TEMA
    ================================= */

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


    /* =================================
       ESTADO CONTRAÍDO
    ================================= */

    if (
      sidebar.hasAttribute("collapsed")
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
        (mutations) => {

          const relevantChange =
            mutations.some(
              (mutation) =>
                mutation.type === "attributes" &&
                (
                  mutation.attributeName ===
                  "data-theme" ||

                  mutation.attributeName ===
                  "collapsed"
                )
            );


          if (relevantChange) {

            this.syncWithSidebar();

          }

        }
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

}


customElements.define("chat-logo", ChatLogo);