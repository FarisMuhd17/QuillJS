module.exports = {
	name: 'latency',
	description: 'Get the ping of the bot',
	syntax: 'q.latency',
	async execute(client, message) {
		await message.channel.send(`${Date.now() - message.createdTimestamp}ms`)
	}
}