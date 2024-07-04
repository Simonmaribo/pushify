import Server from '../interfaces/Server'
import { NextFunction, Request, Response } from 'express'

import jwt from 'jsonwebtoken'

export function includeUser(server: Server) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const token = server.authManager.getToken(req)

		if (token == null) return next()

		return jwt.verify(
			token,
			`${process.env.JWT_SECRET}`,
			async (err: any, data: any) => {
				if (err) return next()

				if (!(await server.authManager.isTokenValid(token)))
					return next()

				const user = await server.authManager.getUserFromToken(token)
				if (user == null) return next()

				req.user = user

				return next()
			}
		)
	}
}

export function ensureAuthentication(server: Server) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const token = server.authManager.getToken(req)

		if (token == null)
			return res.status(401).json({ error: 'Unauthenticated' })

		return jwt.verify(
			token,
			`${process.env.JWT_SECRET}`,
			async (err: any, data: any) => {
				if (err)
					return res
						.status(401)
						.json({ error: 'Invalid access token' })

				if (!(await server.authManager.isTokenValid(token)))
					return res
						.status(401)
						.json({ error: 'Session has expired' })

				const user = await server.authManager.getUserFromToken(token)
				if (user == null)
					return res.status(401).json({
						error: 'No user found corresponding to access token',
					})

				req.user = user

				return next()
			}
		)
	}
}
