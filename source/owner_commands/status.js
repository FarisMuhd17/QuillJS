module.exports = {
	name: 'status',
	async execute(client, message) {
		if (message.content.split(' ').length !== 2) {
			await message.channel.send('# Error\nSyntax: status (online / dnd / idle / invisible)')
		} else {
			await client.user.setStatus(message.content.split(' ')[1].toLowerCase())
		}
	}
}