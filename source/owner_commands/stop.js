module.exports = {
	name: 'stop',
	async execute(client) {
		client.destroy()
	}
}