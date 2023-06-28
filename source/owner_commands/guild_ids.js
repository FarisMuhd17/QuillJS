module.exports = {
	name: 'guild_ids',
	async execute(client) {
		console.log("Guild IDs:")
		client.guilds.cache.forEach(guild => {
			console.log(guild.id)
		})
	}
}