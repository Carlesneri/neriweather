const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
    'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY || ''
  }
}

export async function getWeather({q, lat, lon}: {q?: string, lat?: number, lon?: number}) {
  if(options.headers['X-RapidAPI-Key'] === '') {
    throw new Error('No key for getWeather')
  }

  try {
    const url = q ?
      `https://weatherapi-com.p.rapidapi.com/current.json?q=${q}`
      :
      `https://weatherapi-com.p.rapidapi.com/current.json?q=${lat},${lon}`

    const response = await fetch(url, options)
    const result = await response.json()
    return result.current
    
  } catch (error) {
    console.error(error)    
  }
}