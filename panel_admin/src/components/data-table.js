class DataTable extends HTMLElement {

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
          min-width: 0;
          min-height: 0;

          box-sizing: border-box;
        }


        /* =====================================
           CONTENEDOR PRINCIPAL
        ===================================== */

        .tabla {
          display: flex;

          flex-direction: column;

          width: 100%;
          min-width: 0;
          min-height: 100%;

          box-sizing: border-box;

          padding:
            1.25rem
            1.25rem
            1.25rem
            1.25rem;
        }


        /* =====================================
           PAGINACIÓN
        ===================================== */

        .paginacion {
          display: flex;

          flex-direction: row;

          align-items: flex-start;
          justify-content: space-between;

          width: 100%;

          margin-bottom: 1rem;

          box-sizing: border-box;
        }


        /* =====================================
           BOTÓN DE FILTRADO
        ===================================== */

        .boton-filtro {

          display: flex;

          align-items: center;
          justify-content: center;

          width: 2.5rem;
          height: 2.5rem;

          padding: 0;

          border:
            0.0625rem solid
            var(--color-borde);

          border-radius:
            0.55rem;

          background:
            var(--color-elemento);

          color:
            var(--color-texto);

          cursor:
            pointer;

          transition:
            background 0.2s ease,
            color 0.2s ease,
            border-color 0.2s ease;

        }


        .boton-filtro:hover {

          background:
            var(--color-elemento-hover);

          border-color:
            var(--color-borde-hover);

        }


        .boton-filtro:active {

          background:
            var(--color-elemento-activo);

          border-color:
            var(--color-borde-activo);

        }


        .icono-filtro {

          width:
            1.2rem;

          height:
            1.2rem;

          fill:
            none;

          stroke:
            currentColor;

          stroke-width:
            1.8;

          stroke-linecap:
            round;

          stroke-linejoin:
            round;

        }


        /* =====================================
           CONTENEDOR DE CONTROLES
        ===================================== */

        .grupo-paginacion {
          display: flex;

          align-items: center;

          width: max-content;

          max-width: 100%;
        }


        /* =====================================
           CONTROLES DE PAGINACIÓN
        ===================================== */

        .controles-paginacion {
          display: flex;

          align-items: center;
          justify-content: center;

          gap: 0.4rem;

          width: max-content;

          max-width: 100%;
        }


        /* =====================================
           BOTONES DE PAGINACIÓN
        ===================================== */

        .boton-pagina {
          display: flex;

          align-items: center;
          justify-content: center;

          width: 2.5rem;
          height: 2.5rem;

          padding: 0;

          border:
            0.0625rem solid
            var(--color-borde);

          border-radius: 0.55rem;

          background:
            var(--color-elemento);

          color:
            var(--color-texto);

          font-family:
            Arial,
            sans-serif;

          font-size:
            1.5rem;

          font-weight:
            500;

          line-height:
            1;

          cursor:
            pointer;

          transition:
            background 0.2s ease,
            color 0.2s ease,
            border-color 0.2s ease,
            opacity 0.2s ease;
        }


        .boton-pagina:hover:not(:disabled) {

          background:
            var(--color-elemento-hover);

          color:
            var(--color-texto);

          border-color:
            var(--color-borde-hover);

        }


        .boton-pagina:active:not(:disabled) {

          background:
            var(--color-elemento-activo);

          border-color:
            var(--color-borde-activo);

        }


        .boton-pagina:disabled {

          opacity:
            0.3;

          cursor:
            default;

        }


        /* =====================================
           CAMPO DE NÚMERO DE PÁGINA
        ===================================== */

        .numero-pagina {

          width:
            3.5rem;

          height:
            2.5rem;

          box-sizing:
            border-box;

          padding:
            0.4rem
            0.5rem;

          border:
            0.0625rem solid
            var(--color-borde);

          border-radius:
            0.55rem;

          background:
            var(--color-elemento);

          color:
            var(--color-texto);

          font-family:
            Arial,
            sans-serif;

          font-size:
            0.9rem;

          text-align:
            center;

          outline:
            none;

          transition:
            background 0.2s ease,
            border-color 0.2s ease;
        }


        .numero-pagina:hover {

          background:
            var(--color-elemento-hover);

        }


        .numero-pagina:focus {

          background:
            var(--color-elemento-hover);

          border-color:
            var(--color-borde-hover);

        }


        /* =====================================
           QUITAR FLECHAS INTERNAS DEL INPUT
        ===================================== */

        .numero-pagina::-webkit-inner-spin-button,
        .numero-pagina::-webkit-outer-spin-button {

          margin:
            0;

          appearance:
            none;
        }


        .numero-pagina {

          appearance:
            textfield;

        }


        /* =====================================
           TOTAL DE PÁGINAS
        ===================================== */

        .total-paginas {

          color:
            var(--color-texto-secundario);

          font-family:
            Arial,
            sans-serif;

          font-size:
            0.85rem;

          line-height:
            1.2;

          white-space:
            nowrap;
        }


        /* =====================================
           CONTENEDOR DE ENTRADAS
        ===================================== */

        .entradas {

          display:
            flex;

          flex-direction:
            column;

          gap:
            0.75rem;

          width:
            100%;

          min-width:
            0;
        }


        /* =====================================
           TARJETA
        ===================================== */

        .tarjeta {

          display:
            flex;

          flex-direction:
            column;

          width:
            100%;

          min-width:
            0;

          box-sizing:
            border-box;

          padding:
            1rem;

          background:
            var(--color-elemento);

          border:
            0.0625rem solid
            var(--color-borde);

          border-radius:
            0.7rem;

          transition:
            background 0.2s ease,
            border-color 0.2s ease;
        }


        .tarjeta:hover {

          background:
            var(--color-elemento-hover);

          border-color:
            var(--color-borde-hover);

        }


        /* =====================================
           DATOS DE LA TARJETA
        ===================================== */

        .dato {

          display:
            flex;

          align-items:
            baseline;

          gap:
            0.5rem;

          width:
            100%;

          margin-bottom:
            0.35rem;
        }


        .dato:last-child {

          margin-bottom:
            0;

        }


        .etiqueta {

          flex-shrink:
            0;

          color:
            var(--color-texto-secundario);

          font-size:
            0.9rem;

        }


        .valor {

          min-width:
            0;

          color:
            var(--color-texto);

          font-size:
            0.9rem;

          overflow-wrap:
            anywhere;

        }


        /* =====================================
           MÓVIL
        ===================================== */

        @media (max-width: 48rem) {

          .tabla {

            padding:
              2.5rem
              1rem
              1rem
              1rem;

          }

        }


        /* =====================================
           MÓVIL PEQUEÑO
        ===================================== */

        @media (max-width: 30rem) {

          .tabla {

            padding:
              2.25rem
              0.75rem
              0.75rem
              0.75rem;

          }


          .controles-paginacion {

            gap:
              0.3rem;

          }


          .boton-pagina,
          .boton-filtro {

            width:
              2.25rem;

            height:
              2.25rem;

          }


          .boton-pagina {

            font-size:
              1.3rem;

          }


          .icono-filtro {

            width:
              1.05rem;

            height:
              1.05rem;

          }


          .numero-pagina {

            width:
              3.25rem;

            height:
              2.25rem;

            font-size:
              0.85rem;

          }


          .total-paginas {

            font-size:
              0.8rem;

          }


          .tarjeta {

            padding:
              0.85rem;

          }

        }

      </style>


      <!-- =================================
           TABLA
      ================================== -->

      <section class="tabla">


        <!-- =================================
             PAGINACIÓN
        ================================== -->

        <nav
          class="paginacion"
          aria-label="Paginación"
        >


          <!-- ===============================
               BOTÓN DE FILTRADO
          ================================ -->

          <button
            class="boton-filtro"
            type="button"
            aria-label="Filtrar"
            title="Filtrar"
          >

            <svg
              class="icono-filtro"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >

              <path
                d="M4 5h16M7 12h10M10 19h4"
              ></path>

            </svg>

          </button>


          <!-- ===============================
               PAGINACIÓN
          ================================ -->

          <div class="grupo-paginacion">

            <div class="controles-paginacion">

              <button
                class="boton-pagina anterior"
                type="button"
                aria-label="Página anterior"
              >
                &lt;
              </button>


              <input
                class="numero-pagina"
                type="number"
                min="1"
                value="1"
                aria-label="Número de página"
              >


              <span
                class="total-paginas"
                aria-live="polite"
              >
                de 1 páginas
              </span>


              <button
                class="boton-pagina siguiente"
                type="button"
                aria-label="Página siguiente"
              >
                &gt;
              </button>

            </div>

          </div>


        </nav>


        <!-- =================================
             ENTRADAS
        ================================== -->

        <div class="entradas"></div>


      </section>

    `;


    /* =====================================
       ELEMENTOS
    ===================================== */

    this.entradas =
      this.shadowRoot.querySelector(
        ".entradas"
      );


    this.botonAnterior =
      this.shadowRoot.querySelector(
        ".anterior"
      );


    this.botonSiguiente =
      this.shadowRoot.querySelector(
        ".siguiente"
      );


    this.numeroPagina =
      this.shadowRoot.querySelector(
        ".numero-pagina"
      );


    this.totalPaginasTexto =
      this.shadowRoot.querySelector(
        ".total-paginas"
      );


    /* =====================================
       DATOS
    ===================================== */

    this.data = [];


    this.elementosPorPagina = 8;


    /* =====================================
       PAGINACIÓN
    ===================================== */

    this.paginaActual =
      1;


    this.totalPaginas =
      1;


    /* =====================================
       BOTÓN ANTERIOR
    ===================================== */

    this.botonAnterior.addEventListener(
      "click",
      () => {

        this.cambiarPagina(
          this.paginaActual - 1
        );

      }
    );


    /* =====================================
       BOTÓN SIGUIENTE
    ===================================== */

    this.botonSiguiente.addEventListener(
      "click",
      () => {

        this.cambiarPagina(
          this.paginaActual + 1
        );

      }
    );


    /* =====================================
       CAMBIO ESCRIBIENDO EL NÚMERO
    ===================================== */

    this.numeroPagina.addEventListener(
      "change",
      () => {

        this.cambiarPagina(
          this.numeroPagina.value
        );

      }
    );


    /* =====================================
       TECLA ENTER
    ===================================== */

    this.numeroPagina.addEventListener(
      "keydown",
      (evento) => {

        if (
          evento.key === "Enter"
        ) {

          this.cambiarPagina(
            this.numeroPagina.value
          );

          this.numeroPagina.blur();

        }

      }
    );

  }


  /* =====================================
     CONECTAR COMPONENTE
  ===================================== */

  async connectedCallback() {

    await this.loadData();

    await this.render();

    this.actualizarPaginacion();

  }


  /* =====================================
     CARGAR DATOS
  ===================================== */

  async loadData() {

    this.data = [

      {
        nombre:
          "Juan Francisco Martín Sáez",

        email:
          "reijohan@gmail.com"
      },


      {
        nombre:
          "Pedro García",

        email:
          "pedro@gmail.com"
      },


      {
        nombre:
          "Ana López",

        email:
          "ana@gmail.com"
      },


      {
        nombre:
          "Carlos Martínez",

        email:
          "carlos@gmail.com"
      },


      {
        nombre:
          "Laura Sánchez",

        email:
          "laura@gmail.com"
      },


      {
        nombre:
          "Miguel Torres",

        email:
          "miguel@gmail.com"
      },

      {
        nombre:
          "Juan Francisco Martín Sáez",

        email:
          "reijohan@gmail.com"
      },


      {
        nombre:
          "Pedro García",

        email:
          "pedro@gmail.com"
      },


      {
        nombre:
          "Ana López",

        email:
          "ana@gmail.com"
      },


      {
        nombre:
          "Carlos Martínez",

        email:
          "carlos@gmail.com"
      },


      {
        nombre:
          "Laura Sánchez",

        email:
          "laura@gmail.com"
      },


      {
        nombre:
          "Miguel Torres",

        email:
          "miguel@gmail.com"
      },

      {
        nombre:
          "Juan Francisco Martín Sáez",

        email:
          "reijohan@gmail.com"
      },


      {
        nombre:
          "Pedro García",

        email:
          "pedro@gmail.com"
      },


      {
        nombre:
          "Ana López",

        email:
          "ana@gmail.com"
      },


      {
        nombre:
          "Carlos Martínez",

        email:
          "carlos@gmail.com"
      },


      {
        nombre:
          "Laura Sánchez",

        email:
          "laura@gmail.com"
      },


      {
        nombre:
          "Miguel Torres",

        email:
          "miguel@gmail.com"
      }

    ];

  }


  /* =====================================
     RENDERIZAR DATOS
  ===================================== */

  async render() {

    this.entradas.innerHTML = "";


    /* -------------------------------------
       CALCULAR TOTAL DE PÁGINAS
    ------------------------------------- */

    this.totalPaginas =
      Math.max(
        1,
        Math.ceil(
          this.data.length /
          this.elementosPorPagina
        )
      );


    /* -------------------------------------
       ASEGURAR PÁGINA VÁLIDA
    ------------------------------------- */

    if (
      this.paginaActual >
      this.totalPaginas
    ) {

      this.paginaActual =
        this.totalPaginas;

    }


    /* -------------------------------------
       POSICIÓN INICIAL
    ------------------------------------- */

    const inicio =
      (
        this.paginaActual - 1
      ) *
      this.elementosPorPagina;


    /* -------------------------------------
       POSICIÓN FINAL
    ------------------------------------- */

    const fin =
      inicio +
      this.elementosPorPagina;


    /* -------------------------------------
       DATOS DE LA PÁGINA ACTUAL
    ------------------------------------- */

    const datosPagina =
      this.data.slice(
        inicio,
        fin
      );


    /* -------------------------------------
       CREAR TARJETAS
    ------------------------------------- */

    datosPagina.forEach(
      dato => {

        const tarjeta =
          document.createElement(
            "article"
          );


        tarjeta.className =
          "tarjeta";


        /* -------------------------------
           CAMPOS DEL DATO
        -------------------------------- */

        Object.entries(
          dato
        ).forEach(
          ([clave, valor]) => {

            const elementoDato =
              document.createElement(
                "div"
              );


            elementoDato.className =
              "dato";


            const etiqueta =
              document.createElement(
                "span"
              );


            etiqueta.className =
              "etiqueta";


            etiqueta.textContent =
              `${this.formatearEtiqueta(
                clave
              )}:`;


            const elementoValor =
              document.createElement(
                "span"
              );


            elementoValor.className =
              "valor";


            elementoValor.textContent =
              valor;


            elementoDato.append(
              etiqueta,
              elementoValor
            );


            tarjeta.append(
              elementoDato
            );

          }
        );


        this.entradas.append(
          tarjeta
        );

      }
    );

  }


  /* =====================================
     FORMATEAR ETIQUETA
  ===================================== */

  formatearEtiqueta(clave) {

    return clave
      .replaceAll(
        "_",
        " "
      )
      .replace(
        /^./,
        letra =>
          letra.toUpperCase()
      );

  }


  /* =====================================
     CAMBIAR PÁGINA
  ===================================== */

  cambiarPagina(numero) {

    numero =
      Number(numero);


    if (
      Number.isNaN(numero)
    ) {

      numero =
        this.paginaActual;

    }


    numero =
      Math.round(numero);


    if (
      numero < 1
    ) {

      numero =
        1;

    }


    if (
      numero > this.totalPaginas
    ) {

      numero =
        this.totalPaginas;

    }


    this.paginaActual =
      numero;


    this.render();

    this.actualizarPaginacion();

  }


  /* =====================================
     ACTUALIZAR PAGINACIÓN
  ===================================== */

  actualizarPaginacion() {

    this.numeroPagina.value =
      this.paginaActual;


    this.numeroPagina.max =
      this.totalPaginas;


    this.botonAnterior.disabled =
      this.paginaActual === 1;


    this.botonSiguiente.disabled =
      this.paginaActual ===
      this.totalPaginas;


    this.totalPaginasTexto.textContent =
      `de ${this.totalPaginas} páginas`;

  }

}


customElements.define("data-table", DataTable);