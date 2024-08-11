// import * as modulo from '../JavaScript/Modules.js'

// // SELECCION DE ELEMENTOS EN EL DOM
// let contenedorTarjetas = document.getElementById("contenedorTarjetas")
// let containerChecks = document.getElementById("containerChecks")
// let buscarTexto = document.getElementById('buscarTexto')

// // Variables Universales
// let data
// let eventos
// let propiedadesUnicas

// // Funcion para obtener informacion de la API
// function cargarDatos() {
//   modulo.obtenerDatos()
//     .then(datos => {
//       data = datos
//       eventos = data.results
//       console.log(eventos)

//       propiedadesUnicas = [...new Set(eventos.map(event => event.category))]

//       // Importar funciones pintarTarjetas y checkboxs
//       modulo.pintarTarjetas(eventos, contenedorTarjetas)
//       modulo.pintarCheckboxs(propiedadesUnicas, containerChecks)
//     })
//     .catch(error => console.error('Error al cargar los datos:', error))
// }

// // Funcion para cargar la funcion importadas
// function actualizarFiltros() {
//   let texto = buscarTexto.value.toLowerCase()
//   let checkboxesMarcados = Array.from(document.querySelectorAll('#containerChecks input[type=checkbox]')).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
//   modulo.filtrarEventos(eventos, texto, checkboxesMarcados, contenedorTarjetas);
// }

// // EVENTOS
// window.addEventListener('load', cargarDatos)
// buscarTexto.addEventListener('input', actualizarFiltros)
// containerChecks.addEventListener('change', actualizarFiltros)

// API Rick And Morty
let urlApi = "https://rickandmortyapi.com/api/character"

// Crear una constante para llamar una funcion
const { createApp } = Vue

// createApp es una funcion que recibe un objeto
const app = createApp({
  data() {
    return {
      personajes: [],
      personajesCopy: [],
      categorias: [],
      textoBuscador: '',
      categoriaSelec: [],
    }

  },
  created() {
    this.obtenerDatos(urlApi)

  },
  methods: {
    obtenerDatos(url) {
      fetch(url).then(response => response.json()).then(data => {

        this.personajesCopy = data.results.filter(personaje => !personaje.status.includes('unknown'))
        this.personajes = data.results.filter(personaje => !personaje.status.includes('unknown'))
      })

    }

  },
  computed: {
    // FILTRO PARA PAGINA HOME
    CharactersFilter() {
      // Filtro de texto
      let filtroTexto = this.personajesCopy.filter(personaje => personaje.name.toLowerCase().includes(this.textoBuscador.toLowerCase()))

      // Verificar si el arreglo de categorias seleccionadas se encuentre vacio o no
      if (this.categoriaSelec.length == 0) {
        this.personajes = filtroTexto
      } else {
        this.personajes = filtroTexto.filter(personaje => personaje.category.includes(this.categoriaSelec))
      }
    }
  }
}).mount('#page')  //Montar en el createApp en el contenedor main