document.addEventListener('DOMContentLoaded', function () {
    const rangesContainer = document.getElementById('rangesContainer');

    // Array de rangos de episodios y sus URLs
    const episodeRanges = [
        { title: "Episodes 1-20", url: "episodes1-20.html" },
        { title: "Episodes 21-40", url: "episodes21-40.html" },
        { title: "Episodes 41-51", url: "episodes41-51.html" }
    ];

    // Función para crear una card para cada rango de episodios
    function createRangeCard(range) {
        return `
            <div class="col">
                <div class="card h-100">
                    <img src="https://via.placeholder.com/400x200" class="card-img-top" alt="Episodes Image">
                    <div class="card-body">
                        <h5 class="card-title">${range.title}</h5>
                        <a href="${range.url}" class="btn btn-primary">Details</a>
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