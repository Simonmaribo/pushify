import http, { getError } from '@/queries/http'

export type User = {
	id: string
	email: string
	emailVerified: boolean
	name: string | null
	createdAt: Date
	updatedAt: Date
	lastSeen: Date | null
}

export default function getUser(): Promise<User> {
	return new Promise(async (resolve, reject) => {
		await http
			.get(`/user`)
			.then((response) => resolve(response.data))
			.catch((error: any) => reject(getError(error)))
	})
}
