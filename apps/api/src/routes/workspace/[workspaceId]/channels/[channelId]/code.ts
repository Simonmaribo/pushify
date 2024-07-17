import { getAvailableSubscriptionCode } from '../../../../../helpers/codes'
import type Server from '../../../../../interfaces/Server'
import { ensureAuthentication } from '../../../../../middlewares/AuthMiddleware'
import { includeWorkspace } from '../../../../../middlewares/WorkspaceMiddleware'
import type { Request, Response } from 'express'
import * as z from 'zod'

const router = require('express').Router({ mergeParams: true })

module.exports = (server: Server) => {
	return {
		router: () => {
			router.post(
				`/new`,
				ensureAuthentication(server),
				includeWorkspace(server),
				async (req: Request, res: Response) => {
					const { channelId } = req.params
					if (!channelId) {
						return res.status(400).json({
							error: 'Channel ID is required',
						})
					}

					const channel = await server.database.channel.findFirst({
						where: {
							id: channelId,
							workspaceId: req.workspace.id,
						},
					})
					if (!channel) {
						return res
							.status(404)
							.json({ error: 'Channel not found' })
					}

					const code = await getAvailableSubscriptionCode(server)

					await server.database.channelSubscriptionCode.create({
						data: {
							channelId: channelId,
							default: false,
							enabled: true,
							expiresAt: new Date(
								Date.now() + 1000 * 60 * 60 * 24
							),
							code: code,
						},
					})

					return res.status(201).json({
						code: code,
					})
				}
			)

			router.delete(
				'/:codeId',
				ensureAuthentication(server),
				includeWorkspace(server),
				async (req: Request, res: Response) => {
					const { channelId, codeId } = req.params
					if (!channelId || !codeId) {
						return res.status(400).json({
							error: 'Channel ID and Code ID is required',
						})
					}

					const channel = await server.database.channel.findFirst({
						where: {
							id: channelId,
							workspaceId: req.workspace.id,
						},
					})
					if (!channel) {
						return res
							.status(404)
							.json({ error: 'Channel not found' })
					}

					const code =
						await server.database.channelSubscriptionCode.findFirst(
							{
								where: {
									id: codeId,
									channelId: channelId,
								},
							}
						)
					if (!code) {
						return res.status(404).json({ error: 'Code not found' })
					}
					if (code.default) {
						return res.status(400).json({
							error: 'Cannot delete default code. Try disabling it instead.',
						})
					}

					await server.database.channelSubscriptionCode.delete({
						where: {
							id: codeId,
						},
					})

					return res.status(204).json({
						success: true,
					})
				}
			)

			router.post(
				`/:codeId/toggle`,
				ensureAuthentication(server),
				includeWorkspace(server),
				async (req: Request, res: Response) => {
					const { channelId, codeId } = req.params
					if (!channelId || !codeId) {
						return res.status(400).json({
							error: 'Channel ID and Code ID is required',
						})
					}

					const channel = await server.database.channel.findFirst({
						where: {
							id: channelId,
							workspaceId: req.workspace.id,
						},
					})
					if (!channel) {
						return res
							.status(404)
							.json({ error: 'Channel not found' })
					}

					const code =
						await server.database.channelSubscriptionCode.findFirst(
							{
								where: {
									id: codeId,
									channelId: channelId,
								},
							}
						)
					if (!code) {
						return res.status(404).json({ error: 'Code not found' })
					}
					if (!code.default) {
						return res.status(400).json({
							error: 'Cannot disable or enable default code. Try deleting it instead.',
						})
					}

					await server.database.channelSubscriptionCode.update({
						where: {
							id: codeId,
						},
						data: {
							enabled: !code.enabled,
						},
					})

					return res.status(204).json({
						success: true,
					})
				}
			)

			return router
		},
	}
}
