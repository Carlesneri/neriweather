const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'spott.p.rapidapi.com',
    'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY || ''
  }
}

export async function getCities(q: string) {
  if(options.headers['X-RapidAPI-Key'] === '') {
    throw new Error('No key for getCities')
  }

  try {    
    const response = await fetch(`https://spott.p.rapidapi.com/places/autocomplete?limit=10&skip=0&&q=${q}&type=CITY`, options)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)    
  }
}
