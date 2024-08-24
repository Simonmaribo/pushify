import type Server from '../../../../../interfaces/Server'
import type { Request, Response, Router } from 'express'

const router = require('express').Router({ mergeParams: true }) as Router

module.exports = (server: Server) => {
	return {
		router: () => {
			router.post('/setup', async (req: Request, res: Response) => {
				const channelKey = req.headers['ifttt-channel-key']
				const serviceKey = req.headers['ifttt-service-key']
				if (
					!channelKey ||
					!serviceKey ||
					serviceKey !== process.env.IFTTT_SERVICE_KEY
				) {
					return res.status(401).json({
						error: 'Unauthorized',
					})
				}
				return res.json({
					data: {
						samples: {
							actions: {
								send_push_notification: {
									api_key: process.env.INTEGRATIONS_API_KEY,
									channel_id:
										process.env.INTEGRATIONS_CHANNEL_ID,
									title: 'IFTTT Test',
									message:
										'This is a test notification from IFTTT',
									url: 'https://google.com',
								},
							},
							actionRecordSkipping: {
								send_push_notification: {
									api_key: process.env.INTEGRATIONS_API_KEY,
									channel_id:
										process.env.INTEGRATIONS_CHANNEL_ID,
									title: '',
								},
							},
						},
					},
				})
			})

			return router
		},
	}
}
