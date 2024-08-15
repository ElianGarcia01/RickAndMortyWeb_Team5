// Array de URLs de la API
const urls = [
  'https://rickandmortyapi.com/api/episode?page=1',
  'https://rickandmortyapi.com/api/episode?page=2',
  'https://rickandmortyapi.com/api/episode?page=3'
];

// Rango de IDs para cada temporada
const seasonRanges = {
  1: { start: 1, end: 12 },
  2: { start: 13, end: 21 },
  3: { start: 22, end: 31 },
  4: { start: 32, end: 51 }
};

// Función para verificar si un episodio pertenece a una temporada
const isEpisodeInSeason = (episode, season) => {
  const { start, end } = seasonRanges[season];
  return episode.id >= start && episode.id <= end;
};

// Función para crear y mostrar las cards
const createCard = (season) => {
  const container = document.getElementById('episodes-container');
  const card = document.createElement('div');
  card.className = 'col-md-3';

  card.innerHTML = `
      <div class="card">
          <div class="card-header">Season ${season}</div>
          <div class="card-body">
              <p class="card-text">Click to see the details of all episodes from Season ${season}.</p>
              <button class="btn btn-primary" onclick="showEpisodes(${season})">Details</button>
          </div>
          <ul id="season-${season}-episodes" class="list-group list-group-flush" style="display: none;">
              <!-- Aquí se mostrarán los episodios -->
          </ul>
      </div>
  `;

  container.appendChild(card);
};

// Función para mostrar los episodios de una temporada
const showEpisodes = (season) => {
  const episodesList = document.getElementById(`season-${season}-episodes`);
  episodesList.style.display = episodesList.style.display === 'none' ? 'block' : 'none';
};

// Función para obtener los datos de la API y crear las cards
const getEpisodes = async () => {
  try {
      let episodesData = [];

      // Obtener datos de todas las páginas de la API
      for (const url of urls) {
          const response = await fetch(url);
          const data = await response.json();
          episodesData = episodesData.concat(data.results);
      }

      // Crear cards para cada temporada
      for (let season = 1; season <= 4; season++) {
          createCard(season);
          const episodes = episodesData.filter(episode => isEpisodeInSeason(episode, season));
          const episodesList = document.getElementById(`season-${season}-episodes`);
          episodesList.innerHTML = episodes.map(ep => `<li class="list-group-item">${ep.name}</li>`).join('');
      }
  } catch (error) {
      console.error('Error fetching episodes:', error);
  }
};

// Llamar a la función para iniciar el proceso
getEpisodes();