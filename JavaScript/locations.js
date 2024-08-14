const urlLocation = "https://rickandmortyapi.com/api/location/";

const app = Vue.createApp({
    data() {
        return {
            ubicaciones: [],
            filtroUbicacion: '',
            personajesFiltrados: [],
            
        };
        
    },
    created() {

        this.traerData();
        
    },
    methods: {

        traerData() {

            fetch(`${urlLocation}?page=1`)
                .then(response => response.json())
                .then(data => {
                    console.log("Datos de la página 1:", data.results);
                    this.ubicaciones = data.results
                    let totalPages = data.info.pages;
                    console.log(data.info.pages)

                    if (totalPages > 1) {
                        const ubicacionesPagina = [];
                        for (let page = 2; page <= totalPages; page++) {
                            
                            const urlDinamica = `${urlLocation}?page=${page}`;  

                            ubicacionesPagina.push(fetch(urlDinamica).then(response => response.json()));
                        }

                        Promise.all(ubicacionesPagina)
                            .then(pagesData => {
                                pagesData.forEach(page => {
                                    console.log("datos del resto de paginas", page);
                                    this.ubicaciones.push(...page.results);
                                });
                            });
                    }
                });
        },

        filtrarPersonajesPorUbicacion() {
            const audio = new Audio('./Recursos/portal-gun-sound-effect.mp3');
            audio.volume = 0.1; // Ajusta el volumen entre 0.0 (silencio) y 1.0 (máximo)
            audio.play();
            if (!this.filtroUbicacion) {
                this.personajesFiltrados = [];

                return;
            }
            
            const datosUbicacionUrl = `${urlLocation}${this.filtroUbicacion}`;
            

            fetch(datosUbicacionUrl)
                .then(response => response.json())
                .then(data => {
                    console.log("Datos de la ubicación:", data);
                   
              
                    let residentesUrls = data.residents;
                    return this.obtenerDetallesPersonajes(residentesUrls);
                })
                .then(residentesDetalles => {
                    console.log("Detalles de residentes :", residentesDetalles);
                    this.personajesFiltrados = residentesDetalles;


                });
        },

        obtenerDetallesPersonajes(residentesUrls) {


            let detallesPromesas = residentesUrls.map(url => fetch(url).then(response => response.json()));
            return Promise.all(detallesPromesas);
        },
        mostrarUbicacionAleatoria() {
            const ubicacionAleatoria = this.ubicaciones[Math.floor(Math.random() * this.ubicaciones.length)];
            this.filtroUbicacion = ubicacionAleatoria.id;
            this.filtrarPersonajesPorUbicacion();
        }
    },

    computed: {
        ubicacionSeleccionada() {

            return this.ubicaciones.find(ubicacion => ubicacion.id === this.filtroUbicacion);
        },
    },
    
    
});

app.mount('#app');


///