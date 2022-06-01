<script lang="ts">
	import CitiesList from '../components/CitiesList.svelte'
	import Header from '../components/Header.svelte'
	import Weather from '../components/Weather.svelte'
	import City from '../components/City.svelte'
	import type { ICity, IWeather } from '../types'
	import { getWeather } from '../services/getWeather'
	import { getCity } from '../services/getCity'
	import { getCities } from '../services/getCities'
	import { getCookie } from '../hooks/cookies'
	import { browser } from '$app/env'
	import Footer from '../components/Footer.svelte'
	import { writable } from 'svelte/store'

	let city: { name: string; country: string } | null = null

	let cities: ICity[] = []

	let savedCities: ICity[] = getCookie('cities') || []

	let selectedCity: ICity | null = null

	let weather: IWeather | null = null

	let backgroundImage = writable<null | string>(null)

	let error: string | null = null

	const handleChangeCityInput = (event: Event) => {
		const selectedCity = (event.target as HTMLInputElement).value

		if (selectedCity.trim().length > 2) {
			getCities(selectedCity).then((result) => {
				cities = result || []
			})
		}

		const datalistEl = document.querySelector('datalist')
		if (datalistEl) {
			datalistEl.style.display = cities.length > 0 ? 'block' : 'none'
		}
	}

	const handleClickCity = (selectedCity: ICity) => {
		const datalistEl = document.querySelector('datalist')
		if (datalistEl) {
			datalistEl.style.display = 'none'
		}

		city = {
			name: selectedCity.name,
			country: selectedCity.country.name
		}

		cities = []
		const cityInput = document.getElementById('city-input') as HTMLInputElement
		cityInput.value = `${selectedCity.name}`

		getWeather({ lat: selectedCity.coordinates.latitude, lon: selectedCity.coordinates.longitude })
			.then((data: IWeather) => {
				weather = data
				backgroundImage.set(data.condition.icon)
			})
			.catch(() => (error = 'No data found'))
	}

	if (browser) {
		backgroundImage.subscribe((value) => {
			const wrapper:HTMLInputElement | null = document.querySelector('.background-wrapper')
			value && wrapper && (wrapper.style.backgroundImage = `url(${value})`)
		})

		navigator.geolocation.getCurrentPosition((position) => {
			const lat = position.coords.latitude
			const lon = position.coords.longitude

			getCity({ lat, lon })
				.then((data) => {
					if (data[0]) {
						city = {
							name: data[0].name,
							country: data[0].country
						}
					}
				})
				.catch((err) => (error = err))

			getWeather({ lat, lon })
				.then((data) => {
					weather = data
					backgroundImage.set(data.condition.icon)
				})
				.catch((err) => (error = err))
		})

		document.body.addEventListener('click', (event: Event) => {
			const target = event.target as HTMLElement

			if (!target.closest('.pin')) {
				const datalistEl = document.querySelector('datalist')
				if (datalistEl) {
					datalistEl.style.display = 'none'
				}
			}
		})

		document.addEventListener('cities-changed', () => {
			savedCities = getCookie('cities') || []
		})
	}
</script>

<Header />
<div class="background-wrapper" />
<main>
	<form>
		<input
			type="text"
			id="city-input"
			list="cities"
			placeholder="Find city"
			on:input={handleChangeCityInput}
		/>

		<datalist class="cities">
			<CitiesList list={savedCities} onClickCity={handleClickCity} pinned={true} />
			<CitiesList list={cities} onClickCity={handleClickCity} pinned={false} />
		</datalist>
	</form>

	{#if city}
		<h2>{city.name}, {city.country}</h2>
	{/if}

	{#if weather}
		<Weather {weather} />
	{/if}

	{#if selectedCity}
		<City city={selectedCity} />
	{/if}

	{#if error}
		<div class="errors">
			<p>{error}</p>
		</div>
	{/if}
</main>

<Footer />

<style>
	:global(*, *:before, *:after) {
		font-family: Verdana, Geneva, Tahoma, sans-serif;
		font-size: 1rem;
		box-sizing: border-box;
		color: #b4adb3;
	}

	:global(body) {
		padding: 1rem;
		background-color: #251723;
		height: 100vh;
		position: relative;
		min-height: 100vh;
	}

	.background-wrapper {
		position: absolute;
		top: 0;
		width: 100vw;
		height: 100vh;
		opacity: .1;
		transform: scale(2);
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		filter: blur(22px);
	}

	main {
		margin: 0 auto;
		width: fit-content;
	}

	form {
		position: relative;
	}

	input {
		height: 2.6rem;
		padding: 0.3rem 1rem 0.1rem;
		border: none;
		border-bottom: 1px solid #f45853;
		outline: none;
		font-size: 1.3rem;
		background-color: #2b1e29;
	}

	datalist {
		position: absolute;
		top: 2.6rem;
		width: 100%;
		background-color: #2b1e29;
		box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
		padding: 1rem;
	}

	*::-ms-tooltip {
		display: none;
	}

	.errors {
		width: 100%;
		position: absolute;
		padding: 1rem;
		text-align: center;
		bottom: 2rem;
		left: 0;
	}

	.errors p {
		color: hsl(2, 100%, 55%);
		font-weight: bold;
		font-size: 0.8rem;
	}
</style>
