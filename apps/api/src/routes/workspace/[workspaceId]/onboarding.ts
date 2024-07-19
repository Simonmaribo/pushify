import { ulid } from 'ulidx'
import type Server from '../../../interfaces/Server'
import { ensureAuthentication } from '../../../middlewares/AuthMiddleware'
import { includeWorkspace } from '../../../middlewares/WorkspaceMiddleware'
import type { Request, Response } from 'express'
import * as z from 'zod'

const router = require('express').Router({ mergeParams: true })

module.exports = (server: Server) => {
	return {
		router: () => {
			router.post(
				'/generate-api-key',
				ensureAuthentication(server),
				includeWorkspace(server),
				async (req: Request, res: Response) => {
					const API_KEY = await server.database.aPIKey.create({
						data: {
							workspaceId: req.workspace.id,
							name: 'Onboarding API Key',
							key: `sk_${ulid()}`.toLowerCase(),
						},
					})

					return res.json({ key: API_KEY.key })
				}
			)

			router.get(
				'/get-devices',
				ensureAuthentication(server),
				includeWorkspace(server),
				async (req: Request, res: Response) => {
					const { channelId } = req.query
					if (!channelId) {
						return res
							.status(400)
							.json({ error: 'Missing channelId' })
					}

					const subscription =
						await server.database.channelSubscription.findFirst({
							where: {
								channelId: channelId as string,
							},
							include: {
								device: {
									select: {
										id: true,
										deviceName: true,
										deviceModelName: true,
									},
								},
							},
						})

					if (!subscription) {
						return res.status(404).json({
							error: 'No device has been connected to this channel',
						})
					}

					return res.json(subscription)
				}
			)

			router.post(
				'/complete',
				ensureAuthentication(server),
				includeWorkspace(server),
				async (req: Request, res: Response) => {
					if (req.workspace.onboarded) {
						return res
							.status(400)
							.json({ error: 'Workspace already onboarded' })
					}

					await server.database.workspace.update({
						where: {
							id: req.workspace.id,
						},
						data: {
							onboarded: true,
						},
					})

					return res.json({ success: true })
				}
			)

			return router
		},
	}
}
