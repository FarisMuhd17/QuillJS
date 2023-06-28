module.exports = {
	name: 'guild_names',
	async execute(client) {
		console.log('Guild names:')
		client.guilds.cache.forEach(guild => {
			console.log(guild.name)
		})
	}
}