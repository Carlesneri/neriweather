const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'spott.p.rapidapi.com',
    'X-RapidAPI-Key': import.meta.env.VITE_GETCITY_KEY
  }
}

export async function getCity(q: string) {
  const response = await fetch(`https://spott.p.rapidapi.com/places/autocomplete?limit=10&skip=0&&q=${q}&type=CITY`, options)
  const data = await response.json()
  return data
}