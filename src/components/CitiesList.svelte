<script lang="ts">
  import type { ICity } from 'src/types'
  import Pin from '../components/Pin.svelte'
	import { saveInCookie, removeFromCookie } from '../hooks/cookies'

  export let list: ICity[]
  export let onClickCity: (city: ICity) => void
  export let pinned: Boolean

	const handleClickPin = (city: ICity) => {
		pinned ? removeFromCookie(city) : saveInCookie(city)
	}

</script>

{#each list as city}
  <div class="option">
    <div class="pin" on:click={() => handleClickPin(city)} >
      <Pin {pinned} />
    </div>
    <div class="city-name" value={city.name} on:click={() => onClickCity(city)}>
      {city.name}, {city.country.name}
    </div>
  </div>
{/each}

<style>
  	.option {
		display: flex;
		align-items: flex-start;
		transition: color 0.2s ease;
		margin: 0.5rem 0;
	}

	.city-name {
		margin-left: 0.5rem;
		cursor: pointer;
		width: 100%;
		transition: color 0.2s ease;
	}

	.city-name:hover {
		color: #f45853;
	}
</style>