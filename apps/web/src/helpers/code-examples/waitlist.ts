const HTML = `<form action="https://api.toolbird.io/v1/waitlist/[PUBLIC_KEY]/submit" method="POST">
	<!-- (Optional) Name field -->
	<input type="text" name="name" />

	<!-- (Required) Email field is required -->
	<input type="email" name="email" placeholder="Enter your email" />
	
	<button>Subscribe</button>
</form>`

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

const NODEJS_SERVER = `function addToWaitlist(data) {
    axios.post('https://api.toolbird.io/v1/waitlist/[PUBLIC_KEY]/submit', {
        email: data.email,
        name: data.name, // (Optional) Name field
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer [PRIVATE_KEY]',
        },
    })
}`

export { HTML, REACT, NODEJS_SERVER }
