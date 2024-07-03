import Stripe from 'stripe'
import AuthController from '../controllers/AuthController'
import { PrismaClient } from '@prisma/client'
export default interface Server {
	database: PrismaClient
	environment: 'development' | 'production'
	authManager: AuthController
	stripe: Stripe
}
