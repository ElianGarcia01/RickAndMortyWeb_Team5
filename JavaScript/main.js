import * as modulo from '../JavaScript/Modules.js'

// SELECCION DE ELEMENTOS EN EL DOM
let contenedorTarjetas = document.getElementById("contenedorTarjetas")
let containerChecks = document.getElementById("containerChecks")
let buscarTexto = document.getElementById('buscarTexto')

// Variables Universales
let data
let eventos
let propiedadesUnicas

// Funcion para obtener informacion de la API
function cargarDatos() {
  modulo.obtenerDatos()
    .then(datos => {
      data = datos
      eventos = data.results
      console.log(eventos)
      
      propiedadesUnicas = [...new Set(eventos.map(event => event.category))]

      // Importar funciones pintarTarjetas y checkboxs
      modulo.pintarTarjetas(eventos, contenedorTarjetas)
      modulo.pintarCheckboxs(propiedadesUnicas, containerChecks)
    })
    .catch(error => console.error('Error al cargar los datos:', error))
}

// Funcion para cargar la funcion importadas
function actualizarFiltros() {
  let texto = buscarTexto.value.toLowerCase()
  let checkboxesMarcados = Array.from(document.querySelectorAll('#containerChecks input[type=checkbox]')).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
  modulo.filtrarEventos(eventos, texto, checkboxesMarcados, contenedorTarjetas);
}

// EVENTOS
window.addEventListener('load', cargarDatos)
buscarTexto.addEventListener('input', actualizarFiltros)
containerChecks.addEventListener('change', actualizarFiltros)