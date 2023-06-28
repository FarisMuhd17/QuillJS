const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('percentage')
		.setDescription('Convert a fraction to a percentage')
		.addIntegerOption((option) => option
			.setName('numerator')
			.setDescription('The numerator of the fraction')
			.setRequired(true)
		)
		.addIntegerOption((option) => option
			.setName('denominator')
			.setDescription('The denominator of the fraction')
			.setRequired(true)
		),

	async execute(interaction) {
		let numerator = interaction.options.getInteger('numerator')
		let denominator = interaction.options.getInteger('denominator')

		if (denominator === 0) {
			await interaction.reply({ content: "# Error\nDenominator cannot be 0", ephemeral: true })
			return
		}

		await interaction.reply(((numerator / denominator) * 100).toString() + '%')
	}
}