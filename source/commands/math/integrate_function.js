const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('integrate_function')
		.setDescription('Approximate a definite integral of a function')
		.addStringOption((option) => option
			.setName('function')
			.setDescription('The function to integrate')
			.setRequired(true)
		)
		.addNumberOption((option) => option
			.setName('from')
			.setDescription('The lower bound of the integral')
			.setRequired(true)
		)
		.addNumberOption((option) => option
			.setName('to')
			.setDescription('The upper bound of the integral')
			.setRequired(true)
		),

	async execute(interaction) {
		let func = interaction.options.getString('function')
		let from = interaction.options.getNumber('from')
		let to = interaction.options.getNumber('to')

		const dx = 10 ** -2.5
		let area = 0

		for (let i = from; i < to; i += dx) {
			area += (eval(func.replaceAll('x', `(${i})`)) + eval(func.replaceAll('x', `(${i + dx})`))) / 2
		}

		await interaction.reply((Math.round(area * dx * 10) / 10).toString())
	}
}