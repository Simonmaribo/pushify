import { PrismaClient, Session, User } from '@prisma/client'
import { Request, Response } from 'express'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export default class AuthController {
	private prisma: PrismaClient

	constructor(prisma: PrismaClient) {
		this.prisma = prisma
	}

	public getUserFromToken = async (
		token: string
	): Promise<User | undefined> => {
		try {
			const session = await this.prisma.session.findFirst({
				where: {
					token,
					expiresAt: {
						gt: new Date(),
					},
				},
				select: {
					user: true,
				},
			})
			if (!session) return undefined

			return session?.user
		} catch (err) {
			return undefined
		}
	}

	public getToken(req: Request): string {
		return req.cookies.access_token
	}

	public removeToken(res: Response) {
		res.clearCookie('access_token')
	}

	public setToken(res: Response, token: string) {
		res.cookie('access_token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
			secure: process.env.NODE_ENV === 'production',
		})
	}

	public async deleteSession(req: Request) {
		const token = this.getToken(req)
		if (token) {
			await this.prisma.session.deleteMany({
				where: {
					token: token,
				},
			})
		}
	}

	public async deleteAllSessions(userId: string) {
		await this.prisma.session.deleteMany({
			where: {
				userId: userId,
			},
		})
	}

	public async comparePassword(
		encryptedPassword: string,
		password: string
	): Promise<Boolean> {
		return await bcrypt.compare(password, encryptedPassword)
	}

	public async hashPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)
		return hash
	}

	public async isTokenValid(token: string): Promise<Boolean> {
		var session = await this.prisma.session.findFirst({
			where: {
				token: token,
				expiresAt: {
					gt: new Date(),
				},
			},
		})
		return session != null
	}

	public async login(
		req: Request,
		res: Response,
		userId: string
	): Promise<Session> {
		const session = await this.generateNewSession(req, userId)
		this.setToken(res, session.token)
		return session
	}

	public async generateNewSession(
		req: Request,
		userId: string
	): Promise<Session> {
		let token: string
		do {
			token = jwt.sign({ userId }, `${process.env.JWT_SECRET}`)
		} while (
			await this.prisma.session.findFirst({
				where: {
					token: token,
				},
			})
		)

		const session = await this.prisma.session.create({
			data: {
				userId,
				ipAddress: `${req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.connection.remoteAddress}`,
				userAgent: req.headers['user-agent'],
				token: token,
				expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days,
			},
		})

		return session
	}
}
