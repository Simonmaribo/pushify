import { User, Workspace } from '@prisma/client'

export {}

declare global {
	namespace Express {
		interface Request {
			user: User
			workspace: Workspace
			deviceId?: string
		}
	}
}
