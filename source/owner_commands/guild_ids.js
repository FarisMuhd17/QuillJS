module.exports = {
	name: 'guild_ids',
	description: 'Get all the IDs of the guilds the bot is in',
	syntax: 'q.guild_ids',
	async execute(client, message) {
		let returnValue = ""
		client.guilds.cache.forEach(guild => {
			returnValue += guild.id + "\n"
		})
		await message.channel.send('```' + returnValue + '```')
	}
}