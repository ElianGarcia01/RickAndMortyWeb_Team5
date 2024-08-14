async function consumirApis() {
    try {


        //Aca se consume la api general 
        const apisebas = await fetch("https://api-creada.vercel.app/api/sebastian")
        const data = await apisebas.json()
        console.log(data)

        //A partir de aca se guardara la parte de la API que necesito para el carrusel

        //Comenzamos con temporadad y se la enviamos a la funcion pintar temporadas
        const datosTemporadas = data.temporadas
        pintarContendedorTemporada(datosTemporadas);




        //Seguimos con los premios que gano la serie 
        const datosPremios = data.premios
        pintarContenedorPremios(datosPremios)



        //Por ultimo cogemos la informacion de voces 
        const datosVoces = data.personajesDoblados
        pintarContenedorVoces(datosVoces)

        //

    } catch (error) {
        console.log(error)
    }
}


consumirApis()



const acordeonContenedor = document.getElementById('accordionFlushExample')
function pintarContendedorTemporada(data) {
    
    data.forEach(element => {
        acordeonContenedor.innerHTML += `
                                         <div class="accordion-item">
                                            <h2 class="accordion-header">
                                              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${element.acordeon}" aria-expanded="false" aria-controls="flush-collapse${element.acordeon}">
                                               SEASON ${element.numero}
                                              </button>
                                            </h2>
                                            <div id="flush-collapse${element.acordeon}" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                              <div class="accordion-body">
                                                <div class="row mb-2">
                                                    <div class="col">
                                                        <p><strong>Number of episodes aired :</strong> ${element.episodios}</p>
                                                    </div>
                                                </div>
                                                <div class="row mb-2">
                                                    <div class="col">
                                                        <p><strong>First Broadcast of the Season:</strong> ${element.primeraEmision}</p>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col">
                                                        <p><strong>Last Broadcast of the Season:</strong> ${element.ultimaEmision}</p>
                                                    </div>
                                                </div>        
                                              </div>
                                            </div>
                                        </div>
                                        

    `;
    });




}


const contenedorPRemios = document.getElementById('contentPremios')

function pintarContenedorPremios(data) {
    
    data.forEach(element => {
        contenedorPRemios.innerHTML += `
          <div class="carousel-item ${element.active}">
                <div class="card text-bg-dark">
                    <img src="https://hips.hearstapps.com/hmg-prod/images/rick-1537251449.jpg" 
                    class="card-img" alt="...">                              
                     <div class="">
                        <h5 class="text-center">${element.premiacion}</h5>
                        <p class="">Category: ${element.categoria} </p>
                        <p class=""><small>Year:${element.año} </small></p>
                    </div>
                 </div>
        </div>
        `
    })
    console.log("ya debio servir")


}



function pintarContenedorVoces(data) {


}














/*const miapi = await fetch("https://api-creada.vercel.app/api/sebastian")
      const data = await miapi.json()

      console.log(data)

       const premios = data.premios
       console.log(premios)

       premios.forEach(element => {
           console.log(element.año)
       });

       premios

   const temporadas = data.temporadas
   console.log(temporadas)


   temporadas.forEach(element => {
       console.log(element.primeraEmision)
   });

   const episodios = temporadas[0].primeraEmision
   console.log(episodios)*/
