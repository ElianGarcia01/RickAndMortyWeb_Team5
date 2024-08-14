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
              this.currentPage = page
            })
            .catch(error => console.error('Error al llamar los datos:', error))
        },
        changePage(page) {
          if (page > 0 && page <= this.totalPages) {
            this.fetchCharacters(page)
          }
        }    
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