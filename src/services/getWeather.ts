const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
    'X-RapidAPI-Key': '095a78fa84msh15e0f49245cb2e9p1824b4jsnbd8bbd9b4650'
  }
}

export async function getWeather({q, lat, lon}: {q?: string, lat?: number, lon?: number}) {
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