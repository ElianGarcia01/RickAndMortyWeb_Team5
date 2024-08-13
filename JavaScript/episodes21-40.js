document.addEventListener('DOMContentLoaded', function () {
    const episodesContainer = document.getElementById('episodesContainer');
    const searchInput = document.getElementById('searchInput');
    let episodes = [];

    // Lista de imágenes
    const episodeImages = [
        "https://cdn.superaficionados.com/imagenes/rick-morty-adulta-0-cke.jpg",
        "https://www.korosenai.es/wp-content/uploads/2017/12/rick-morty-temporada1.jpg",
        "https://m.media-amazon.com/images/S/pv-target-images/3f8ae4a13de932bc679af5272ce983693d773818ff67a774dfcf0592bcd3beb7._SX1080_FMjpg_.jpg",
        "https://deadline.com/wp-content/uploads/2022/09/Rick-and-Morty.jpg?w=681&h=383&crop=1",
        "https://static1.colliderimages.com/wordpress/wp-content/uploads/2021/09/rick-morty-dynamic.jpg",
        "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/10/rick-and-morty-anthology-episodes-ranked-worst-best.jpg",
        "https://m.media-amazon.com/images/S/pv-target-images/ff3ed9a08e97c6ffc9c12eb4c1f05e7de87492774df35fb44daf543c952197cf.jpg",
        "https://i.blogs.es/ec0726/rick-morty-min/1366_2000.jpg",
        "https://i.redd.it/pmwrvhpak9741.jpg",
        "https://www.indiewire.com/wp-content/uploads/2019/11/Rick-and-Morty-Season-4-Episode-3-Climbing-Wall.jpg",
        "https://pyxis.nymag.com/v1/imgs/dcb/698/eea6b585943cfb9f9ce6048e514f174dbc-The-Old-Man-and-the-Seat.1x.rsquare.w1400.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHjzTOOnDqp7BJcY6avvP6qXCCEDKy4cTFNg&s",
        "https://resizing.flixster.com/v8RAHPQn94YX2PIBYF0jk84upEo=/fit-in/352x330/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p17531678_i_h9_aa.jpg",
        "https://thumbs.dreamstime.com/b/funny-rick-morty-background-doodles-style-241126793.jpg",
        "https://musewithmeblog.files.wordpress.com/2015/08/rickmortyfeatured.jpg?w=810",
        "https://upload.wikimedia.org/wikipedia/en/a/a1/Rick_and_Morty_OST.jpg"
    ];

    // Función para obtener una imagen aleatoria de la lista
    function getRandomImage() {
        return episodeImages[Math.floor(Math.random() * episodeImages.length)];
    }

    // Función para crear una card para cada episodio
    function createEpisodeCard(episode) {
        return `
            <div class="col">
                <div class="card h-100">
                    <img src="${getRandomImage()}" class="card-img-top" alt="Episode Image">
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
        fetch('https://rickandmortyapi.com/api/episode?page=2')
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