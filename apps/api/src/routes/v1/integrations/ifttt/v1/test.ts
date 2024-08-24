import type Server from '../../../../../interfaces/Server'
import type { Request, Response, Router } from 'express'

const router = require('express').Router({ mergeParams: true }) as Router

module.exports = (server: Server) => {
	return {
		router: () => {
			router.post('/setups', async (req: Request, res: Response) => {
				const {
					'IFTTT-Channel-Key': channelKey,
					'IFTTT-Service-Key': serviceKey,
				} = req.headers
				if (
					!channelKey ||
					!serviceKey ||
					serviceKey !== process.env.IFTTT_SERVICE_KEY
				) {
					return res.status(401).json({ error: 'Unauthorized' })
				}
				return res.json({
					data: {
						samples: {
							actions: {
								send_push_notification: {
									api_key: '',
									channel_id: '',
									title: '',
									message: '',
									url: '',
								},
							},
							actionRecordSkipping: {
								send_push_notification: {
									api_key: '',
									channel_id: '',
									title: '',
									message: '',
									url: '',
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
