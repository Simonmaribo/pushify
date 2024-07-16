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
					const subscriptions =
						await server.database.channelSubscription.findMany({
							where: {
								deviceId: req.deviceId,
							},
							include: {
								channel: {
									include: {
										messages: {
											take: 1,
											orderBy: {
												createdAt: 'desc',
											},
										},
									},
								},
							},
						})

					const data = subscriptions.map((s) => {
						return {
							id: s.id,
							name: s.channel.name,
							lastMessage:
								s.channel.messages.length > 0
									? s.channel.messages[0].createdAt
									: null,
							createdAt: s.createdAt,
						}
					})

					return res.status(200).json(data)
				}
			)

			router.post(
				'/:code',
				ensureDeviceAuth(server),
				async (req: Request, res: Response) => {
					const { code } = req.params
					if (!code)
						return res.status(400).json({ error: 'Invalid code' })

					const subscriptionCode =
						await server.database.channelSubscriptionCode.findFirst(
							{
								where: {
									code,
								},
								include: {
									channel: true,
								},
							}
						)

					if (!subscriptionCode)
						return res.status(400).json({ error: 'Invalid code' })

					if (!subscriptionCode.enabled)
						return res.status(400).json({ error: 'Code disabled' })

					if (
						subscriptionCode.expiresAt &&
						subscriptionCode.expiresAt < new Date()
					)
						return res.status(400).json({ error: 'Code expired' })

					if (
						typeof subscriptionCode.usesLeft == 'number' &&
						subscriptionCode.usesLeft <= 0
					)
						return res
							.status(400)
							.json({ error: 'Code uses expired' })

					const channelSubscription =
						await server.database.channelSubscription.findFirst({
							where: {
								channelId: subscriptionCode.channelId,
								deviceId: req.deviceId,
							},
						})
					if (channelSubscription)
						return res
							.status(400)
							.json({ error: 'Already subscribed' })

					await server.database.channelSubscription.create({
						data: {
							workspaceId: subscriptionCode.channel.workspaceId,
							channelId: subscriptionCode.channelId,
							deviceId: req.deviceId,
						},
					})

					if (subscriptionCode.usesLeft)
						await server.database.channelSubscriptionCode.update({
							where: {
								code,
							},
							data: {
								usesLeft: {
									decrement: 1,
								},
							},
						})

					return res.status(201).json({
						status: 'success',
					})
				}
			)

			router.delete(
				'/:subscriptionId',
				ensureDeviceAuth(server),
				async (req: Request, res: Response) => {
					const { subscriptionId } = req.params
					if (!subscriptionId)
						return res
							.status(400)
							.json({ error: 'Invalid subscriptionId' })

					await server.database.channelSubscription.delete({
						where: {
							deviceId: req.deviceId,
							id: subscriptionId,
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
