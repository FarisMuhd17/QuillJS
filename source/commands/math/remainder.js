const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remainder')
		.setDescription('Find the remainder of two numbers when divided')
		.addIntegerOption((option) => option
			.setName('number1')
			.setDescription('Dividend')
			.setRequired(true)
		)
		.addIntegerOption((option) => option
			.setName('number2')
			.setDescription('Divisor')
			.setRequired(true)
		),

	async execute(interaction) {
		let num1 = interaction.options.getInteger('number1')
		let num2 = interaction.options.getInteger('number2')

		if (num2 === 0) {
			await interaction.reply({ content: "# Error\nNumber cannot be 0", ephemeral: true })
			return
		}

		await interaction.reply((num1 % num2).toString())
	}
}