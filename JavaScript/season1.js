document.addEventListener('DOMContentLoaded', async function () {
    const episodesContainer = document.getElementById('episodesContainer');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');

    const episodeImages = [
        "https://cdn.superaficionados.com/imagenes/rick-morty-adulta-0-cke.jpg",
        "https://www.korosenai.es/wp-content/uploads/2017/12/rick-morty-temporada1.jpg",
        "https://m.media-amazon.com/images/S/pv-target-images/3f8ae4a13de932bc679af5272ce983693d773818ff67a774dfcf0592bcd3beb7._SX1080_FMjpg_.jpg",
        "https://deadline.com/wp-content/uploads/2022/09/Rick-and-Morty.jpg?w=681&h=383&crop=1",
        "https://static1.colliderimages.com/wordpress/wp-content/uploads/2021/09/rick-morty-dynamic.jpg",
        "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/10/rick-and-morty-anthology-episodes-ranked-worst-best.jpg",
        "https://m.media-amazon.com/images/S/pv-target-images/ff3ed9a08e97c6ffc9c12eb4c1f05e7de87492774df35fb44daf543c952197cf.jpg",
        "https://i.blogs.es/ec0726/rick-morty-min/1366_2000.jpg",
        "https://imageio.forbes.com/specials-images/imageserve/63d14006009094a5406e3ae4/Rick-and-Morty/960x0.png?format=png&width=960",
        "https://i.redd.it/pmwrvhpak9741.jpg",
        "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2019/05/rick-morty-temporada-4-llegara-noviembre.jpg?tf=1200x900",
        "https://leclaireur.fnac.com/wp-content/uploads/2023/12/rickmorty3.jpg",
        "https://cdn.vox-cdn.com/thumbor/L5vLCpoKuu-_5yG2qZtoIG2VlNQ=/0x0:2880x1592/2000x1333/filters:focal(956x1113:957x1114)/cdn.vox-cdn.com/uploads/chorus_asset/file/24983255/Screen_Shot_2023_10_06_at_3.35.50_PM.png",
        "https://media.newyorker.com/photos/59e78cef57e38e49cd315477/master/pass/Patterson-Rick-and-Morty-Show-We-Need-American-Apocalypse.jpg",
        "https://m.media-amazon.com/images/S/pv-target-images/ff3ed9a08e97c6ffc9c12eb4c1f05e7de87492774df35fb44daf543c952197cf.jpg",
        "https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1688,w_3000,x_0,y_0/dpr_1.5/c_limit,w_1600/fl_lossy,q_auto/v1663439506/220917-smith-rick-and-morty-hero_csirl9",
        "https://www.indiewire.com/wp-content/uploads/2019/11/Rick-and-Morty-Season-4-Episode-3-Climbing-Wall.jpg",
        "https://pyxis.nymag.com/v1/imgs/dcb/698/eea6b585943cfb9f9ce6048e514f174dbc-The-Old-Man-and-the-Seat.1x.rsquare.w1400.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHjzTOOnDqp7BJcY6avvP6qXCCEDKy4cTFNg&s",
        "https://images.thedirect.com/media/article_full/rick1.jpg",
        "https://w0.peakpx.com/wallpaper/498/423/HD-wallpaper-rick-and-morty-so-high-rick-and-morty-cartoons-tv-shows-rick-morty-animated-tv-series-artwork-artist-digital-art.jpg",
        "https://i.ytimg.com/vi/mQ9XVkgPCFM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCDpb1oMduzS7UPa3jewtSFZLAhbw",
        "https://i.ytimg.com/vi/d3knEUBM2Rk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD9T85slKooaeOgdj3078cSd8bJXw",
        "https://imgmedia.libero.pe/1200x660/libero/migration/imagen/2019/11/24/noticia-1574639950-rick-y-morty.webp",
        "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2019/11/rick-morty-4x03-1.jpg?tf=3840x",
        "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2016/10/rick-morty-critica.jpg",
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e4308234-75ed-40dc-9e76-42907b9cf35c/d90puf1-f060d718-2b6d-42a8-b169-00a19aad88e6.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U0MzA4MjM0LTc1ZWQtNDBkYy05ZTc2LTQyOTA3YjljZjM1Y1wvZDkwcHVmMS1mMDYwZDcxOC0yYjZkLTQyYTgtYjE2OS0wMGExOWFhZDg4ZTYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Rpw1PUK_vs0t2-BZ9lodzSctdheXQgxbKmiSP5RpfI4",
        "https://images.ecestaticos.com/6iLIx07bmbcAO6V9yaCIyPTWEQ8=/17x5:1715x1279/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F502%2Fa04%2F0d5%2F502a040d58e3739f6f419bba18deefe1.jpg",
        "https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/09/Rick--Morty-Cast-and-Character-Guide-feature.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/hd/8e628c90310163.5e14571848b73.png",
        "https://resizing.flixster.com/v8RAHPQn94YX2PIBYF0jk84upEo=/fit-in/352x330/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p17531678_i_h9_aa.jpg",
        "https://thumbs.dreamstime.com/b/funny-rick-morty-background-doodles-style-241126793.jpg",
        "https://www.zonanegativa.com/imagenes/2017/02/destacada_rick_morty_2-1.jpg",
        "https://beam-images.warnermediacdn.com/BEAM_LWM_DELIVERABLES/ab553cdc-e15d-4597-b65f-bec9201fd2dd/e0a57fed-b8e8-11ee-bca3-12c84011b169?host=wbd-images.prod-vod.h264.io&partner=beamcom",
        "https://musewithmeblog.files.wordpress.com/2015/08/rickmortyfeatured.jpg?w=810",
        "https://upload.wikimedia.org/wikipedia/en/a/a1/Rick_and_Morty_OST.jpg"
    ];

    // Obtener episodios de la Season 1 (ID 1-11)
    const promises = [];
    for (let i = 1; i <= 11; i++) {
        promises.push(fetch(`https://rickandmortyapi.com/api/episode/${i}`).then(res => res.json()));
    }
    const episodes = await Promise.all(promises);

    // Función para crear una card para cada episodio
    function createEpisodeCard(episode, index) {
        const initialImage = episodeImages[index % episodeImages.length];
        const hoverImage = episodeImages[(index + 1) % episodeImages.length];

        return `
           <div class="col-md-3 mb-4">
               <div class="card h-100 text-center" data-hover-image="${hoverImage}" data-original-image="${initialImage}">
                   <img src="${initialImage}" class="card-img-top" alt="${episode.name}">
                   <div class="card-body d-flex flex-column justify-content-center align-items-center">
                       <h5 class="card-title mb-3">${episode.name}</h5>
                       <p class="card-text">Air Date: ${episode.air_date}</p>
                       <p class="card-text">Episode: ${episode.episode}</p>
                   </div>
               </div>
           </div>
       `;
    }


    // Función para mostrar episodios
    function displayEpisodes(episodesToDisplay) {
        let row = '<div class="row">';
        episodesToDisplay.forEach((episode, index) => {
            row += createEpisodeCard(episode, index);
            if ((index + 1) % 4 === 0) {
                row += '</div><div class="row">';
            }
        });
        row += '</div>';
        episodesContainer.innerHTML = row;

        // Agregar eventos de mouseover y mouseout para las cards
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const imgElement = card.querySelector('.card-img-top');
            const originalImage = card.dataset.originalImage;
            const hoverImage = card.dataset.hoverImage;

            card.addEventListener('mouseover', () => {
                imgElement.src = hoverImage;
            });

            card.addEventListener('mouseout', () => {
                imgElement.src = originalImage;
            });
        });
    }

    // Mostrar episodios al cargar la página
    displayEpisodes(episodes);

    // Otros event listeners para la búsqueda y filtrado...
    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        const filteredEpisodes = filterEpisodesByName(searchTerm);
        displayEpisodes(filteredEpisodes);
    });

    sortSelect.addEventListener('change', function () {
        const order = sortSelect.value;
        const sortedEpisodes = sortEpisodesByDate(order);
        displayEpisodes(sortedEpisodes);
    });

    // Funciones para filtrar y ordenar episodios
    function filterEpisodesByName(searchTerm) {
        return episodes.filter(episode => episode.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    function sortEpisodesByDate(order) {
        return episodes.sort((a, b) => {
            const dateA = new Date(a.air_date);
            const dateB = new Date(b.air_date);
            return order === 'asc' ? dateA - dateB : dateB - dateA;
        });
    }
});