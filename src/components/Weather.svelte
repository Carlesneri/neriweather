<script lang="ts">
  import type { IWeather } from "src/types";

  export let weather: IWeather
</script>

<div>
  <h3>{weather.temp_c}ºC</h3>
  <h4>{weather.condition.text}</h4>
  <p>Feelslike temp: {weather.feelslike_c}ºC</p>
  <p>Wind: {weather.wind_kph} km/h</p>
  <p>UV: {weather.uv}</p>
</div>

<style>
  h3 {
    font-weight: 100;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  h4 {
    font-weight: 100;
    font-size: 1.5rem;
    color: #f45853;
  }

  p{
    font-size: 1.2rem;
    margin: 1rem 0;
  }
</style>