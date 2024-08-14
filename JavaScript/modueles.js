
// SOLICITUD Y EXPORTACION DE LA INFORMACION DE LOS PERSONAJES (PRIMERA PAGINA)
export function obtenerDatos() {
  return fetch('https://rickandmortyapi.com/api/character?page=1')
      .then(respuesta => respuesta.json())
}

// EXPORTAR FUNCION PARA PINTAR TARJETAS DE PERSONAJES
export function pintarTarjetas(arreglo, contenedor) {
  contenedor.innerHTML = ''

  if (arreglo.length === 0) {
      const mensaje = document.createElement('div')
      mensaje.id = 'no-notes'
      mensaje.className = 'text-center fs-5'
      mensaje.innerText = 'Lo sentimos, no encontramos ninguna coincidencia. Intenta ajustar los filtros o busca de nuevo con otras palabras.'
      contenedor.appendChild(mensaje)
  }

  arreglo.forEach(eventos => {
      let tarjeta = document.createElement('div')
      tarjeta.className = "col"
      tarjeta.innerHTML = `
          <div class="card mb-3 border border-1 border-dark">
              <div class="row">
                  <div class="col-md-6">
                      <img src=${eventos.image} class="card-img imageH rounded-start" alt="card">
                  </div>
                  <div class="col-md-6">
                      <div class="card-body text-center">
                          <h5 class="card-title">${eventos.name}</h5>
                          <p class="card-text">Estado: ${eventos.status}</p>
                          <p class="card-text">Especie: ${eventos.species}</p>
                          <p class="card-text">Genero: ${eventos.gender}</p>
                          <div class="d-flex justify-content-center">
                              <a href="./Details.html?id=${eventos.id}" class="btn btn-danger">Details</a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
            `;
      contenedor.appendChild(tarjeta)
  })
}

// EXPORTAR FUNCION PARA PINTAR CHECKBOXS 
export function pintarCheckboxs(arreglo, contenedor) {
  contenedor.innerHTML = ''

  arreglo.forEach(category => {
      let categoria = document.createElement('div')
      categoria.className = 'form-check form-check-inline'
      categoria.innerHTML = `
          <input class="form-check-input border-2 border-dark" type="checkbox" value="${category}" id="${category}">
          <label class="form-check-label" for="${category}">${category}</label>`
      contenedor.appendChild(categoria)
  })
}

// EXPORTAR FUNCION PARA PINTAR FILTROS
export function filtrarEventos(arreglo, textoIngresado, checkboxes, contenedorTarjetas) {
  let eventosFiltrados = arreglo.filter(evento => {
      let coincideTexto = evento.name.toLowerCase().includes(textoIngresado) || evento.description.toLowerCase().includes(textoIngresado)
      let coincideCategoria = checkboxes.length === 0 || checkboxes.includes(evento.category);
      return coincideTexto && coincideCategoria;
  })

  pintarTarjetas(eventosFiltrados, contenedorTarjetas)
}