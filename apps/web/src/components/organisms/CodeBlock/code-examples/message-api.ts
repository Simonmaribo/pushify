const NODE_AXIOS = `import axios from 'axios'

function sendMessage(){
        await axios.post('https://api.pushify.net/v1/send', {
                channel: '[CHANNEL_ID]',
                title: '[TITLE]',
                body: '[MESSAGE]',
                // This is optional, and will open the link when the notification is clicked
                url: "https://example.com"
        }, {
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer [API_KEY]'
            }
        })
}`

const NODE_LIB = `import { Pushify } from '@pushify/js'

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
}`

export { NODE_LIB, NODE_AXIOS }
