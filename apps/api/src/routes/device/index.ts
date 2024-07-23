import { getValidatedData } from '../../helpers/utils'
import type Server from '../../interfaces/Server'
import type Route from '../../interfaces/Route'
import type { Request, Response, Router } from 'express'
import * as z from 'zod'
import { uuid } from '../../helpers/crypto'

const router = require('express').Router({ mergeParams: true }) as Router

module.exports = (server: Server) => {
	return {
		rateLimit: {
			max: 10,
			timePeriod: 60,
		},
		router: () => {
			router.post('/', async (req: Request, res: Response) => {
				const schema = z.object({
					deviceName: z.string().optional(),
					deviceType: z.enum([
						'UNKNOWN',
						'PHONE',
						'TABLET',
						'DESKTOP',
						'TV',
					]),
					devicePlatform: z.enum(['IOS', 'ANDROID']),
					deviceYearClass: z.number().optional(),
					deviceManufacturer: z.string().optional(),
					deviceModelName: z.string().optional(),
					deviceOsName: z.string().optional(),
					deviceOsVersion: z.string().optional(),
					pushToken: z.string().optional(),
					uniqueDeviceId: z.string(),
				})

				const data = getValidatedData<typeof schema>(req, res, schema)
				if (!data) return

				const deviceId = uuid(`${data.uniqueDeviceId}`)

				if (
					await server.database.device.findFirst({
						where: { deviceId: deviceId },
					})
				) {
					return res.status(201).json({
						status: 'success',
					})
				}

				console.log(data)

				await server.database.device.create({
					data: {
						deviceId: deviceId,
						deviceName: data.deviceName,
						deviceType: data.deviceType,
						devicePlatform: data.devicePlatform,
						pushToken: data.pushToken,

						deviceYearClass: data.deviceYearClass,
						deviceManufacturer: data.deviceManufacturer,
						deviceModelName: data.deviceModelName,
						deviceOsName: data.deviceOsName,
						deviceOsVersion: data.deviceOsVersion,
					},
				})

				return res.status(201).json({
					status: 'success',
				})
			})

			return router
		},
	} as Route
}
