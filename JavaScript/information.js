async function consumirApis() {
    try{
        const miapi = await fetch('https://api-creada.vercel.app/api/students')
        const data = await miapi.json()
        console.log(data)


    }catch(error){
        console.log(error)
    }
}

consumirApis()

