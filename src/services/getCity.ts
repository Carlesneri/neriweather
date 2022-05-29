const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY || ''
  }
}

export async function getCity({lat, lon}: {lat: number, lon: number}) {  
  if(options.headers['X-RapidAPI-Key'] === '') {
    throw new Error('No key for getCity')
  }

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