const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cos')
		.setDescription('Calculate the cos a number')
		.addIntegerOption((option) => option
			.setName('radians')
			.setDescription('Radians of which you want to find the cos of')
			.setRequired(true)
		),

	async execute(interaction) {
		await interaction.reply((Math.cos(interaction.options.getInteger('radians'))).toString())
	}
}