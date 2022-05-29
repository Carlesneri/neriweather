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
	import Footer from '../components/Footer.svelte';

	let city: { name: string; country: string } | null = null

	let cities: ICity[] = []

	let savedCities: ICity[] = getCookie('cities') || []

	let selectedCity: ICity | null = null

	let weather: IWeather | null = null

	let error: string | null = null

	const handleChangeCityInput = (event: Event) => {
		const selectedCity = (event.target as HTMLInputElement).value

		if (selectedCity.trim().length > 2) {
			getCities(selectedCity)
			.then((result) => {
				cities = result || []
			})
			// cities = [
			// 	{
			// 		id: '1205733',
			// 		geonameId: 1205733,
			// 		type: 'CITY',
			// 		name: 'Chittagong',
			// 		population: 3920222,
			// 		elevation: 15,
			// 		timezoneId: 'Asia/Dhaka',
			// 		country: {
			// 			id: 'BD',
			// 			geonameId: 1210997,
			// 			name: 'Bangladesh'
			// 		},
			// 		adminDivision1: {
			// 			id: 'BD.84',
			// 			geonameId: 1337200,
			// 			name: 'Chittagong'
			// 		},
			// 		adminDivision2: {
			// 			id: 'BD.84.2015',
			// 			geonameId: 1337199,
			// 			name: 'Chittagong District'
			// 		},
			// 		score: 13.593311,
			// 		coordinates: {
			// 			latitude: 22.3384,
			// 			longitude: 91.8317
			// 		}
			// 	},
			// 	{
			// 		id: '1863967',
			// 		geonameId: 1863967,
			// 		type: 'CITY',
			// 		name: 'Fukuoka',
			// 		population: 1392289,
			// 		elevation: 3,
			// 		timezoneId: 'Asia/Tokyo',
			// 		country: {
			// 			id: 'JP',
			// 			geonameId: 1861060,
			// 			name: 'Japan'
			// 		},
			// 		adminDivision1: {
			// 			id: 'JP.07',
			// 			geonameId: 1863958,
			// 			name: 'Fukuoka'
			// 		},
			// 		adminDivision2: {
			// 			id: 'JP.07.1863955',
			// 			geonameId: 1863955,
			// 			name: 'Fukuoka City'
			// 		},
			// 		score: 12.14373,
			// 		coordinates: {
			// 			latitude: 33.6,
			// 			longitude: 130.417
			// 		}
			// 	},
			// 	{
			// 		id: '1851717',
			// 		geonameId: 1851717,
			// 		type: 'CITY',
			// 		name: 'Shizuoka',
			// 		population: 701561,
			// 		elevation: 23,
			// 		timezoneId: 'Asia/Tokyo',
			// 		country: {
			// 			id: 'JP',
			// 			geonameId: 1861060,
			// 			name: 'Japan'
			// 		},
			// 		adminDivision1: {
			// 			id: 'JP.37',
			// 			geonameId: 1851715,
			// 			name: 'Shizuoka'
			// 		},
			// 		adminDivision2: {
			// 			id: 'JP.37.1851714',
			// 			geonameId: 1851714,
			// 			name: 'Shizuoka-shi'
			// 		},
			// 		score: 11.8460655,
			// 		coordinates: {
			// 			latitude: 34.9833,
			// 			longitude: 138.383
			// 		}
			// 	},
			// 	{
			// 		id: '1819729',
			// 		geonameId: 1819729,
			// 		type: 'CITY',
			// 		name: 'Hong Kong',
			// 		population: 7012738,
			// 		elevation: 60,
			// 		timezoneId: 'Asia/Hong_Kong',
			// 		country: {
			// 			id: 'HK',
			// 			geonameId: 1819730,
			// 			name: 'Hong Kong'
			// 		},
			// 		adminDivision1: {
			// 			id: 'HK.HCW',
			// 			geonameId: 7533598,
			// 			name: 'Central and Western District'
			// 		},
			// 		score: 11.845888,
			// 		coordinates: {
			// 			latitude: 22.2783,
			// 			longitude: 114.175
			// 		}
			// 	},
			// 	{
			// 		id: '1854383',
			// 		geonameId: 1854383,
			// 		type: 'CITY',
			// 		name: 'Okayama',
			// 		population: 639652,
			// 		elevation: 5,
			// 		timezoneId: 'Asia/Tokyo',
			// 		country: {
			// 			id: 'JP',
			// 			geonameId: 1861060,
			// 			name: 'Japan'
			// 		},
			// 		adminDivision1: {
			// 			id: 'JP.31',
			// 			geonameId: 1854381,
			// 			name: 'Okayama'
			// 		},
			// 		adminDivision2: {
			// 			id: 'JP.31.1854380',
			// 			geonameId: 1854380,
			// 			name: 'Okayama Shi'
			// 		},
			// 		score: 11.805944,
			// 		coordinates: {
			// 			latitude: 34.65,
			// 			longitude: 133.933
			// 		}
			// 	}
			// ]
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
			.then((data) => {
				weather = data
			})
			.catch(() => (error = 'No data found'))
	}

	if (browser) {
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
			.then((data) => (weather = data))
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
			<CitiesList
			list={savedCities}
			onClickCity={handleClickCity}
			pinned={true}
			/>
			<CitiesList
			list={cities}
			onClickCity={handleClickCity}
			pinned={false}
			/>
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
		bottom: 0;
		left: 0;
	}

	.errors p {
		color: hsl(2, 100%, 55%);
		font-weight: bold;
		font-size: 0.9rem;
	}
</style>
