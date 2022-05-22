<script lang="ts">
	import type { ICity } from '../types'

  export let city: ICity
</script>

<div>
  <p>
    <strong>Population:</strong>
    {city.population} hab.
  </p>
  <p>
    <strong>Elevation:</strong>
    {city.elevation} meters
  </p>
  <p>
    <strong>Timezone:</strong>
    {city.timezoneId}
  </p>
</div>