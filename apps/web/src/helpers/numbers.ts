export function humanizeNumber(value: number) {
	function formatNum(num: number) {
		let formatted = num.toFixed(1)
		if (formatted.endsWith('.0')) formatted = num.toFixed(0)
		return formatted
	}

	if (value < 1000) return formatNum(value)
	else if (value < 1000000) return `${formatNum(value / 1000)}k`
	else if (value < 1000000000) return `${formatNum(value / 1000000)}m`
	else if (value < 1000000000000) return `${formatNum(value / 1000000000)}b`

	return formatNum(value)
}

export function thousandsSeparator(value: number) {
	return value.toLocaleString()
}
