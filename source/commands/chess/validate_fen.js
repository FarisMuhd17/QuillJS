const { SlashCommandBuilder } = require('discord.js')
const { Chess } = require('chess.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('validate_fen')
		.setDescription('Validate the inputted FEN position')
		.addStringOption((option) => option
			.setName('fen')
			.setDescription('The FEN of the position')
			.setRequired(true)
		),

	async execute(interaction) {
		let chess = new Chess()
		let response = chess.validateFen(interaction.options.getString('fen'))

		if (response["ok"]) {
			await interaction.reply(":white_check_mark: The FEN is valid")
		} else {
			await interaction.reply(`The FEN is invalid: ${response["error"]}`)
		}
	}
}