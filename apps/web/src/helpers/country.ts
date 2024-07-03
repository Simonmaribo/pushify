import countries from '../../public/countries.json'
import regions from '../../public/regions.json'

export function getCountryName(code: string) {
	const country = (countries as any)[code]
	if (!country) return code

	return country
}

export function getRegionName(code: string) {
	const region = (regions as any)[code]
	if (!region) return code

	return region
}

export function getCountries() {
	return Object.keys(countries).map((code) => ({
		code,
		name: getCountryName(code),
	}))
}
