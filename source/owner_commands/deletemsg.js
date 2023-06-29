module.exports = {
	name: 'deletemsg',
	async execute(client, message) {
		if (message.content.split(' ').length !== 2) {
			await message.channel.send("# Error\nSyntax: deletemsg message_id")
			return
		}

		let message_id = message.content.split(' ')[1]
		message.channel.messages.fetch(message_id)
			.then(message_ => {
				message_.delete()
			})
			.catch(console.error)
	}
}