import http, { getError } from '@/queries/http'

export type WorkspaceItem = {
	id: string
	name: string
	role: 'OWNER' | 'ADMIN'
	iconUrl?: string
	updatedAt: string
	createdAt: string
	onboarded: boolean
}

export default function getWorkspaces(): Promise<WorkspaceItem[]> {
	return new Promise(async (resolve, reject) => {
		await http
			.get(`/user/workspaces`)
			.then((response) => resolve(response.data))
			.catch((error: any) => reject(getError(error)))
	})
}
