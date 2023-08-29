module.exports = {
	name: 'echo',
	description: 'Send a message to a user or channel',
	syntax: 'q.echo ( user / channel ) id content',
	async execute(client, message) {
		let command = message.content.split(' ')

		if (command.length < 4) {
			await message.channel.send('# Error\nMinimum 3 arguments required')
			return
		}

		let content = ""

		for (let i = 3; i < command.length; i++) {
			content += `${command[i]} `
		}

		let obj_id = command[2]

		if (command[1] === 'user') {
			client.guilds.cache.forEach(guild => {
				let u = guild.members.cache.get(obj_id)
				if (u) {
					u.send(content)
					message.channel.send(`**Sent to user:**\n${content}`)
				}
			})
		} else if (command[1] === 'channel') {
			client.guilds.cache.forEach(guild => {
				let c = guild.channels.cache.get(obj_id)
				if (c) {
					c.send(content)
					message.channel.send(`**Sent to channel:**\n${content}`)
				}
			})
		}
	}
}