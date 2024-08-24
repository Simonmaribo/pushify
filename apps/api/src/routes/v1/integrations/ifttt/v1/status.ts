import type Server from '../../../../../interfaces/Server'
import type { Request, Response, Router } from 'express'

const router = require('express').Router({ mergeParams: true }) as Router

module.exports = (server: Server) => {
	return {
		router: () => {
			router.get('/', async (req: Request, res: Response) => {
				res.json({ message: 'System is active.' })
			})

			return router
		},
	}
}
