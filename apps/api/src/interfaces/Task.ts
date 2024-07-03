export default interface Task {
	name: string
	cron: string
	enabled?: boolean
	run: () => Promise<void>
}
