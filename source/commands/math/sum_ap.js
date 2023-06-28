const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sum_ap')
		.setDescription('Find the sum of an arithmetic progression')
		.addIntegerOption((option) => option
			.setName('first_term')
			.setDescription('The first term of the arithmetic progression')
			.setRequired(true)
		)
		.addIntegerOption((option) => option
			.setName('number_of_terms')
			.setDescription('The number of terms there are in the arithmetic progression')
			.setRequired(true)
		)
		.addIntegerOption((option) => option
			.setName('common_difference')
			.setDescription('The common difference between the numbers in the arithmetic progression')
			.setRequired(true)
		),

	async execute(interaction) {
		let first_term = interaction.options.getInteger('first_term')
		let number_of_terms = interaction.options.getInteger('number_of_terms')
		let common_difference = interaction.options.getInteger('common_difference')

		await interaction.reply(((number_of_terms / 2) * (2 * first_term + common_difference * (number_of_terms - 1))).toString())
	}
}