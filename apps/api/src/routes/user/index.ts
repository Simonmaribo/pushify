import type Server from '../../interfaces/Server'
import { ensureAuthentication } from '../../middlewares/AuthMiddleware'
import type { Request, Response } from 'express'

const router = require('express').Router({ mergeParams: true })

module.exports = (server: Server) => {
	return {
		router: () => {
			router.get(
				'/',
				ensureAuthentication(server),
				async (req: Request, res: Response) => {
					return res.json(req.user)
				}
			)

			return router
		},
	}
}
