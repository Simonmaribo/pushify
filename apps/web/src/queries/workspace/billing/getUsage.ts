import http, { getError } from '@/queries/http'

type Response = {
	messages: number
	devices: number
	limit: number
	nextPeriod: Date
}

export default function getUsage({
	workspaceId,
}: {
	workspaceId?: string
}): Promise<Response> {
	return new Promise(async (resolve, reject) => {
		await http
			.get(`/workspace/${workspaceId}/billing/usage`)
			.then((response) => resolve(response.data))
			.catch((error: any) => reject(getError(error)))
	})
}
