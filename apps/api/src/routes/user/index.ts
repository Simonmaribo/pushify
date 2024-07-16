import { Workspace } from '@prisma/client'
import type Server from '../../interfaces/Server'
import { ensureAuthentication } from '../../middlewares/AuthMiddleware'
import type { Request, Response } from 'express'

const router = require('express').Router({ mergeParams: true })

module.exports = (server: Server) => {
	return {
		router: () => {
			router.get(
				'/',
				ensureAuthentication(server),
				async (req: Request, res: Response) => {
					return res.json(req.user)
				}
			)

			router.get(
				'/workspaces',
				ensureAuthentication(server),
				async (req: Request, res: Response) => {
					let workspaces = await server.database.$queryRaw<
						Workspace[]
					>`SELECT 
						Workspace.id as id,
						Workspace.name as name,
						Workspace.iconId as iconId,
						Workspace.createdAt as createdAt,
						Workspace.updatedAt as updatedAt,
						Workspace.onboarded as onboarded,
						WM.role
					FROM Workspace INNER JOIN WorkspaceMember WM on WM.userId = ${req.user.id} AND WM.workspaceId = Workspace.id
					`

					return res.json(workspaces)
				}
			)

			return router
		},
	}
}
