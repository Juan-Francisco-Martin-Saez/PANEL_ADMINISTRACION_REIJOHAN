class AppHeader extends HTMLElement {

  constructor() {

    super();

    this.attachShadow({
      mode: "open"
    });

    this.shadowRoot.innerHTML =
    /*html*/`

      <style>

        /* =====================================
           CABECERA
        ===================================== */

        :host {
          display: block;

          width: 100%;
          max-width: 100%;

          height: 5.25rem;
          min-height: 5.25rem;

          box-sizing: border-box;

          background:
            var(--color-cabecera);

          overflow: hidden;
        }


        /* =====================================
           CONTENEDOR
        ===================================== */

        .cabecera {
          display: flex;

          align-items: center;
          justify-content: space-between;

          width: 100%;
          max-width: 100%;

          height: 100%;

          box-sizing: border-box;

          padding-inline: 2rem;

          background:
            var(--color-cabecera);

          border-bottom:
            0.0625rem solid
            var(--color-borde);

          box-shadow:
            0
            0.25rem
            1rem
            var(--color-sombra);

          overflow: hidden;
        }


        /* =====================================
           LOGO
        ===================================== */

        .zona-logo {
          display: flex;

          align-items: center;

          min-width: 0;
          max-width: 100%;

          overflow: hidden;
        }


        /* =====================================
           MENÚ
        ===================================== */

        .zona-menu {
          display: flex;

          align-items: center;
          justify-content: flex-end;

          flex-shrink: 0;
        }


        /* =====================================
           TABLET
        ===================================== */

        @media (max-width: 64rem) {

          :host {
            height: 5rem;
            min-height: 5rem;
          }


          .cabecera {
            padding-inline: 1.5rem;
          }

        }


        /* =====================================
           MÓVIL
        ===================================== */

        @media (max-width: 48rem) {

          :host {
            height: 4.75rem;
            min-height: 4.75rem;
          }


          .cabecera {
            padding-inline: 1rem;
          }

        }


        /* =====================================
           MÓVIL PEQUEÑO
        ===================================== */

        @media (max-width: 30rem) {

          :host {
            height: 4.5rem;
            min-height: 4.5rem;
          }


          .cabecera {
            padding-inline: 0.75rem;
          }

        }

      </style>


      <header class="cabecera">

        <div class="zona-logo">

          <app-logo></app-logo>

        </div>


        <div class="zona-menu">

          <app-menu></app-menu>

        </div>

      </header>

    `;

  }

}


customElements.define("app-header", AppHeader);