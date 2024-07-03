import { format, isSameYear, isSameMonth, isSameDay } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'

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

function parseDate(dateInput: string | Date) {
	return toZonedTime(
		new Date(dateInput),
		Intl.DateTimeFormat().resolvedOptions().timeZone
	)
}

export function prettyDate(dateInput: string | Date) {
	const date = parseDate(dateInput)
	const day = format(date, 'd')
	const month = Number(format(date, 'M')) - 1
	const year = format(date, 'yyyy')
	const currentYear = format(new Date(), 'yyyy')
	return `${MONTHS[month]} ${day}${year !== currentYear ? ` ${year}` : ''}`
}
export function prettyHourDate(dateInput: string | Date) {
	const date = parseDate(dateInput)
	const day = format(date, 'd')
	const month = Number(format(date, 'M')) - 1
	const year = format(date, 'yyyy')
	const currentYear = format(new Date(), 'yyyy')
	return `${MONTHS[month]} ${day}${year !== currentYear ? ` ${year}` : ''} at ${format(date, 'h:mm aa')}`
}

export function dateToString(dateInput: string | Date) {
	const date = parseDate(dateInput)
	return format(date, 'd/M/yyyy')
}

export function dateToFullString(dateInput: string | Date) {
	const date = parseDate(dateInput)
	return format(date, 'd.M.yyyy, H:mm')
}

export function timeDifference(
	date1Input: string | Date,
	date2Input: string | Date
) {
	const date1 = parseDate(date1Input)
	const date2 = parseDate(date2Input)

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

export function timeDifferenceShortFull(
	date1Input: string | Date,
	date2Input: string | Date
) {
	const date1 = parseDate(date1Input)
	const date2 = parseDate(date2Input)

	const difference = date1.getTime() - date2.getTime()
	const days = Math.floor(difference / 86400_000)
	const hours = Math.floor(difference / 3600_000) - days * 24
	const minutes = Math.floor(difference / 60_000) - (hours + days * 24) * 60
	const seconds =
		Math.floor(difference / 1000) -
		(days * 86400 + hours * 3600 + minutes * 60)

	const string = []
	if (days > 0) string.push(`${days}d`)
	if (hours > 0) string.push(`${hours}h`)
	if (minutes > 0) string.push(`${minutes}m`)
	if (seconds > 0) string.push(`${seconds}s`)
	return string.join(' ')
}

export function timeDifferenceShort(
	date1Input: string | Date,
	date2Input: string | Date
) {
	const date1 = parseDate(date1Input)
	const date2 = parseDate(date2Input)

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

export function relativeTimeAgoShort(dateInput: string | Date) {
	return `${timeDifferenceShort(new Date(), dateInput)} ago`
}

export function relativeTimeAgo(dateInput: string | Date) {
	return `${timeDifference(new Date(), dateInput)} ago`
}

export function smartDate(dateInput: string | Date) {
	const date = parseDate(dateInput)
	const now = new Date()
	if (!isSameYear(date, now)) return prettyDate(date)
	if (!isSameMonth(date, now)) return prettyDate(date)
	if (!isSameDay(date, now)) return prettyDate(date)
	return relativeTimeAgo(date)
}
