import { v4 as uuidv4 } from 'uuid'

export function generatePrettyId(length: number = 10) {
	if (length < 1) {
		throw new Error('Length must be at least 1')
	} else if (length > 32) {
		throw new Error('Length must be at most 32')
	}
	let id = uuidv4()
	return id.split('-').join('').slice(0, length)
}
