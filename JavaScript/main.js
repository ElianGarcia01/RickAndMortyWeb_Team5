import * as modulo from '../JavaScript/Modules.js'

// SELECCION DE ELEMENTOS EN EL DOM
let contenedorTarjetas = document.getElementById("contenedorTarjetas")
let containerChecks = document.getElementById("containerChecks")
let buscarTexto = document.getElementById('buscarTexto')

// Variables Universales
let data
let eventos
let propiedadesUnicas

// Funcion para obtener informacion de la API
function cargarDatos() {
  modulo.obtenerDatos()
    .then(datos => {
      data = datos
      eventos = data.results
      console.log(eventos)
      
      propiedadesUnicas = [...new Set(eventos.map(event => event.category))]

      // Importar funciones pintarTarjetas y checkboxs
      modulo.pintarTarjetas(eventos, contenedorTarjetas)
      modulo.pintarCheckboxs(propiedadesUnicas, containerChecks)
    })
    .catch(error => console.error('Error al cargar los datos:', error))
}

// Funcion para cargar la funcion importadas
function actualizarFiltros() {
  let texto = buscarTexto.value.toLowerCase()
  let checkboxesMarcados = Array.from(document.querySelectorAll('#containerChecks input[type=checkbox]')).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
  modulo.filtrarEventos(eventos, texto, checkboxesMarcados, contenedorTarjetas);
}

// EVENTOS
window.addEventListener('load', cargarDatos)
buscarTexto.addEventListener('input', actualizarFiltros)
containerChecks.addEventListener('change', actualizarFiltros)
// API Rick And Morty
let urlApi = "https://rickandmortyapi.com/api/character"

const { createApp } = Vue;

    const app = createApp({
      data() {
        return {
          personajes: [],
          filters: {
            name: '',
            gender: '',
            status: '',
            species: ''
          },
          currentPage: 1,
          totalPages: 1,
          maxPagesToShow: 10 // Número máximo de páginas para mostrar en la paginación
        };
      },
      created() {
        this.fetchCharacters()
      },
      methods: {
        fetchCharacters(page = 1) {
          const url = `https://rickandmortyapi.com/api/character/?page=${page}`
          fetch(url)
            .then(response => response.json())
            .then(data => {
              this.personajes = data.results
              this.totalPages = data.info.pages
              this.currentPage = page;
            })
            .catch(error => console.error('Error al llamar los datos:', error))
        },
        changePage(page) {
          if (page > 0 && page <= this.totalPages) {
            this.fetchCharacters(page)
          }
        },
      },
      computed: {
        filteredCharacters() {
          return this.personajes.filter(character => {
            return (
              (this.filters.name === '' || character.name.toLowerCase().includes(this.filters.name.toLowerCase())) &&
              (this.filters.gender === '' || character.gender === this.filters.gender) &&
              (this.filters.status === '' || character.status === this.filters.status) &&
              (this.filters.species === '' || character.species === this.filters.species)
            )
          })
        },
        // FUNCION PARA MOSTRAR SOLO DIEZ PAGINAS EN LA PAGINACION DE RESULTADOS
        pagesToShow() {
          const pages = []
          const startPage = Math.max(1, this.currentPage - Math.floor(this.maxPagesToShow / 2))
          const endPage = Math.min(this.totalPages, startPage + this.maxPagesToShow - 1)
          
          for (let i = startPage; i <= endPage; i++) {
            pages.push(i)
          }
          
          return pages
        }
      }
    }).mount('#page')