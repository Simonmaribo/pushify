

export {}

declare global {
	namespace Express {

		interface Request {
			deviceId?: string
		}
	}
}
