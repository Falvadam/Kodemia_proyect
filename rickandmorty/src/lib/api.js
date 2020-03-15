async function getAllChars() {
    const response = await fetch("https://rickandmortyapi.com/api/character/")
    const parserJson = await response.json()
    return parserJson.results
}

async function getCharacterById(id){
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    const parserJson = await response.json()
    return parserJson

}

export default {getAllChars, getCharacterById}