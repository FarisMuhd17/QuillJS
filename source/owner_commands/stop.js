module.exports = {
	name: 'stop',
	description: 'Stop the bot',
	syntax: 'q.stop',
	async execute(client, message) {
		client.destroy()
	}
}