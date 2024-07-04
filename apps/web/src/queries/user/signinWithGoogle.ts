import http from '../http'

export default async function signinWithGoogle() {
	const response = await http.get(`/user/auth/google`)
	const { url } = (await response.data) as { url: string }
	window.location.href = url
}
