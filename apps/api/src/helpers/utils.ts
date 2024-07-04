import { v4 as uuidv4 } from 'uuid'
import { fromZodError } from 'zod-validation-error'
import { Request, Response } from 'express'
import * as z from 'zod'

export function generatePrettyId(length: number = 10) {
	if (length < 1) {
		throw new Error('Length must be at least 1')
	} else if (length > 32) {
		throw new Error('Length must be at most 32')
	}
	let id = uuidv4()
	return id.split('-').join('').slice(0, length)
}

export function getValidatedData<T extends z.ZodType<any, any, any>>(
	req: Request,
	res: Response,
	schema: T,
	type: 'query' | 'body' | 'params' = 'body'
): z.infer<T> | null {
	try {
		const data = schema.parse(
			type === 'query'
				? req.query
				: type === 'body'
					? req.body
					: req.params
		)
		return data
	} catch (error) {
		const errorMessage = fromZodError(error)

		res.status(400).json({
			error: errorMessage.toString(),
			errors: error.errors,
		})
		return null
	}
}
