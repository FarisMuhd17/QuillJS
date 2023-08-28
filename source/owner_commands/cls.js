module.exports = {
	name: 'cls',
	description: 'Clear the terminal',
	syntax: 'q.cls',
	async execute(client, message) {
		console.clear()
		console.log(`[INFO] Launched as ${client.user.username}\n`)
	}
}