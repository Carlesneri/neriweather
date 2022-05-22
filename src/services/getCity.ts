const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    'X-RapidAPI-Key': '095a78fa84msh15e0f49245cb2e9p1824b4jsnbd8bbd9b4650'
  }
}

export async function getCity({lat, lon}: {lat: number, lon: number}) {  
  const latFormatted = lat >= 0 ? `%2B${lat}` : `${lat}`
  const lonFormatted = lon >= 0 ? `%2B${lon}` : `${lon}`

  try {    
    const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?location=${latFormatted}${lonFormatted}`, options)
    
    const { data } = await response.json()
    return data
  } catch (error) {
    console.error(error)    
  }
}