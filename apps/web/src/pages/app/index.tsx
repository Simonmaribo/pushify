import withAuth from '@/hoc/with-auth'

function Home() {
	return (
		<div>
			<h1>App</h1>
		</div>
	)
}

export default withAuth(Home)
