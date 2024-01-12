module.exports = {
	name: 'stop',
	description: 'Stop the bot',
	syntax: 'q.stop',
	async execute(args) {
		let [client] = args

		client.destroy()
	}
}