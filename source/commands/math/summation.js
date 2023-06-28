const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('summation')
		.setDescription('Use the summation notation (Symbol: n)')
		.addIntegerOption((option) => option
			.setName('start')
			.setDescription('The starting value of the summation')
			.setRequired(true)
		)
		.addIntegerOption((option) => option
			.setName('stop')
			.setDescription('The stopping value of the summation')
			.setRequired(true)
		)
		.addStringOption((option) => option
			.setName('function')
			.setDescription('The function you want to use the summation')
			.setRequired(true)
		),

	async execute(interaction) {
		let start = interaction.options.getInteger('start')
		let stop = interaction.options.getInteger('stop')
		let formula = interaction.options.getString('function')

		let allowed_chars = [
			'0', '1', '2', 
			'3', '4', '5', 
			'6', '7', '8', 
			'9', '+', '-', 
			'*', '/', '(',
			')', '.', ' ',
			'n'
		]

		for (character of formula) {
			if (!allowed_chars.includes(character)) {
				await interaction.reply({ content: "# Error\nInvalid syntax", ephemeral: true })
				return
			}
		}

		if (stop - start > 1000) {
			await interaction.reply({ content: "# Error\nDifference between the start and stop cannot be greater than 1000", ephemeral: true })
			return
		}

		if (start > stop) {
			await interaction.reply('0')
			return
		}

		let result = 0

		for (let i = start; i <= stop; i++) {
			console.log(formula.replace(/n/g, i))
		    result += eval(formula.replace(/n/g, i))
		}

		await interaction.reply(result.toString())
	}
}