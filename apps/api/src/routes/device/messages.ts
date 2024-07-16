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
			router.get(
				'/',
				ensureDeviceAuth(server),
				async (req: Request, res: Response) => {
					const channels =
						await server.database.channelSubscription.findMany({
							where: {
								deviceId: req.deviceId,
							},
							include: {
								channel: true,
							},
						})

					const recipients =
						await server.database.messageRecipient.findMany({
							where: {
								deviceId: req.deviceId,
							},
							include: {
								message: {
									include: {
										channels: true,
									},
								},
							},
						})

					const data = recipients.map((r) => {
						// I have an array of channels and an array of channels that the device is subscibed to.
						// Find the first channel that the device is subscribed to

						const channel = r.message.channels.find((c) => {
							return channels.find((subscribedChannel) => {
								return subscribedChannel.channelId === c.id
							})
						})

						const channelName =
							channels.find((subscribedChannel) => {
								return (
									subscribedChannel.channelId === channel?.id
								)
							})?.channel.name ?? 'Unknown channel'

						return {
							id: r.message.id,
							title: r.message.title,
							message: r.message.body,
							channel: channelName,
							createdAt: r.message.createdAt,
						}
					})

					return res.status(200).json(data)
				}
			)
			return router
		},
	} as Route
}
