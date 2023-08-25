const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quadratic_equation')
		.setDescription('Find the value of x if ax² + bx + c = 0, given a, b, and c')
		.addIntegerOption((option) => option
			.setName('a')
			.setDescription('The value of the coefficient that is multiplied to the square of x')
			.setRequired(true)
		)
		.addIntegerOption((option) => option
			.setName('b')
			.setDescription('The value of the coefficient that is multiplied to x')
			.setRequired(true)
		)
		.addIntegerOption((option) => option
			.setName('c')
			.setDescription('The value of a constant in the equation')
			.setRequired(true)
		),

	async execute(interaction) {
		let a = interaction.options.getInteger('a')
		let b = interaction.options.getInteger('b')
		let c = interaction.options.getInteger('c')

		let solution_1 = (-b + (b ** 2 - 4 * a * c) ** 0.5) / (2 * a)
		let solution_2 = (-b - (b ** 2 - 4 * a * c) ** 0.5) / (2 * a)

		await interaction.reply(`x = ${solution_1} or ${solution_2}`)
	}
}