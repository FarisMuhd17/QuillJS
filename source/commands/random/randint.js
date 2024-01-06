const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('randint')
		.setDescription('Return a random number between two numbers')
		.addIntegerOption((option) => option
			.setName('lower_bound')
			.setDescription('The least value of the range of numbers')
			.setRequired(true)
		)
		.addIntegerOption((option) => option
			.setName('upper_bound')
			.setDescription('The highest value of the range of numbers')
			.setRequired(true)
		),

	async execute(interaction) {
		let lower_bound = interaction.options.getInteger('lower_bound')
		let upper_bound = interaction.options.getInteger('upper_bound')

		if (lower_bound > upper_bound) {
			await interaction.reply({ content: "# Error\n`lower_bound` cannot be greater than `upper_bound`", ephemeral: true })
			return
		}

		await interaction.reply((Math.floor(Math.random() * lower_bound) + upper_bound).toString())
	}
}