const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tan')
		.setDescription('Calculate the tan a number')
		.addIntegerOption((option) => option
			.setName('radians')
			.setDescription('Radians of which you want to find the tan of')
			.setRequired(true)
		),

	async execute(interaction) {
		await interaction.reply((Math.tan(interaction.options.getInteger('radians'))).toString())
	}
}