import Server from '../interfaces/Server'
import { NextFunction, Request, Response } from 'express'

import jwt from 'jsonwebtoken'

export function ensureDeviceAuth(server: Server) {
	return async (req: Request, res: Response, next: NextFunction) => {
		let token = req.headers.authorization as string
        if(!token) {
            return res.status(401).json({ error: 'Unauthenticated' })
        }
        token = token.replace('Bearer ', '')

		return jwt.verify(
			token,
			`${process.env.JWT_SECRET}`,
			async (err: any, data: any) => {
				if (err)
					return res
						.status(401)
						.json({ error: 'Invalid access token' })

                    
                const deviceToken = await server.database.deviceToken.findFirst({
                    where: {
                        token: token
                    }
                })
                if(!deviceToken) {
                    return res.status(401).json({ error: 'Invalid access token' })
                }
                if(deviceToken.expiresAt < new Date()) {
                    return res.status(401).json({ error: 'Token expired' })
                }

                req.deviceId = deviceToken.deviceId;

				return next()
			}
		)
	}
}
