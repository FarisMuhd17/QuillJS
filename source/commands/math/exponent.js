const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('exponent')
		.setDescription('Exponentiate the base to the exponent')
		.addIntegerOption((option) => option
			.setName('base')
			.setDescription('The base')
			.setRequired(true)
		)
		.addIntegerOption((option) => option
			.setName('exponent')
			.setDescription('The exponent')
			.setRequired(true)
		),

	async execute(interaction) {
		let base = interaction.options.getInteger('base')
		let exponent = interaction.options.getInteger('exponent')

		await interaction.reply((base ** exponent).toString())
	}
}