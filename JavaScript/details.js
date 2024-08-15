const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      character: null,
    };
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search)
    const characterId = urlParams.get('id')
    this.fetchCharacterDetails(characterId)
  },
  methods: {
    fetchCharacterDetails(id) {
      const url = `https://rickandmortyapi.com/api/character/${id}`
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.character = data;
        })
        .catch(error => console.error('Error al llamar los datos:', error))
    },
  },
}).mount('#detailsApp')