const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('randint')
		.setDescription('Return a random number between two numbers')
		.addIntegerOption((option) => option
			.setName('number1')
			.setDescription('The least value of the range of numbers')
			.setRequired(true)
		)
		.addIntegerOption((option) => option
			.setName('number2')
			.setDescription('The highest value of the range of numbers')
			.setRequired(true)
		),

	async execute(interaction) {
		let number1 = interaction.options.getInteger('number1')
		let number2 = interaction.options.getInteger('number2')

		if (number1 > number2) {
			await interaction.reply({ content: "# Error\n`number1` cannot be greater than `number2`", ephemeral: true })
			return
		}

		await interaction.reply((Math.floor(Math.random() * number1) + number2).toString())
	}
}