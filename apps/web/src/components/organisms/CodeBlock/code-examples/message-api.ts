const NODE_AXIOS = `import axios from 'axios'

function sendMessage(){
        await axios.post('https://api.pushify.net/v1/send', {
                channel: '[CHANNEL_ID]',
                title: '[TITLE]',
                body: '[MESSAGE]'
        }, {
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer [API_KEY]'
            }
        })
}`

const NODE_LIB = `import Pushify from '@pushify/js'

const pushify = new Pushify({
        key: '[API_KEY]'
})

function sendMessage(){
        await pushify.send({
                channel: '[CHANNEL_ID]',
                title: '[TITLE]',
                body: '[MESSAGE]'
        })
}`

export { NODE_LIB, NODE_AXIOS }
