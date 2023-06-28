module.exports = {
	name: 'stop',
	async execute(client, message) {
		client.destroy()
	}
}