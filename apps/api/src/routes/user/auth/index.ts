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
				'/signin',
				includeUser(server),
				async (req: Request, res: Response) => {
					if (req.user)
						return res
							.status(400)
							.json({ error: 'You are already signed in.' })

					const schema = z.object({
						email: z.string().email({ message: 'Invalid email' }),
						password: z.string(),
						cfToken: z.string({
							required_error: 'Invalid captcha token',
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

					let account = await server.database.account.findFirst({
						where: {
							email: data.email,
						},
					})

					if (
						!account ||
						!account.password ||
						!(await server.authManager.comparePassword(
							account.password,
							data.password
						))
					)
						return res
							.status(400)
							.json({ error: 'Invalid email or password' })

					await server.authManager.login(req, res, account.userId)

					return res.status(200).json({ success: true })
				}
			)

			router.get('/signout', async (req, res) => {
				server.authManager.removeToken(res)
				return res.redirect(
					`${process.env.FRONTEND_DOMAIN}/app/auth/login`
				)
			})

			return router
		},
	}
}
