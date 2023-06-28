const { SlashCommandBuilder } = require('discord.js')
const { Chess } = require('chess.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('possible_move')
		.setDescription('Return all the possible moves in a position')
		.addStringOption((option) => option
			.setName('fen')
			.setDescription('The fen you want to find all the possible moves of')
			.setRequired(true)
		),

	async execute(interaction) {
		let chess = new Chess(interaction.options.getString('fen'))
		await interaction.reply("```" + chess.moves().toString().replace(/,/g, ', ') + "```")
	}
}