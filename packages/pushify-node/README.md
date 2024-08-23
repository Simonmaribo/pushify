# @pushify/js

Used to send push notifications to devices via [Pushify.net](https://pushify.net).

### Usage

#### Initialize Pushify instance

```js
import { Pushify } from '@pushify/js'

const pushify = new Pushify({
    key: "YOUR_API_KEY"
})
```

#### Send push messages

First you will need to create a channel and connect a device - this will give you a `channelId`

```js
await pushify.send({
    channel: "[CHANNEL_ID]",
    title: "Title of message",
    body: "Long body of information"
})
```

#### Open URL when notification is clicked

If you want, you can pass a `url` parameter to the `send()` method to open a specific URL when the push notification is clicked.

```js
await pushify.send({
    channel: "[CHANNEL_ID]",
    title: "💸 New dispute has been created",
    body: "Customer John Doe has disputed a payment of $135.00 USD",
    url: "https://dashboard.stripe.com/disputes/di_12345"
})
```