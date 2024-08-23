import { Pushify } from '@pushify/js'

const pushify = new Pushify({
	key: `${process.env.PUSHIFY_KEY}`,
})

export async function sendAlert(title: string, body: string, url?: string) {
	await pushify.send({
		channel: `${process.env.PUSHIFY_CHANNEL}`,
		title,
		body,
		url,
	})
}
