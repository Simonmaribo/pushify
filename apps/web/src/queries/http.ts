import axios, { AxiosInstance } from 'axios'

const http: AxiosInstance = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
	withCredentials: true,
	timeout: 20000,
	headers: {
		'X-Requested-With': 'XMLHttpRequest',
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
})

export function getError(error: any) {
	console.log(error)
	if (error?.response?.status == 429) {
		return 'Too many requests. Please try again later.'
	}
	return (
		error?.response?.data?.error ||
		error?.message ||
		error?.error ||
		error ||
		'An unknown error occurred.'
	)
}

export default http
