import type Server from '../../interfaces/Server'
import type Route from '../../interfaces/Route'
import type { Request, Response, Router } from 'express'
import { ensureDeviceAuth } from '../../middlewares/DeviceMiddleware'

const router = require('express').Router({ mergeParams: true }) as Router

module.exports = (server: Server) => {
	return {
		rateLimit: {
			max: 20,
			timePeriod: 60,
		},
		router: () => {
			router.post(
				'/',
				ensureDeviceAuth(server),
				async (req: Request, res: Response) => {
					const { pushToken } = req.body
					if (!pushToken) {
						return res.status(400).json({
							error: 'Push token is required',
						})
					}

					const device = await server.database.device.findFirst({
						where: {
							id: req.deviceId,
						},
					})

					if (!device) {
						return res.status(404).json({
							error: 'Device not found',
						})
					}

					await server.database.device.update({
						where: {
							id: device.id,
						},
						data: {
							pushToken,
						},
					})

					return res.status(200).json({
						status: 'success',
					})
				}
			)

			return router
		},
	} as Route
}
