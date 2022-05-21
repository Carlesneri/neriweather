<script>
  import { getCity } from '../services/getCity'
  getCity('ga').then(city => {
    console.log(city)
  })
</script>

<h1>NeriWeather</h1>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    display: grid;
    place-content: center;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  }

  :global(*, *:before, *:after) {
    box-sizing: border-box;
  }

  h1 {
    font-size: 2em;
    margin: 0.5em 0;
  }
</style>