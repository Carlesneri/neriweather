export type ICity = {
  "id": string
  "geonameId": number
  "type": string
  "name": string
  "population": number
  "elevation": number
  "timezoneId": string
  "country": {
      "id": string
      "geonameId": number
      "name": string
  },
  "adminDivision1": {
      "id":string
      "geonameId": number
      "name": string
  },
  "adminDivision2"?: {
      "id": string
      "geonameId": number
      "name": string
  },
  "score": number
  "coordinates": {
      "latitude": number
      "longitude": number
  }
}

export type IWeather = {
    "last_updated_epoch": number
    "last_updated": string,
    "temp_c": number
    "temp_f": number
    "is_day": number
    "condition": {
        "text":  string,
        "icon":  string,
        "code": number
    },
    "wind_mph": number
    "wind_kph": number
    "wind_degree": number
    "wind_dir":  string,
    "pressure_mb": number
    "pressure_in": number
    "precip_mm": number
    "precip_in": number
    "humidity": number
    "cloud": number
    "feelslike_c": number
    "feelslike_f": number
    "vis_km": number
    "vis_miles": number
    "uv": number
    "gust_mph": number
    "gust_kph": number
}