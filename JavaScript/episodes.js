
document.addEventListener('DOMContentLoaded', function () {
    const seasonsContainer = document.getElementById('seasonsContainer');

    // Array de temporadas con sus URLs e imágenes
    const seasons = [
        {
            title: "Season 1",
            url: "season1.html",
            img: "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2015/07/rick-morty.jpg?q=50&fit=crop&w=1100&h=618&dpr=1.5"
        },
        {
            title: "Season 2",
            url: "season2.html",
            img: "https://m.media-amazon.com/images/S/pv-target-images/70c7bd951508e5925cd976342c97fbed0021f11f211d83dd034e952c47534bd6.jpg"
        },
        {
            title: "Season 3",
            url: "season3.html",
            img: "https://hips.hearstapps.com/es.h-cdn.co/fotoes/images/series-television/11-cosas-que-no-sabias-de-rick-y-morty/rick-morty-breaking-bad/137666528-1-esl-ES/rick-morty-breaking-bad.jpg"
        },
        {
            title: "Season 4",
            url: "season4.html",
            img: "https://elcomercio.pe/resizer/P4GJplUbrfqB-yjsHbYLv6FfmTs=/768x512/smart/filters:format(jpeg):quality(90)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/KRKOINCP7JGR7KWT4HNBDSJPDA.jpg"
        },
        {
            title: "Season 5",
            url: "season5.html",
            img: "https://images.thedirect.com/media/article_full/rick1.jpg"
        }
    ];

    // Función para crear una card para cada temporada
    function createSeasonCard(season) {
        return `
            <div class="col mb-4">
                <div class="card h-100 text-center">
                    <img src="${season.img}" class="card-img-top" alt="${season.title}">
                    <div class="card-body d-flex flex-column justify-content-center align-items-center">
                        <h5 class="card-title mb-3">${season.title}</h5>
                        <a href="${season.url}" class="btn btn-primary mt-auto">Details</a>
                    </div>
                </div>
            </div>
        `;
    }


    // Insertar las cards de las temporadas en el contenedor
    seasons.forEach(season => {
        seasonsContainer.innerHTML += createSeasonCard(season);
    });
});

let lastScrollTop = 0; // Variable para guardar la última posición de scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > lastScrollTop) {
        // Scroll hacia abajo
        navbar.style.top = '-100px'; // Ajusta este valor al alto de tu navbar
    } else {
        // Scroll hacia arriba
        navbar.style.top = '0';
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Actualiza la última posición de scroll
}, false);

  