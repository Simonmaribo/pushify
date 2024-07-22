import { getAvailableSubscriptionCode } from '../../../../../helpers/codes'
import type Server from '../../../../../interfaces/Server'
import { ensureAuthentication } from '../../../../../middlewares/AuthMiddleware'
import { includeWorkspace } from '../../../../../middlewares/WorkspaceMiddleware'
import type { Request, Response } from 'express'
import * as z from 'zod'

const router = require('express').Router({ mergeParams: true })

module.exports = (server: Server) => {
	return {
		router: () => {
			router.delete(
				'/:subscriptionId',
				ensureAuthentication(server),
				includeWorkspace(server),
				async (req: Request, res: Response) => {
					const { channelId, subscriptionId } = req.params
					if (!channelId || !subscriptionId) {
						return res.status(400).json({
							error: 'Channel ID and Subscription ID is required',
						})
					}

					const channel = await server.database.channel.findFirst({
						where: {
							id: channelId,
							workspaceId: req.workspace.id,
						},
					})
					if (!channel) {
						return res
							.status(404)
							.json({ error: 'Channel not found' })
					}

					const subscription =
						await server.database.channelSubscription.findFirst({
							where: {
								id: subscriptionId,
								channelId: channelId,
							},
						})
					if (!subscription) {
						return res
							.status(404)
							.json({ error: 'Subscription not found' })
					}

					await server.database.channelSubscription.delete({
						where: {
							id: subscription.id,
						},
					})

					return res.status(204).json({
						success: true,
					})
				}
			)

			return router
		},
	}
}
