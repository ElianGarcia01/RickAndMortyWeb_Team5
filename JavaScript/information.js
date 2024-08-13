async function consumirApis() {
    try{

        const personajes = await fetch('https://rickandmortyapi.com/api/character?page=40')
        const lugares =  await fetch('https://rickandmortyapi.com/api/location')
        const episodios =  await fetch('https://rickandmortyapi.com/api/episode')
    
        const convertirPersonajes = await personajes.json()
        const obtenerPersonajes = convertirPersonajes.results
        console.log( obtenerPersonajes)

        const convertirLugares = await lugares.json()
        const obtenerLugares = convertirLugares.results
        console.log("Estos son los lugares: " + obtenerLugares)

        const convertirEpisodios = await episodios.json()
        const obtenerEpisodios = convertirEpisodios.results
        console.log("Estos son los episodios: " + obtenerEpisodios)



    }catch(error){
        console.log(error)
    }
}

consumirApis()

