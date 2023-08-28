module.exports = {
	name: 'status',
	description: 'Change the status of the bot',
	syntax: 'q.status ( online / dnd / idle / invisible )',
	async execute(client, message) {
		if (message.content.split(' ').length !== 2) {
			await message.channel.send('# Error\nSyntax: status (online / dnd / idle / invisible)')
		} else {
			await client.user.setStatus(message.content.split(' ')[1].toLowerCase())
		}
	}
}