import type Server from '../../../interfaces/Server'
import { ensureAuthentication } from '../../../middlewares/AuthMiddleware'
import { includeWorkspace } from '../../../middlewares/WorkspaceMiddleware'
import type { Request, Response } from 'express'
import * as z from 'zod'
import { getValidatedData } from '../../../helpers/utils'

const router = require('express').Router({ mergeParams: true })

module.exports = (server: Server) => {
	return {
		router: () => {
			const sendMessageSchema = z
				.object({
					channels: z.array(z.string()).optional(),
					channel: z.string().optional(),
					message: z.object({
						title: z.string().optional(),
						body: z.string().optional(),
						url: z
							.string()
							.url('URL must be a valid URL')
							.optional(),
						data: z.record(z.string()).optional(),
					}),
				})
				.refine((data) => {
					if (!data.channels && !data.channel) {
						throw new Error(
							'Either channels or channel must be provided'
						)
					}
					return true
				})

			router.post(
				'/',
				ensureAuthentication(server),
				includeWorkspace(server),
				async (req: Request, res: Response) => {
					let data = getValidatedData<typeof sendMessageSchema>(
						req,
						res,
						sendMessageSchema
					)
					if (!data) return

					const channels = (data.channels || [data.channel] ||
						[]) as string[]

					await server.pushController.addMessage(
						req.workspace.id,
						channels,
						{
							title: data.message.title,
							body: data.message.body,
							data: {
								url: data.message.url || undefined,
								...data.message.data,
							},
						}
					)

					return res.status(200).json({
						success: true,
					})
				}
			)

			return router
		},
	}
}
