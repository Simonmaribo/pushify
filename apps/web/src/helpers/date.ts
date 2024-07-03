const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]

export function prettyDate(date: Date | string): string {
	date = new Date(date)
	const day = date.getDate()
	const month = date.getMonth()
	const year = date.getFullYear()
	const currentYear = new Date().getFullYear()
	return `${MONTHS[month]} ${day}${year !== currentYear ? ` ${year}` : ''}`
}

export function dateToString(date: Date | string): string {
	date = new Date(date)
	const day = date.getDate()
	const month = date.getMonth() + 1
	const year = date.getFullYear()
	return `${day}/${month}/${year}`
}

export function dateToFullString(date: Date | string): string {
	date = new Date(date)
	const day = date.getDate()
	const month = date.getMonth() + 1
	const year = date.getFullYear()
	const hours = date.getHours()
	const minutes = date.getMinutes()
	return `${day}.${month}.${year}, ${hours}:${minutes}`
}

export function timeDifference(date1: Date | string, date2: Date | string) {
	date1 = new Date(date1)
	date2 = new Date(date2)
	const difference = date1.getTime() - date2.getTime()
	const seconds = Math.floor(difference / 1000)
	if (seconds < 60) return `${seconds} second${seconds === 1 ? '' : 's'}`
	const minutes = Math.floor(seconds / 60)
	if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'}`
	const hours = Math.floor(minutes / 60)
	if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'}`
	const days = Math.floor(hours / 24)
	if (days < 30) return `${days} day${days === 1 ? '' : 's'}`
	const months = Math.floor(days / 30)
	if (months < 12) return `${months} month${months === 1 ? '' : 's'}`
	const years = Math.floor(days / 365)
	return `${years} year${years === 1 ? '' : 's'}`
}

export function timeDifferenceShort(
	date1: Date | string,
	date2: Date | string
) {
	date1 = new Date(date1)
	date2 = new Date(date2)
	const difference = date1.getTime() - date2.getTime()
	const seconds = Math.floor(difference / 1000)
	if (seconds < 60) return `${seconds}s`
	const minutes = Math.floor(seconds / 60)
	if (minutes < 60) return `${minutes}m`
	const hours = Math.floor(minutes / 60)
	if (hours < 24) return `${hours}h`
	const days = Math.floor(hours / 24)
	return `${days}d`
}

export function relativeTimeAgoShort(date: Date | string): string {
	return `${timeDifferenceShort(new Date(), date)} ago`
}

export function relativeTimeAgo(date: Date | string): string {
	return `${timeDifference(new Date(), date)} ago`
}

export function smartDate(date: Date | string): string {
	date = new Date(date)
	const now = new Date()
	if (date.getFullYear() !== now.getFullYear()) return prettyDate(date)
	if (date.getMonth() !== now.getMonth()) return prettyDate(date)
	if (date.getDate() !== now.getDate()) return prettyDate(date)
	return relativeTimeAgo(date)
}
