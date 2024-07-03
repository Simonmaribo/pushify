import Stripe from 'stripe'

type SubscriptionData = {
	interval: 'month' | 'year'
	currency: string
	value: number
	current_period_end: Date
	current_period_start: Date
}

export function getSubscriptionData(subscription: Stripe.Subscription) {
	if (!subscription) {
		return null
	}
	let data: SubscriptionData = {
		currency: subscription.currency,
		current_period_end: new Date(subscription.current_period_end * 1000),
		current_period_start: new Date(
			subscription.current_period_start * 1000
		),
		value: 0,
		interval: 'month',
	}

	for (let item of subscription.items.data) {
		data.value += (item.price.unit_amount || 0) * (item.quantity || 0)
		data.interval = item.plan.interval as 'month' | 'year'
	}

	return data
}
