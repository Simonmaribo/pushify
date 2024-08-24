import http, { getError } from '@/queries/http'

export type APIListItem = {
	id: string
	name: string
	permission: string
	key: string
	lastUsedAt: Date | null
	createdAt: Date
}

export default function getAPIKeys({
	workspaceId,
}: {
	workspaceId?: string
}): Promise<APIListItem[]> {
	return new Promise(async (resolve, reject) => {
		await http
			.get(`/workspace/${workspaceId}/api`)
			.then((response) => resolve(response.data))
			.catch((error: any) => reject(getError(error)))
	})
}
