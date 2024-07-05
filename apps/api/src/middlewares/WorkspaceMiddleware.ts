import { WorkspaceRole, Workspace } from '@prisma/client'
import Server from '../interfaces/Server'
import { NextFunction, Request, Response } from 'express'

export function includeWorkspace(server: Server, role?: WorkspaceRole) {
	return async (req: Request, res: Response, next: NextFunction) => {
		if (!req.user.id) {
			throw new Error(
				'includeWorkspace middleware requires user to be set on the request object'
			)
		}
		let { workspaceId } = req.params as { workspaceId: string }
		if (!workspaceId) {
			return res.status(400).json({ error: 'Missing Workspace ID' })
		}
		let [workspace] = await server.database.$queryRaw<
			(Workspace & {
				role: WorkspaceRole
			})[]
		>`
            SELECT 
                Workspace.id as id,
                Workspace.name as name,
				Workspace.iconId as iconId,
                Workspace.createdAt as createdAt,
                Workspace.updatedAt as updatedAt,
                WM.role
            FROM Workspace
            INNER JOIN WorkspaceMember WM on WM.userId = ${req.user.id} AND WM.workspaceId = Workspace.id
            WHERE Workspace.id = ${workspaceId}
        `

		if (!workspace)
			return res.status(404).json({ error: 'Workspace not found' })

		if (role) {
			if (role == 'OWNER') {
				if (workspace.role != 'OWNER')
					return res.status(401).json({
						error: 'You are not the owner of this workspace',
					})
			}
			if (role == 'ADMIN') {
				if (workspace.role != 'OWNER' && workspace.role != 'ADMIN')
					return res.status(401).json({
						error: 'You are not the owner or an admin of this workspace',
					})
			}
		}

		req.workspace = {
			...workspace,
		}

		return next()
	}
}
