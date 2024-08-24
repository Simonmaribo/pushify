import Server from '../interfaces/Server'
import { NextFunction, Request, Response } from 'express'

export function ensureAPIAuth(server: Server) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const apiToken = req.headers.authorization
			? req.headers.authorization.split(' ')[1]
			: null
		if (!apiToken) return res.status(401).json({ error: 'Unauthenticated' })

		const token = await server.database.aPIKey.findFirst({
			where: {
				key: apiToken,
			},
		})

		if (!token) return res.status(401).json({ error: 'Unauthenticated' })

		req.workspaceId = token.workspaceId

		next()

		if (
			!token.lastUsed ||
			token.lastUsed < new Date(Date.now() - 1000 * 60 * 60 * 24)
		) {
			await server.database.aPIKey.update({
				where: {
					id: token.id,
				},
				data: {
					lastUsed: new Date(),
				},
			})
		}
	}
}

export async function validAPIKey(server: Server, key: string) {
	if (!key) return null

	const token = await server.database.aPIKey.findFirst({
		where: {
			key,
		},
	})

	if (!token) return null

	if (
		!token.lastUsed ||
		token.lastUsed < new Date(Date.now() - 1000 * 60 * 60 * 24)
	) {
		await server.database.aPIKey.update({
			where: {
				id: token.id,
			},
			data: {
				lastUsed: new Date(),
			},
		})
	}

	return token
}
