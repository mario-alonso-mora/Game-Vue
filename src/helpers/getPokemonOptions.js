import pokemonApi from "@/api/PokemonApi";

const getPokemons = () => {
    const pokemonArr = Array.from(Array(650))

    return pokemonArr.map((_, index) => index + 1)


}


const getPokemonOptions = async () => {

    const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5)

  return await getPokemonNames(mixedPokemons.slice(0, 4))

}

const getPokemonNames = async ([a,b,c,d] =[]) => {

/* const resp = await pokemonApi.get(`/1`)
    console.log(resp.data.name, resp.data.id)*/

    const arrPromises =[
        pokemonApi.get(`/${a}`),
        pokemonApi.get(`/${b}`),
        pokemonApi.get(`/${c}`),
        pokemonApi.get(`/${d}`)

    ]


   const [p1,p2,p3,p4] = await Promise.all(arrPromises)

    return[
        {name:p1.data.name, id:p1.data.id},
        {name:p2.data.name, id:p2.data.id},
        {name:p3.data.name, id:p3.data.id},
        {name:p4.data.name, id:p4.data.id}
    ]

}

export default getPokemonOptions


