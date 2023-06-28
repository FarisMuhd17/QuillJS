const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('utc')
		.setDescription('Return the current time in UTC'),

	async execute(interaction) {
		let now = new Date()
		await interaction.reply(`${now.getUTCDate()}/${now.getUTCMonth()}/${now.getUTCFullYear()} - ${now.getUTCHours()}:${now.getUTCMinutes()}:${now.getUTCSeconds()}`)
	}
}