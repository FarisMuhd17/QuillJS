module.exports = {
	name: 'latency',
	async execute(client, message) {
		await message.channel.send(`${Date.now() - message.createdTimestamp}ms`)
	}
}