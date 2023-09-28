const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('factorial')
		.setDescription('Find the factorial of any number')
		.addIntegerOption((option) => option
			.setName('number')
			.setDescription('The number of which you want to find the factorial of')
			.setRequired(true)
		),

	async execute(interaction) {
		number = interaction.options.getInteger('number')

		if (number < 0) {
			await interaction.reply({ content: "# Error\nNumber must be a natural number", ephemeral: true })
			return
		}

		answer = 1

		for (let i = 1; i <= number; i++) {
		    answer *= i
		}

		await interaction.reply(answer.toString())
	}
}