module.exports = {
	name: 'guild_names',
	description: 'Get all the names of the guilds the bot is in',
	syntax: 'q.guild_names',
	async execute(args) {
		let [client, message] = args

		let returnValue = ""
		client.guilds.cache.forEach(guild => {
			returnValue += guild.name + "\n"
		})
		await message.channel.send('```' + returnValue + '```')
	}
}