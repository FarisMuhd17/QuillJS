const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('evaluate')
		.setDescription('Evaluate a math expression')
		.addStringOption((option) => option
			.setName('expression')
			.setDescription('The expression you want to evaluate')
			.setRequired(true)
		),

	async execute(interaction) {
		let expression = interaction.options.getString('expression').replaceAll(' ', '')

		let allowed_chars = [
			'0', '1', '2', 
			'3', '4', '5', 
			'6', '7', '8', 
			'9', '+', '-', 
			'*', '/', '(',
			')', '.'
		]

		for (let character of expression) {
			if (!allowed_chars.includes(character)) {
				await interaction.reply(`\`${expression}\` is invalid`)
				return
			}
		}

		await interaction.reply(eval(expression).toString())
	}
}