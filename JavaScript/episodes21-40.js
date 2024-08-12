document.addEventListener('DOMContentLoaded', function () {
    const episodesContainer = document.getElementById('episodesContainer');

    // Función para crear una card para cada episodio
    function createEpisodeCard(episode) {
        return `
            <div class="col">
                <div class="card h-100">
                    <img src="https://via.placeholder.com/400x200" class="card-img-top" alt="Episode Image">
                    <div class="card-body">
                        <h5 class="card-title">${episode.name}</h5>
                        <p class="card-text"><strong>Episode:</strong> ${episode.episode}</p>
                        <p class="card-text"><strong>Air Date:</strong> ${episode.air_date}</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Función para obtener episodios de la API y mostrarlos en la página
    function fetchEpisodes() {
        fetch('https://rickandmortyapi.com/api/episode?page=2')
            .then(response => response.json())
            .then(data => {
                const episodes = data.results;
                let cards = '';

                episodes.forEach(episode => {
                    cards += createEpisodeCard(episode);
                });

                episodesContainer.innerHTML = cards;
            })
            .catch(error => console.error('Error fetching episodes:', error));
    }

    fetchEpisodes();
});