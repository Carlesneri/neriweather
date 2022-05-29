import { browser } from '$app/env'
import type { ICity } from 'src/types'

export const getCookie = (name: string): ICity[] | null => {
  if(!browser) return null

	const value = `; ${document.cookie}`
	if (!value) return null
	const parts = value.split(`; ${name}=`)
	if (parts.length === 2) {
		const cookie = parts?.pop()?.split(';').shift()
		if (cookie) return JSON.parse(cookie)
	}
	return null
}

const setCookie = (name: string, value: ICity[]) => {
	document.cookie = `${name}=${JSON.stringify(value)}`
}

export const saveInCookie = (city: ICity) => {  
	const cities = getCookie('cities') || []
	if (cities.some((cookieCity) => cookieCity.name === city.name)) return
  setCookie('cities', [city, ...cities])
	document.dispatchEvent(new CustomEvent('cities-changed'))
}

export const removeFromCookie = (city: ICity) => {
	const cities = getCookie('cities') || []
	const filtered = cities.filter((cookieCity) => cookieCity.name !== city.name)
	setCookie('cities', filtered)
	document.dispatchEvent(new CustomEvent('cities-changed'))
}
