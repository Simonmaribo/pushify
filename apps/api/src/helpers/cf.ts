import type { Request } from 'express'

import axios from 'axios'

export async function verifyTurnstile(req: Request): Promise<Boolean> {
	if (process.env.NODE_ENV === 'development') return true

	const { cfToken: token } = req.body
	const ip = req.headers['cf-connecting-ip']
	if (!token) return false

	const response = await axios.post(
		`https://challenges.cloudflare.com/turnstile/v0/siteverify`,
		{
			response: token,
			remoteip: ip,
			secret: `${process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY}`,
		}
	)

	if (!response.data.success) return false
	return true
}
