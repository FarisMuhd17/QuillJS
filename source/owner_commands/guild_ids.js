module.exports = {
	name: 'guild_ids',
	async execute(client, message) {
		let returnValue = ""
		client.guilds.cache.forEach(guild => {
			returnValue += guild.id + "\n"
		})
		await message.channel.send('```' + returnValue + '```')
	}
}