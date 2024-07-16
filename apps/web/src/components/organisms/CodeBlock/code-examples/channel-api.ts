const REACT = `function handleSubmit(data) {
    fetch('https://api.toolbird.io/v1/waitlist/[PUBLIC_KEY]/submit', {
        method: 'POST',
        body: JSON.stringify({
            email: data.email,
            name: data.name, // (Optional) Name field
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
}`

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

export { REACT, NODE_AXIOS }
