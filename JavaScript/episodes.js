document.addEventListener('DOMContentLoaded', function () {
  const rangesContainer = document.getElementById('rangesContainer');

  // Array de rangos de episodios, sus URLs y sus imágenes
  const episodeRanges = [
      {
          title: "Episodes 1-20",
          url: "episodes1-20.html",
          img: "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2015/07/rick-morty.jpg?q=50&fit=crop&w=1100&h=618&dpr=1.5"
      },
      {
          title: "Episodes 21-40",
          url: "episodes21-40.html",
          img: "https://m.media-amazon.com/images/S/pv-target-images/70c7bd951508e5925cd976342c97fbed0021f11f211d83dd034e952c47534bd6.jpg"
      },
      {
          title: "Episodes 41-51",
          url: "episodes41-51.html",
          img: "https://hips.hearstapps.com/es.h-cdn.co/fotoes/images/series-television/11-cosas-que-no-sabias-de-rick-y-morty/rick-morty-breaking-bad/137666528-1-esl-ES/rick-morty-breaking-bad.jpg"
      }
  ];

  // Función para crear una card para cada rango de episodios
  function createRangeCard(range) {
      return `
          <div class="col">
              <div class="card h-100 text-center">
                  <img src="${range.img}" class="card-img-top" alt="${range.title}">
                  <div class="card-body d-flex flex-column justify-content-center align-items-center">
                      <h5 class="card-title mb-3">${range.title}</h5>
                      <a href="${range.url}" class="btn btn-primary mt-auto">Details</a>
                  </div>
              </div>
          </div>
      `;
  }

  // Insertar las cards en el contenedor
  episodeRanges.forEach(range => {
      rangesContainer.innerHTML += createRangeCard(range);
  });
});