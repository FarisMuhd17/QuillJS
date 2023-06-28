const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coinflip')
		.setDescription('Do a coinflip'),

	async execute(interaction) {
		let choices = ["Heads", "Tails"]
		await interaction.reply(choices[Math.floor(Math.random() * choices.length)])
	}
}