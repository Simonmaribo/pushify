import { includeUser } from '../../../middlewares/AuthMiddleware'
import type Server from '../../../interfaces/Server'
import type { Request, Response, Router } from 'express'
import * as z from 'zod'
import { verifyTurnstile } from '../../../helpers/cf'
import { getValidatedData } from '../../../helpers/utils'

const router = require('express').Router({ mergeParams: true }) as Router

module.exports = (server: Server) => {
	return {
		rateLimit: {
			max: 10,
			windowMs: 60 * 60 * 1000,
		},
		router: () => {
			router.post(
				'/',
				includeUser(server),
				async (req: Request, res: Response) => {
					if (process.env.DISABLE_SIGNUP === 'true') {
						return res
							.status(400)
							.json({ error: 'Sign up is disabled.' })
					}

					if (req.user)
						return res
							.status(400)
							.json({ error: 'You are already signed in.' })

					const schema = z.object({
						email: z
							.string()
							.email({ message: 'Please enter a valid email.' }),
						name: z.string(),
						password: z
							.string()
							.min(6, { message: 'The password is too short.' }),
						cfToken: z.string({
							required_error: 'Please complete the captcha.',
						}),
					})

					const data = getValidatedData<typeof schema>(
						req,
						res,
						schema
					)
					if (!data) return

					let turnstile = await verifyTurnstile(req)
					if (!turnstile)
						return res
							.status(400)
							.json({ error: 'Invalid captcha' })

					const accounts = await server.database.account.findMany({
						where: {
							email: data.email,
						},
					})
					if (accounts.length > 0) {
						accounts.find((account) => {
							if (account.provider === 'EMAIL') {
								return res
									.status(400)
									.json({ error: 'Email is already in use.' })
							} else {
								return res.status(400).json({
									error: 'This email is already associated with a social account',
								})
							}
						})
						return
					}

					if (
						await server.database.user.findFirst({
							where: {
								email: data.email,
							},
						})
					)
						return res
							.status(400)
							.json({ error: 'Email is already in use.' })

					try {
						const user = await server.database.user.create({
							data: {
								email: data.email,
								name: data.name,
							},
						})

						await server.authManager.login(req, res, user.id)

						if (!user)
							return res
								.status(500)
								.json({ error: 'An unknown error occurred.' })

						await server.database.account.create({
							data: {
								provider: 'EMAIL',
								email: data.email,
								password: await server.authManager.hashPassword(
									data.password
								),
								userId: user.id,
							},
						})

						await server.database.workspace.create({
							data: {
								name: 'Personal Workspace',
								members: {
									create: {
										role: 'OWNER',
										userId: user.id,
									},
								},
							},
						})

						return res.status(200).json({ success: true })
					} catch (error) {
						console.log(error)
						return res
							.status(500)
							.json({ error: 'An unknown error occurred.' })
					}
				}
			)

			return router
		},
	}
}
