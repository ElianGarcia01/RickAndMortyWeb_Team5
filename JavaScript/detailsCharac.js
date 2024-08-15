const { createApp } = Vue;

        createApp({
            data() {
                return {
                    character: null
                };
            },
            created() {
                const id = new URLSearchParams(window.location.search).get('id');
                this.fetchCharacter(id);
            },
            methods: {
                fetchCharacter(id) {
                    const url = `https://rickandmortyapi.com/api/character/${id}`;
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            this.character = data;
                        })
                        .catch(error => console.error('Error al llamar los datos:', error));
                }
            }
        }).mount('#detailsApp');