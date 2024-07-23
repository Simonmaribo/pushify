import { Message, PrismaClient } from '@prisma/client'
import { Expo, ExpoPushMessage } from 'expo-server-sdk'
import amqplib, { Channel, ChannelWrapper } from 'amqp-connection-manager'
import { IAmqpConnectionManager } from 'amqp-connection-manager/dist/types/AmqpConnectionManager'
import { ConsumeMessage } from 'amqplib'
import { JsonObject } from '@prisma/client/runtime/library'

type PushMessage = {
	message: Message
	pushTokens: string[]
}

type SendMessageData = {
	data?: object
	title?: string
	subtitle?: string
	body?: string
}

export default class PushController {
	private prisma: PrismaClient
	private expo: Expo
	private connection: IAmqpConnectionManager
	private messagesChannel: ChannelWrapper
	private batchesChannel: ChannelWrapper

	constructor(prisma: PrismaClient) {
		this.prisma = prisma
		this.expo = new Expo({
			accessToken: process.env.EXPO_ACCESS_TOKEN,
			useFcmV1: false,
		})
		this.connection = amqplib.connect([
			`amqp://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
		])

		this.messagesChannel = this.connection.createChannel({
			json: true,
			setup: (channel: Channel) => {
				return Promise.all([
					channel.assertQueue('messages', {
						durable: true,
					}),
					channel.consume(
						'messages',
						async (data: ConsumeMessage) => {
							// TODO: Batch messages
							await this.batchesChannel.sendToQueue('batches', [
								JSON.parse(data.content.toString()),
							])
							await this.messagesChannel.ack(data)
						}
					),
				])
			},
		})
		this.batchesChannel = this.connection.createChannel({
			json: true,
			setup: (channel: Channel) => {
				return Promise.all([
					channel.assertQueue('batches', {
						durable: true,
					}),
					channel.consume('batches', async (data: ConsumeMessage) => {
						await this.handleBatchMessages(data)
					}),
				])
			},
		})
	}

	public async addMessage(
		workspaceId: string,
		channels: string[],
		message: SendMessageData
	) {
		const channelsObjects = await this.prisma.channel.findMany({
			where: {
				workspaceId: workspaceId,
				id: {
					in: channels,
				},
			},
			include: {
				subscribers: {
					include: {
						device: true,
					},
				},
			},
		})
		// Only get valid channels
		channels = channelsObjects.map((channel) => channel.id)

		// ALl devices, but no dubplicates
		const devices = channelsObjects
			.flatMap((channel) =>
				channel.subscribers.map((subscriber) => subscriber.device)
			)
			.filter(
				(device, index, self) =>
					index === self.findIndex((t) => t.id === device.id)
			)
			.filter((device) => device.pushToken)

		const messageObject = await this.prisma.message.create({
			data: {
				workspaceId: workspaceId,
				data: message.data,
				title: message.title,
				body: message.body,
				channels: {
					create: channels.map((channel) => ({
						channelId: channel,
					})),
				},
				recipients: {
					create: devices.map((device) => ({
						workspaceId: workspaceId,
						deviceId: device.id,
					})),
				},
			},
		})

		const pushTokens = devices
			.map((device) => device.pushToken)
			.filter(Boolean)

		await this.messagesChannel.sendToQueue('messages', {
			message: messageObject,
			pushTokens,
		})
	}

	private async handleBatchMessages(data: ConsumeMessage) {
		// When message is sent to queue the Message and MessageReceipients are created before.
		const messages = JSON.parse(data.content.toString()) as PushMessage[]

		console.log('Handling batch messages', messages)

		// Create the ExpoPushMessage objects from the messages
		const expoMessages: ExpoPushMessage[] = messages.map((message) => {
			return {
				to: message.pushTokens,
				title: message?.message?.title || undefined,
				body: message?.message?.body || undefined,
				priority: 'high',
				sound: {
					name: 'default',
					volume: 1,
					critical: true,
				},
				data: message?.message?.data
					? (message?.message?.data as JsonObject)
					: undefined,
			}
		})
		const tickets = (await this.expo.sendPushNotificationsAsync(
			expoMessages
		)) as {
			status: 'error' | 'ok'
			id: string
			message?: string
			details?: object
		}[]
		let ticketData: {
			ticketId?: string
			ticketStatus: string
			ticketMessage?: string
			ticketDetails?: object
			messageId: string
		}[] = []

		for (let i = 0; i < tickets.length; i++) {
			const ticket = tickets[i]
			const message = messages[i]
			if (ticket.id) {
				ticketData.push({
					ticketId: ticket.id,
					ticketStatus: ticket.status,
					ticketMessage: ticket.message,
					ticketDetails: ticket.details,
					messageId: message.message.id,
				})
			} else {
				console.error(
					`Message with ID ${message.message.id} failed to send. Ticket: `,
					ticket
				)
				// TODO: If ticket.details.error === 'DeviceNotRegistered' remove the device from the database
			}
		}

		await this.prisma.expoPushTicket.createMany({
			data: ticketData,
		})

		// Acknowledge the message
		this.batchesChannel.ack(data)
	}
}
