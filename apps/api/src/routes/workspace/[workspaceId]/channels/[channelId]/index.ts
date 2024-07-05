import type Server from '../../../../../interfaces/Server'
import { ensureAuthentication } from '../../../../../middlewares/AuthMiddleware'
import { includeWorkspace } from '../../../../../middlewares/WorkspaceMiddleware'
import type { Request, Response } from 'express'
import * as z from 'zod'
import { getValidatedData } from '../../../../../helpers/utils'
import { subscribe } from 'diagnostics_channel'

const router = require('express').Router({ mergeParams: true })

module.exports = (server: Server) => {
	return {
		router: () => {
			router.get(
				'/',
				ensureAuthentication(server),
				includeWorkspace(server),
				async (req: Request, res: Response) => {
					const { channelId } = req.params
					if (!channelId) {
						return res
							.status(400)
							.json({ error: 'Channel ID is required' })
					}

					const channel = await server.database.channel.findFirst({
						where: {
							id: channelId,
							workspaceId: req.workspace.id,
						},
						include: {
							subscribers: {
								include: {
									device: {
										select: {
											id: true,
											deviceName: true,
											deviceType: true,
											devicePlatform: true,
											deviceManufacturer: true,
											deviceYearClass: true,
											deviceModelName: true,
											deviceOsName: true,
											deviceOsVersion: true,
										},
									},
								},
							},
							subscriptionCodes: true,
						},
					})
					if (!channel) {
						return res
							.status(404)
							.json({ error: 'Channel not found' })
					}

					const data = {
						id: channel.id,
						name: channel.name,
						createdAt: channel.createdAt,
						expiresAt: channel.expiresAt,
						willExpire: channel.willExpire,
						subscribers: channel.subscribers.map((subscriber) => ({
							id: subscriber.id,
							device: subscriber.device,
						})),
						codes: channel.subscriptionCodes,
					}

					return res.json(data)
				}
			)

			return router
		},
	}
}
