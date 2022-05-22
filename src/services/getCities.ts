const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'spott.p.rapidapi.com',
    'X-RapidAPI-Key': '095a78fa84msh15e0f49245cb2e9p1824b4jsnbd8bbd9b4650'
  }
}

export async function getCities(q: string) {
  try {    
    const response = await fetch(`https://spott.p.rapidapi.com/places/autocomplete?limit=10&skip=0&&q=${q}&type=CITY`, options)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)    
  }
}
