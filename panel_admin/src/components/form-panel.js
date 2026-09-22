class FormPanel extends HTMLElement {

  constructor() {

    super();

    this.attachShadow({
      mode: "open"
    });

    this.shadowRoot.innerHTML = /*html*/`

      <style>

        /* =====================================
           CONTENEDOR DEL COMPONENTE
        ===================================== */

        :host {
          display: block;

          width: 100%;
          max-width: 100%;

          min-width: 0;
          min-height: 0;

          box-sizing: border-box;
        }


        /* =====================================
           CONTENEDOR PRINCIPAL
        ===================================== */

        .panel {
          display: flex;

          flex-direction: column;

          width: 100%;
          max-width: 100%;

          min-width: 0;
          min-height: 100%;

          box-sizing: border-box;

          padding: 1.25rem;
        }


        /* =====================================
           CABECERA DEL PANEL
        ===================================== */

        .cabecera-panel {
          display: flex;

          align-items: flex-end;
          justify-content: space-between;

          gap: 1rem;

          width: 100%;
          max-width: 100%;

          min-width: 0;

          margin-bottom: 1.25rem;

          border-bottom:
            0.0625rem solid
            var(--color-borde-elemento);
        }


        /* =====================================
           PESTAÑAS
        ===================================== */

        .pestanas {
          display: flex;

          align-items: center;

          gap: 0.25rem;

          min-width: 0;

          margin: 0;

          border-bottom: 0;
        }


        /* =====================================
           BOTONES DE LAS PESTAÑAS
        ===================================== */

        .pestana {
          display: flex;

          align-items: center;
          justify-content: center;

          min-width: 5rem;

          padding:
            0.6rem
            0.9rem;

          border: 0;

          border-bottom:
            0.15rem solid
            transparent;

          background: transparent;

          color:
            var(--color-texto-secundario);

          font-family: Arial, sans-serif;
          font-size: 0.9rem;

          cursor: pointer;

          transition:
            color 0.2s ease,
            border-color 0.2s ease;
        }


        .pestana:hover {
          color:
            var(--color-texto);
        }


        .pestana.activa {
          color:
            var(--color-texto);

          border-bottom-color:
            var(--color-borde-activo);
        }


        /* =====================================
           ACCIONES
        ===================================== */

        .acciones {
          display: flex;

          align-items: center;

          gap: 0.4rem;

          flex-shrink: 0;

          padding-bottom: 0.3rem;
        }


        /* =====================================
           BOTONES DE ACCIÓN
        ===================================== */

        .boton {
          display: flex;

          align-items: center;
          justify-content: center;

          width: 2.4rem;
          height: 2.4rem;

          padding: 0;

          border:
            0.0625rem solid
            var(--color-borde-boton);

          border-radius: 0.5rem;

          background:
            var(--color-elemento);

          color:
            var(--color-texto-secundario);

          cursor: pointer;

          transition:
            background 0.2s ease,
            border-color 0.2s ease,
            color 0.2s ease;
        }


        .boton:hover {
          background:
            var(--color-elemento-hover);

          border-color:
            var(--color-borde-boton-hover);

          color:
            var(--color-texto);
        }


        /* =====================================
           ICONOS SVG
        ===================================== */

        .boton svg {
          display: block;

          width: 1.6rem;
          height: 1.6rem;

          flex-shrink: 0;

          fill: none;

          stroke:
            currentColor;

          stroke-width: 1.8;

          stroke-linecap: round;
          stroke-linejoin: round;
        }


        /* =====================================
           ICONO VACIAR
        ===================================== */

        .boton-limpiar svg {
          width: 1.5rem;
          height: 1.5rem;
        }


        /* =====================================
           ICONO GUARDAR
        ===================================== */

        .boton-guardar svg {
          width: 1.5rem;
          height: 1.5rem;
        }


        /* =====================================
           CONTENEDOR DE PESTAÑAS
        ===================================== */

        .contenido-pestanas {
          display: block;

          width: 100%;
          max-width: 100%;

          min-width: 0;
        }


        /* =====================================
           CONTENIDO DE CADA PESTAÑA
        ===================================== */

        .contenido-pestana {
          display: none;

          width: 100%;
          max-width: 100%;

          min-width: 0;
        }


        .contenido-pestana.activa {
          display: block;
        }


        /* =====================================
           CONTENEDOR DE CAMPOS
        ===================================== */

        .campos {
          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(0, 1fr)
            );

          gap: 1rem;

          width: 100%;
          max-width: 100%;

          min-width: 0;
        }


        /* =====================================
           CAMPO
        ===================================== */

        .campos > div {
          min-width: 0;
        }


        /* =====================================
           ETIQUETAS
        ===================================== */

        .etiqueta {
          display: block;

          width: 100%;

          margin-bottom: 0.4rem;

          color:
            var(--color-texto-secundario);

          font-family: Arial, sans-serif;
          font-size: 0.85rem;
        }


        /* =====================================
           INPUT
        ===================================== */

        .entrada {
          display: block;

          width: 100%;
          max-width: 100%;

          min-width: 0;

          min-height: 2.6rem;

          box-sizing: border-box;

          padding:
            0.6rem
            0.75rem;

          border:
            0.0625rem solid
            var(--color-borde-boton);

          border-radius: 0.5rem;

          background:
            var(--color-elemento);

          color:
            var(--color-texto);

          font-family: Arial, sans-serif;
          font-size: 0.9rem;

          outline: none;

          transition:
            border-color 0.2s ease,
            background 0.2s ease;
        }


        .entrada:focus {
          border-color:
            var(--color-borde-activo);

          background:
            var(--color-elemento-hover);
        }


        /* =====================================
           MÓVIL
        ===================================== */

        @media (max-width: 48rem) {

          .panel {
            padding: 1rem;
          }


          .cabecera-panel {
            margin-bottom: 1rem;
          }


          .campos {
            gap: 0.75rem;
          }

        }


        /* =====================================
           MÓVIL PEQUEÑO
        ===================================== */

        @media (max-width: 30rem) {

          .panel {
            padding: 0.75rem;
          }


          .cabecera-panel {
            gap: 0.5rem;
          }


          .pestanas {
            gap: 0;
          }


          .pestana {
            min-width: 4.5rem;

            padding:
              0.5rem
              0.7rem;

            font-size: 0.85rem;
          }


          .acciones {
            gap: 0.3rem;

            padding-bottom: 0.25rem;
          }


          .boton {
            width: 2.2rem;
            height: 2.2rem;
          }


          .boton svg {
            width: 1.45rem;
            height: 1.45rem;
          }


          .boton-limpiar svg,
          .boton-guardar svg {
            width: 1.35rem;
            height: 1.35rem;
          }


          .campos {
            grid-template-columns: 1fr;

            gap: 0.75rem;
          }

        }


        /* =====================================
           PANTALLAS MUY ESTRECHAS
        ===================================== */

        @media (max-width: 22rem) {

          .cabecera-panel {
            align-items: center;
          }


          .pestana {
            min-width: 4rem;

            padding-inline: 0.5rem;
          }


          .boton {
            width: 2rem;
            height: 2rem;
          }


          .boton svg {
            width: 1.3rem;
            height: 1.3rem;
          }


          .boton-limpiar svg,
          .boton-guardar svg {
            width: 1.2rem;
            height: 1.2rem;
          }

        }

      </style>


      <!-- =================================
           PANEL
      ================================== -->

      <section class="panel">


        <!-- ===============================
             CABECERA
        ================================== -->

        <div class="cabecera-panel">


          <!-- =============================
               PESTAÑAS
          ============================== -->

          <nav
            class="pestanas"
            aria-label="Secciones del panel"
          >

            <button
              class="pestana activa"
              type="button"
              data-pestana="general"
            >
              General
            </button>


            <button
              class="pestana"
              type="button"
              data-pestana="varios"
            >
              Varios
            </button>

          </nav>


          <!-- =============================
               ACCIONES
          ============================== -->

          <div class="acciones">


            <!-- ===========================
                 VACIAR
            ============================ -->

            <button
              class="boton boton-limpiar"
              type="button"
              aria-label="Vaciar formulario"
              title="Vaciar"
            >

              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >

                <path
                  d="M5 3h10l4 4v14H5z"
                />

                <path
                  d="M15 3v5h4"
                />

                <path
                  d="m9 12 6 6"
                />

                <path
                  d="m15 12-6 6"
                />

              </svg>

            </button>


            <!-- ===========================
                 GUARDAR
            ============================ -->

            <button
              class="boton boton-guardar"
              type="button"
              aria-label="Guardar formulario"
              title="Guardar"
            >

              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >

                <path
                  d="M5 3h10l4 4v14H5z"
                />

                <path
                  d="M15 3v5h4"
                />

                <path
                  d="M12 9v7"
                />

                <path
                  d="m9.5 13.5 2.5 2.5 2.5-2.5"
                />

              </svg>

            </button>


          </div>

        </div>


        <!-- =================================
             CONTENIDO DE LAS PESTAÑAS
        ================================== -->

        <div class="contenido-pestanas">


          <!-- =============================
               GENERAL
          ============================== -->

          <div
            class="contenido-pestana activa"
            data-contenido="general"
          >

            <div class="campos">


              <div>

                <label
                  class="etiqueta"
                  for="nombre"
                >
                  Nombre
                </label>

                <input
                  class="entrada"
                  id="nombre"
                  type="text"
                >

              </div>


              <div>

                <label
                  class="etiqueta"
                  for="email"
                >
                  Email
                </label>

                <input
                  class="entrada"
                  id="email"
                  type="email"
                >

              </div>


            </div>

          </div>


          <!-- =============================
               VARIOS
          ============================== -->

          <div
            class="contenido-pestana"
            data-contenido="varios"
          >

          </div>


        </div>

      </section>

    `;


    /* =====================================
       PESTAÑAS
    ===================================== */

    this.pestanas =
      this.shadowRoot.querySelectorAll(
        ".pestana"
      );


    this.contenidos =
      this.shadowRoot.querySelectorAll(
        ".contenido-pestana"
      );


    /* =====================================
       CAMBIO DE PESTAÑA
    ===================================== */

    this.pestanas.forEach(
      (pestana) => {

        pestana.addEventListener(
          "click",
          () => {

            const nombrePestana =
              pestana.dataset.pestana;


            /* =============================
               QUITAR ESTADO ACTIVO
            ============================== */

            this.pestanas.forEach(
              (otraPestana) => {

                otraPestana.classList.remove(
                  "activa"
                );

              }
            );


            this.contenidos.forEach(
              (contenido) => {

                contenido.classList.remove(
                  "activa"
                );

              }
            );


            /* =============================
               ACTIVAR PESTAÑA
            ============================== */

            pestana.classList.add(
              "activa"
            );


            const contenidoActivo =
              this.shadowRoot.querySelector(
                `[data-contenido="${nombrePestana}"]`
              );


            if (contenidoActivo) {

              contenidoActivo.classList.add(
                "activa"
              );

            }

          }
        );

      }
    );

  }

}


customElements.define("form-panel", FormPanel);