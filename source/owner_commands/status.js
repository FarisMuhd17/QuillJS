module.exports = {
	name: 'status',
	description: 'Change the status of the bot',
	syntax: 'q.status ( online / dnd / idle / invisible )',
	async execute(args) {
		let [client, message] = args

		if (message.content.split(' ').length !== 2) {
			await message.channel.send('# Error\nSyntax: status (online / dnd / idle / invisible)')
		} else {
			await client.user.setStatus(message.content.split(' ')[1].toLowerCase())
		}
	}
}