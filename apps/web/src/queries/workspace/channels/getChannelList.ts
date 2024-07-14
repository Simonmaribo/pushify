import http, { getError } from '@/queries/http'

export type ChannelListItem = {
	id: string
	name: string
	devices: number
	messages: number
	lastMessageDate: Date | null
}

export default function getChannelList({
	workspaceId,
}: {
	workspaceId?: string
}): Promise<ChannelListItem[]> {
	return new Promise(async (resolve, reject) => {
		await http
			.get(`/workspace/${workspaceId}/channels`)
			.then((response) => resolve(response.data))
			.catch((error) => reject(getError(error)))
	})
}
