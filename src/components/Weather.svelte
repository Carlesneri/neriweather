<script lang="ts">
  import type { IWeather } from "src/types";

  export let weather: IWeather
</script>

<div class="weather">
  <h3>{weather.temp_c}ºC</h3>
  <h4>{weather.condition.text}</h4>
  <p>Feelslike temp: {weather.feelslike_c}ºC</p>
  <p>Wind: {weather.wind_kph} km/h</p>
  <p>UV: {weather.uv}</p>
</div>