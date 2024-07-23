import type Server from '../../interfaces/Server'
import type Route from '../../interfaces/Route'
import type { Request, Response, Router } from 'express'
import { uuid } from '../../helpers/crypto'
import jwt from 'jsonwebtoken'

const router = require('express').Router({ mergeParams: true }) as Router

module.exports = (server: Server) => {
	return {
		rateLimit: {
			max: 10,
			timePeriod: 60,
		},
		router: () => {
			router.post('/refresh', async (req: Request, res: Response) => {
				const { pushToken, uniqueDeviceId } = req.body

				const deviceId = uuid(uniqueDeviceId)

				const device = await server.database.device.findFirst({
					where: {
						deviceId: deviceId,
					},
				})

				if (pushToken && device?.pushToken !== pushToken) {
					await server.database.device.update({
						where: {
							deviceId: deviceId,
						},
						data: {
							pushToken,
						},
					})
				}

				if (!device) {
					return res.status(404).json({
						status: 'error',
						message: 'Device not found',
					})
				}

				const token = jwt.sign(
					{
						deviceId: device.id,
					},
					`${process.env.JWT_SECRET}`,
					{
						expiresIn: '1d',
					}
				)

				// Delete existing tokens
				await server.database.deviceToken.deleteMany({
					where: {
						deviceId: device.id,
					},
				})

				await server.database.deviceToken.create({
					data: {
						token,
						deviceId: device.id,
						expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
					},
				})

				return res.status(200).json({
					status: 'success',
					token,
				})
			})

			return router
		},
	} as Route
}
