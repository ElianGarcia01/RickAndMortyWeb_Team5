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
      textoBuscador: '',
      genderSelec: [],
      detalles: {},
      gender: []
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
        this.gender = Array.from(new Set(this.personajes.map(event => event.gender)))
        this.productoDetails()
      })

    },
    productoDetails() {
      // URL Search Params
      const urlParams = new URLSearchParams(window.location.search)
      const idGet = urlParams.get('id')

      this.detalles = this.personajesCopy.find(producto => producto.id === parseInt(idGet))
    }

  },
  computed: {
    // FILTRO PARA PAGINA HOME
    CharactersFilter() {
      // Filtro de texto
      let filtroTexto = this.personajesCopy.filter(personaje => personaje.name.toLowerCase().includes(this.textoBuscador.toLowerCase()))

      // Verificar si el arreglo de categorias seleccionadas se encuentre vacio o no
      if (this.genderSelec.length == 0) {
        this.personajes = filtroTexto
      } else {
        this.personajes = filtroTexto.filter(personaje => personaje.gender.includes(this.genderSelec))
      }
    }
  }
}).mount('#page')  //Montar en el createApp en el contenedor main