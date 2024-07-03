export function prettifySeconds(value: string | number) {
	let num = Math.round(Number(value))

	const days = Math.floor(num / 86400)
	const hours = Math.floor(num / 3600) - days * 24
	const minutes = Math.floor(num / 60) - (hours + days * 24) * 60
	const seconds =
		Math.floor(num) - (days * 86400 + hours * 3600 + minutes * 60)

	const string = []
	if (days > 0) string.push(`${days}d`)
	if (hours > 0) string.push(`${hours}h`)
	if (minutes > 0) string.push(`${minutes}m`)
	if (seconds > 0) string.push(`${seconds}s`)
	return string.join(' ')
}
