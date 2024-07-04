import { v4, v5, validate } from 'uuid'
import crypto from 'crypto'

export function hash(...args: string[]) {
	return crypto.createHash('sha512').update(args.join('')).digest('hex')
}

export function secret() {
	return hash(`${process.env.APP_SECRET || process.env.DATABASE_URL}`)
}

export function uuid(...args: any) {
	if (!args.length) return v4()

	return v5(hash(...args), secret())
}

export function isUuid(value: string) {
	return validate(value)
}
