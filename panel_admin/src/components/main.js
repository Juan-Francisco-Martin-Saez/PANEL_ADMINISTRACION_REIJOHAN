class AppMain extends HTMLElement {

  constructor() {

    super();

    this.attachShadow({
      mode: "open"
    });

    this.shadowRoot.innerHTML = /*html*/`

      <style>

        /* =====================================
           CONTENEDOR PRINCIPAL
        ===================================== */

        :host {
          display: block;

          width: 100%;
          max-width: 100%;
          min-width: 0;
          min-height: 0;

          box-sizing: border-box;

          background:
            var(--color-fondo);
        }


        /* =====================================
           CONTENIDO
        ===================================== */

        .contenido {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(0, 3fr);

          gap: 1.25rem;

          width: 100%;
          max-width: 100%;
          min-width: 0;
          min-height: 0;

          box-sizing: border-box;

          padding: 1.5rem;

          background:
            var(--color-fondo);
        }


        /* =====================================
           TABLET
        ===================================== */

        @media (max-width: 64rem) {

          .contenido {
            gap: 1rem;

            padding: 1.25rem;
          }

        }


        /* =====================================
           MÓVIL
        ===================================== */

        @media (max-width: 48rem) {

          .contenido {
            grid-template-columns: 1fr;

            gap: 1rem;

            padding: 1rem;
          }

        }


        /* =====================================
           MÓVIL PEQUEÑO
        ===================================== */

        @media (max-width: 30rem) {

          .contenido {
            gap: 0.75rem;

            padding: 0.75rem;
          }

        }

      </style>


      <!-- =================================
           CONTENIDO PRINCIPAL
      ================================== -->

      <main class="contenido">

        <data-table></data-table>
        <form-panel></form-panel>

      </main>

    `;

  }

}


customElements.define("app-main", AppMain);