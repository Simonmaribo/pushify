import http, { getError } from '@/queries/http'

type Channel = {
	id: string
	name: string
	createdAt: Date
	expiresAt: Date | null
	willExpire: boolean
	subscribers: {
		id: string
		device: {
			id: number
			deviceName: string | null
			deviceType: 'UNKNOWN' | 'PHONE' | 'TABLET' | 'DESKTOP' | 'TV'
			devicePlatform: 'IOS' | 'ANDROID'
			deviceYearClass: number | null
			deviceManufacturer: string | null
			deviceModelName: string | null
			deviceOsName: string | null
			deviceOsVersion: string | null
		}
	}[]
	codes: {
		id: string
		default: boolean
		enabled: boolean
		code: string
		channelId: string
		usesLeft: number | null
		expiresAt: Date | null
	}[]
}

export default function getChannel({
	workspaceId,
	channelId,
}: {
	workspaceId?: string
	channelId?: string
}): Promise<Channel> {
	return new Promise(async (resolve, reject) => {
		await http
			.get(`/workspace/${workspaceId}/channels/${channelId}`)
			.then((response) => resolve(response.data))
			.catch((error) => reject(getError(error)))
	})
}
