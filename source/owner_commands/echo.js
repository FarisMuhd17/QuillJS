module.exports = {
	name: 'echo',
	description: 'Send a message to a channel',
	syntax: 'q.echo ( user / channel ) content',
	async execute(client, message) {
		let command = message.content.split(' ')

		if (command.length < 3) {
			await message.channel.send('# Error\nMinimum 2 arguments required')
			return
		}

		let content = ""

		for (let i = 2; i < command.length; i++) {
			content += `${command[i]} `
		}

		let user = message.mentions.users.first()
		let channel = message.mentions.channels.first()

		if (!user && !channel) {
			await message.channel.send('# Error\nSyntax: echo (user / channel) content')
			return
		}

		if (typeof channel !== 'undefined') {
			await channel.send(content)
		} else if (typeof user !== 'undefined') {
			await user.send(content)
		}
	}
}