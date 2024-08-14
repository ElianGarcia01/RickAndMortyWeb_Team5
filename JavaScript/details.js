const { createApp } = Vue;

    createApp({
      data() {
        return {
          character: null,
        };
      },
      created() {
        this.fetchCharacterDetails()
      },
      methods: {
        fetchCharacterDetails() {
          const urlParams = new URLSearchParams(window.location.search);
          const characterId = urlParams.get('id');

          if (characterId) {
            fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
              .then(response => response.json())
              .then(data => {
                this.character = data;
              })
              .catch(error => console.error('Error fetching character details:', error));
          }
        }
      }
    }).mount('#detailsPage')