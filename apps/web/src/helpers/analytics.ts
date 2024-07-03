import { BROWSERS, OS_NAMES } from './constants'

export function formatBrowser(text: string) {
	// @ts-ignore
	const browser = BROWSERS[text]
	const url = `/images/browsers/${browser ? text.toLowerCase() : 'unknown'}.png`
	return {
		text: browser ? browser : text,
		image: url,
	}
}

export function formatOS(text: string) {
	// @ts-ignore
	const os = OS_NAMES[text]
	console.debug('os', os, os?.toLowerCase()?.replaceAll(/\W/g, '-'))
	const url = `/images/os/${
		os ? text.toLowerCase()?.replaceAll(/\W/g, '-') : 'unknown'
	}.png`
	return {
		text: os ? os : text,
		image: url,
	}
}
