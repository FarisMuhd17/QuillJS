const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sin')
		.setDescription('Calculate the sin a number')
		.addIntegerOption((option) => option
			.setName('radians')
			.setDescription('Radians of which you want to find the sin of')
			.setRequired(true)
		),

	async execute(interaction) {
		await interaction.reply((Math.sin(interaction.options.getInteger('radians'))).toString())
	}
}