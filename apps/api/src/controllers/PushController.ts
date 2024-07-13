import { Message, PrismaClient } from '@prisma/client'
import { Expo, ExpoPushMessage } from 'expo-server-sdk'
import amqplib, { Channel, ChannelWrapper } from 'amqp-connection-manager'
import { IAmqpConnectionManager } from 'amqp-connection-manager/dist/types/AmqpConnectionManager'
import { ConsumeMessage } from 'amqplib'

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
		workspace: string,
		channels: string[],
		message: SendMessageData
	) {
		const channelsObjects = await this.prisma.channel.findMany({
			where: {
				workspaceId: workspace,
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

		const messageObject = await this.prisma.message.create({
			data: {
				workspaceId: workspace,
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
			}
		})
		const tickets = await this.expo.sendPushNotificationsAsync(expoMessages)

		// TODO: Check for immediate errors

		// TODO: Save tickets to the database and update the message status after 15 minutes with cron job

		// Acknowledge the message
		this.batchesChannel.ack(data)
	}
}
