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

			return router
		},
	}
}
