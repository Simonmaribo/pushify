import Stripe from 'stripe'
import AuthController from '../controllers/AuthController'
import { PrismaClient } from '@prisma/client'
import PushController from '../controllers/PushController'
export default interface Server {
	database: PrismaClient
	environment: 'development' | 'production'
	authManager: AuthController
	pushController: PushController
	stripe: Stripe
}
