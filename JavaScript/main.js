const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      personajes: [],
      favoritos: [],
      filters: {
        name: '',
        gender: '',
        status: '',
        species: ''
      },
      currentPage: 1,
      totalPages: 1,
      maxPagesToShow: 10 // Número máximo de páginas para mostrar en la paginación
    };
  },
  created() {
    this.fetchCharacters()
    let datosLocal = JSON.parse(localStorage.getItem('favoritos'))
    if(datosLocal){
      this.favoritos = datosLocal
    }
  },
  methods: {
    fetchCharacters(page = 1) {
      const url = `https://rickandmortyapi.com/api/character/?page=${page}`
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.personajes = data.results
          this.totalPages = data.info.pages
          this.currentPage = page
        })
        .catch(error => console.error('Error al llamar los datos:', error))
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.fetchCharacters(page)
      }
    },
    agregarFavoritos(personaje) {
      if (!this.favoritos.includes(personaje)) {
        this.favoritos.push(personaje)
        localStorage.setItem('favoritos',JSON.stringify(this.favoritos))
      }
    },
    quitarFavoritos(personaje) {
      const index = this.favoritos.findIndex(fav => fav.id === personaje.id);
      if (index !== -1) {
        this.favoritos.splice(index, 1);
        localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
      }
    }
    
  },


  computed: {
    filteredCharacters() {
      return this.personajes.filter(character => {
        return (
          (this.filters.name === '' || character.name.toLowerCase().includes(this.filters.name.toLowerCase())) &&
          (this.filters.gender === '' || character.gender === this.filters.gender) &&
          (this.filters.status === '' || character.status === this.filters.status) &&
          (this.filters.species === '' || character.species === this.filters.species)
        )
      })
    },
    // FUNCION PARA MOSTRAR SOLO DIEZ PAGINAS EN LA PAGINACION DE RESULTADOS
    pagesToShow() {
      const pages = []
      const startPage = Math.max(1, this.currentPage - Math.floor(this.maxPagesToShow / 2))
      const endPage = Math.min(this.totalPages, startPage + this.maxPagesToShow - 1)

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }
      return pages
    }
  }
}).mount('#page')

let lastScrollTop = 0; // Variable para guardar la última posición de scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
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

document.addEventListener('DOMContentLoaded', function () {
  const header = document.getElementById('header'); // Obtiene el header por su ID

  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) { // Número de píxeles de scroll antes de cambiar el estilo
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const images = [
    './Recursos/wallpaper.jpg',
    './Recursos/wall2.jpg',
    './Recursos/wall3.jpg',
    './Recursos/wall4.jpg',
  ];

  const slideTrack = document.getElementById('slide-track');

  // Función para crear y añadir imágenes al slider
  function populateSlider(images, repeatTimes) {
    for (let i = 0; i < repeatTimes; i++) {
      images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = '';
        img.classList.add('slider');
        slideTrack.appendChild(img);
      });
    }
  }

  // Llama a la función con las imágenes y el número de veces que quieres repetirlas
  populateSlider(images, 10); // Ajusta el número de repeticiones según sea necesario
});


