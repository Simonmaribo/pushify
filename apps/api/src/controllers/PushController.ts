import { Message, PrismaClient } from '@prisma/client'
import { Expo, ExpoPushMessage } from 'expo-server-sdk'
import amqplib, { Channel, ChannelWrapper } from 'amqp-connection-manager'
import { IAmqpConnectionManager } from 'amqp-connection-manager/dist/types/AmqpConnectionManager'
import { ConsumeMessage } from 'amqplib'

type PushMessage = {
	message: Message
	pushTokens: string[]
}

export default class PushController {
	private expo: Expo
	private connection: IAmqpConnectionManager
	private messagesChannel: ChannelWrapper
	private batchesChannel: ChannelWrapper

	constructor() {
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
				return channel.assertQueue('messages', {
					durable: true,
				})
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

	private async handleBatchMessages(data: ConsumeMessage) {
		// When message is sent to queue the Message and MessageReceipients are created before.
		const messages = JSON.parse(data.content.toString()) as PushMessage[]

		// Create the ExpoPushMessage objects from the messages
		const expoMessages: ExpoPushMessage[] = []
		const tickets = await this.expo.sendPushNotificationsAsync(expoMessages)

		// TODO: Check for immediate errors

		// TODO: Save tickets to the database and update the message status after 15 minutes with cron job

		// Acknowledge the message
		this.batchesChannel.ack(data)
	}
}
