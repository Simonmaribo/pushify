import { Router } from 'express'

export default interface Route {
	rateLimit?: {
		max: number
		timePeriod: number
	}
	router: () => Router
}
