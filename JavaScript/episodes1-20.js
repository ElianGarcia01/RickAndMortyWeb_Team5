document.addEventListener('DOMContentLoaded', function () {
    const episodesContainer = document.getElementById('episodesContainer');
    const searchInput = document.getElementById('searchInput');
    let episodes = [];

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

    // Función para mostrar los episodios en la página
    function displayEpisodes(episodesToDisplay) {
        let cards = '';
        episodesToDisplay.forEach(episode => {
            cards += createEpisodeCard(episode);
        });
        episodesContainer.innerHTML = cards;
    }

    // Función para obtener episodios de la API y mostrarlos en la página
    function fetchEpisodes() {
        fetch('https://rickandmortyapi.com/api/episode?page=1')
            .then(response => response.json())
            .then(data => {
                episodes = data.results;
                displayEpisodes(episodes);
            })
            .catch(error => console.error('Error fetching episodes:', error));
    }

    // Función para filtrar episodios según el término de búsqueda
    function filterEpisodes() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredEpisodes = episodes.filter(episode =>
            episode.name.toLowerCase().includes(searchTerm) ||
            episode.episode.toLowerCase().includes(searchTerm) ||
            episode.air_date.toLowerCase().includes(searchTerm)
        );
        displayEpisodes(filteredEpisodes);
    }

    // Evento de búsqueda
    searchInput.addEventListener('input', filterEpisodes);

    // Cargar episodios al iniciar
    fetchEpisodes();
});