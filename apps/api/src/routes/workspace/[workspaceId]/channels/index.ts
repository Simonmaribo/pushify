import type Server from '../../../../interfaces/Server'
import { ensureAuthentication } from '../../../../middlewares/AuthMiddleware'
import { includeWorkspace } from '../../../../middlewares/WorkspaceMiddleware'
import type { Request, Response } from 'express'
import * as z from 'zod'
import { getValidatedData } from '../../../../helpers/utils'
import { ulid } from 'ulidx'
import { getAvailableSubscriptionCode } from '../../../../helpers/codes'

const router = require('express').Router({ mergeParams: true })

module.exports = (server: Server) => {
	return {
		router: () => {
			router.get(
				'/',
				ensureAuthentication(server),
				includeWorkspace(server),
				async (req: Request, res: Response) => {
					const channels = await server.database.channel.findMany({
						where: {
							workspaceId: req.workspace.id,
						},
						include: {
							_count: {
								select: {
									subscribers: true,
								},
							},
						},
					})

					const data = channels.map((channel) => {
						return {
							id: channel.id,
							name: channel.name,
							devices: channel._count.subscribers,
						}
					})

					return res.json(data)
				}
			)

			const createWebsiteSchema = z.object({
				name: z.union([
					z
						.string()
						.max(255, 'Domain must be less than 255 characters')
						.optional(),
					z.literal(''),
				]),
			})

			router.post(
				'/',
				ensureAuthentication(server),
				includeWorkspace(server),
				async (req: Request, res: Response) => {
					let data = getValidatedData<typeof createWebsiteSchema>(
						req,
						res,
						createWebsiteSchema
					)
					if (!data) return

					const code = await getAvailableSubscriptionCode(server)
					const channel = await server.database.channel.create({
						data: {
							id: `c_${ulid()}`.toLowerCase(),
							workspaceId: req.workspace.id,
							name: data.name || 'New Channel',
							subscriptionCodes: {
								create: {
									default: true,
									enabled: true,
									code: code,
								},
							},
						},
					})

					return res.json({
						success: true,
						id: channel.id,
					})
				}
			)

			return router
		},
	}
}
