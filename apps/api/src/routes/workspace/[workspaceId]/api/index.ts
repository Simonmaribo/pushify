import { getValidatedData } from '../../../../helpers/utils'
import type Server from '../../../../interfaces/Server'
import { ensureAuthentication } from '../../../../middlewares/AuthMiddleware'
import { includeWorkspace } from '../../../../middlewares/WorkspaceMiddleware'
import type { Request, Response } from 'express'
import * as z from 'zod'
import { ulid } from 'ulidx'

const router = require('express').Router({ mergeParams: true })

module.exports = (server: Server) => {
	return {
		router: () => {
			router.get(
				'/',
				ensureAuthentication(server),
				includeWorkspace(server),
				async (req: Request, res: Response) => {
					const apiKeys = await server.database.aPIKey.findMany({
						where: {
							workspaceId: req.workspace.id,
						},
						orderBy: {
							createdAt: 'desc',
						},
					})
					const data = apiKeys.map((key) => {
						return {
							id: key.id,
							name: key.name,
							permission: 'Full access',
							key: key.key.substring(0, 12) + '...',
							lastUsedAt: key.lastUsed,
							createdAt: key.createdAt,
						}
					})

					return res.json(data)
				}
			)

			router.delete(
				`/:id`,
				ensureAuthentication(server),
				includeWorkspace(server),
				async (req: Request, res: Response) => {
					const { id } = req.params
					await server.database.aPIKey.delete({
						where: {
							id,
						},
					})
					return res.json({ success: true })
				}
			)

			const createAPIKeySchema = z.object({
				name: z.string().max(50),
			})

			router.post(
				'/',
				ensureAuthentication(server),
				includeWorkspace(server),
				async (req: Request, res: Response) => {
					const data = getValidatedData<typeof createAPIKeySchema>(
						req,
						res,
						createAPIKeySchema
					)
					if (!data) return

					const key = await server.database.aPIKey.create({
						data: {
							workspaceId: req.workspace.id,
							name: data.name,
							key: `sk_${ulid()}`.toLowerCase(),
						},
					})

					return res.json({
						id: key.id,
						name: key.name,
						key: key.key,
					})
				}
			)

			return router
		},
	}
}
