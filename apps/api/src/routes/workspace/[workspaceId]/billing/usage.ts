import { addDays, endOfMonth, startOfMonth } from 'date-fns'
import type Server from '../../../../interfaces/Server'
import { ensureAuthentication } from '../../../../middlewares/AuthMiddleware'
import { includeWorkspace } from '../../../../middlewares/WorkspaceMiddleware'
import type { Request, Response } from 'express'

const router = require('express').Router({ mergeParams: true })

module.exports = (server: Server) => {
	return {
		router: () => {
			router.get(
				'/',
				ensureAuthentication(server),
				includeWorkspace(server),
				async (req: Request, res: Response) => {
					const from = startOfMonth(new Date())
					const to = endOfMonth(new Date())

					const messages =
						await server.database.messageRecipient.count({
							where: {
								workspaceId: req.workspace.id,
								createdAt: {
									gte: from,
									lte: to,
								},
							},
						})

					const [devices] = (await server.database.$queryRaw`
						SELECT COUNT(DISTINCT "deviceId") AS "devices"
						FROM ChannelSubscription
						WHERE workspaceId = ${req.workspace.id}
					`) as { devices: number }[]

					const data = {
						messages: messages,
						limit: 2500,
						devices: Number(devices.devices),
						nextPeriod: addDays(to, 1),
					}

					return res.json(data)
				}
			)

			return router
		},
	}
}
