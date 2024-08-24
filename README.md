# Open Source Push Notifications System

If just there were a way to send push notifications to Customers without the need to create your own app. Enter [Pushify.net](https://pushify.net) - an easy to setup solution for exactly this issue.

![Pushify App](https://i.imgur.com/tdGUMCM.png "Pushify App")

### Steps to use
* Sign up to Pushify.net
* Create a channel and receive a Subscription Code.
* Let your users download the [Pushify Notififications](https://apps.apple.com/jp/app/pushify-notifications/id6517357435?l=en-US) app on App Store or Google Play Store *(soon)*
* Give the user the Subscription Code and let them subscribe to the channel.
* Send notifications when something happens in your app.

### API Usage
If using `NodeJS`, then just install our `@pushify/js` library.

```
npm install @pushify/js
```

#### Send a message
##### NodeJS (with Library)
```javascript
import { Pushify } from '@pushify/js'

const pushify = new Pushify({
    key: '[API_KEY]'
})

function sendMessage(){
    await pushify.send({
        channel: '[CHANNEL_ID]',
        title: '[TITLE]',
        body: '[MESSAGE]',
        // This is optional, and will open the link when the notification is clicked
        url: "https://example.com"
    })
}

```

You can send to multiple channels if passing `channels` as `string[]` instead of `channel`.

##### NodeJS (fetch)
```javascript
async function sendMessage(){
    await fetch(`https://api.pushify.net/v1/send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer [API_KEY]`
        },
        body: JSON.stringify({
            channel: '[CHANNEL_ID]',
            title: '[TITLE]',
            body: '[MESSAGE]',

            // This is optional, and will open the link when the notification is clicked
            url: "https://example.com"
        }),
      })
}
```


### Todos
- [ ] Batching of Push Notifications
- [ ] Delete Channels
- [ ] Delete Messages on Phone (Mark as Read)
- [ ] API endpoints to create/delete/update channels