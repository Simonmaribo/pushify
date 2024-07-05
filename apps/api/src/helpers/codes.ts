import Server from '../interfaces/Server'

function generateRandomCode() {
	// Random number from 0 to 10000000
	// add 0s to the front of the number until it is 8 digits long
	// return the number as a string
	return Math.floor(Math.random() * 10000000)
		.toString()
		.padStart(8, '0')
}

export async function getAvailableSubscriptionCode(server: Server) {
	async function checkCode(code: string) {
		let exists = await server.database.channelSubscriptionCode.findFirst({
			where: {
				code: code,
			},
		})
		return exists ? true : false
	}
	do {
		var code = generateRandomCode()
	} while (await checkCode(code))
	return code
}
