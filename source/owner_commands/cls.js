module.exports = {
	name: 'cls',
	description: 'Clear the terminal',
	syntax: 'q.cls',
	async execute(args) {
		let [client] = args

		console.clear()
		console.log(`[INFO] Launched as ${client.user.username}\n`)
	}
}