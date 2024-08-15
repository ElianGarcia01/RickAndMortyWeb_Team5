const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      personajes: [],
      filters: {
        name: localStorage.getItem('filterName') || '',
        gender: localStorage.getItem('filterGender') || '',
        status: localStorage.getItem('filterStatus') || '',
        species: localStorage.getItem('filterSpecies') || ''
      },
      currentPage: parseInt(localStorage.getItem('currentPage')) || 1,
      totalPages: 1,
      maxPagesToShow: 10
    };
  },
  created() {
    this.fetchCharacters(this.currentPage);
  },
  methods: {
    fetchCharacters(page = 1) {
      const url = `https://rickandmortyapi.com/api/character/?page=${page}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.personajes = data.results;
          this.totalPages = data.info.pages;
          this.currentPage = page;
          localStorage.setItem('currentPage', page);
        })
        .catch(error => console.error('Error al llamar los datos:', error));
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.fetchCharacters(page);
      }
    },
    saveFilters() {
      localStorage.setItem('filterName', this.filters.name);
      localStorage.setItem('filterGender', this.filters.gender);
      localStorage.setItem('filterStatus', this.filters.status);
      localStorage.setItem('filterSpecies', this.filters.species);
    }
  },
  watch: {
    filters: {
      handler() {
        this.saveFilters();
      },
      deep: true
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
        );
      });
    },
    pagesToShow() {
      const pages = [];
      const startPage = Math.max(1, this.currentPage - Math.floor(this.maxPagesToShow / 2));
      const endPage = Math.min(this.totalPages, startPage + this.maxPagesToShow - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    }
  }
}).mount('#page');