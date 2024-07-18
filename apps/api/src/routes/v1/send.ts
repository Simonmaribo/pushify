import type Server from '../../interfaces/Server'
import type { Request, Response } from 'express'
import * as z from 'zod'
import { getValidatedData } from '../../helpers/utils'
import { ensureAPIAuth } from '../../middlewares/APIMiddleware'

const router = require('express').Router({ mergeParams: true })

module.exports = (server: Server) => {
	return {
		router: () => {
			const sendMessageSchema = z
				.object({
					channels: z.array(z.string()).optional(),
					channel: z.string().optional(),
					title: z.union([
						z.string().max(255).optional(),
						z.literal(''),
					]),
					body: z.union([
						z.string().max(2000).optional(),
						z.literal(''),
					]),
					url: z.union([z.string().optional(), z.literal('')]),
					data: z.record(z.string()).optional(),
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
				ensureAPIAuth(server),
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
						req.workspaceId as string,
						channels,
						{
							title:
								data.title != null && data.title !== ''
									? data.title
									: 'Empty title',
							body: data.body,
							data: {
								url: data.url || undefined,
								...data.data,
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
