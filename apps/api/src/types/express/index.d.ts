import { User, Workspace } from '@prisma/client'

export {}

declare global {
	namespace Express {
		interface Request {
			user: User
			workspace: Workspace
			workspaceId?: string
			/**
			 * Id of the device, not the secret deviceId
			 **/
			deviceId: number
		}
	}
}
