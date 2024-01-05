const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('differentiate_function')
		.setDescription('Find approximately what the slope of a function at a value is')
		.addStringOption((option) => option
			.setName('function')
			.setDescription('The function')
			.setRequired(true)
		)
		.addNumberOption((option) => option
			.setName('at')
			.setDescription('The slope of the function at this value')
			.setRequired(true)
		),

	async execute(interaction) {
		let func = interaction.options.getString('function')
		let at = interaction.options.getNumber('at')

		let dx = 10 ** -8
		function f(n) {
			return eval(func.replace('x', n))
		}

		await interaction.reply((Math.round((f(at + dx) - f(at)) / dx)).toString())
	}
}