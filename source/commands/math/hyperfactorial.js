const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hyperfactorial')
		.setDescription('Calculate the hyperfactorial a number')
		.addIntegerOption((option) => option
			.setName('number')
			.setDescription('Number of which you want to find the hyperfactorial of')
			.setRequired(true)
		),

	async execute(interaction) {
		number = interaction.options.getInteger('number')

		if (number < 0) {
			interaction.reply({ content: "# Error\nNumber must be a natural number", ephemeral: true })
			return
		}

		answer = 1

		for (let i = 1; i < number + 1; i++) {
		    answer *= i ** i
		}

		await interaction.reply(answer.toString())
	}
}