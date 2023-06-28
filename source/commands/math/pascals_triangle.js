const { SlashCommandBuilder } = require('discord.js')

function factorial(number) {
	answer = 1
	for (let i = 1; i < number + 1; i++) {
	    answer *= i
	}

	return number
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pascals_triangle')
		.setDescription('Compute the value of pascal\'s triange at a particular row and column')
		.addIntegerOption((option) => option
			.setName('row')
			.setDescription('The row of pascal\'s triangle')
			.setRequired(true)
		)
		.addIntegerOption((option) => option
			.setName('column')
			.setDescription('The column of pascal\'s triangle')
			.setRequired(true)
		),

	async execute(interaction) {
		let row = interaction.options.getInteger('row')
		let column = interaction.options.getInteger('column')

		if (row < 1 || column < 1) {
			await interaction.reply({ content: "# Error\nInputted values must be natural numbers", ephemeral: true })
			return
		}

		if (row < column) {
			await interaction.reply({ content: "# Error\nYour inputs are not possible values (Row cannot be lesser than the column)", ephemeral: true })
			return
		}

		await interaction.reply((factorial(row) / (factorial(column) * factorial(row - column))).toString())
	}
}