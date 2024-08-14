async function consumirApis() {
    try{
       const miapi = await fetch("https://api-creada.vercel.app/api/sebastian")
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
    console.log(episodios)


    }catch(error){
        console.log(error)
    }
}


consumirApis()

