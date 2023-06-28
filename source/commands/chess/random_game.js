const { SlashCommandBuilder } = require('discord.js')
const { Chess } = require('chess.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('random_game')
		.setDescription('Create a random game of chess until it ends'),

	async execute(interaction) {
		await interaction.reply("```Generating```")

		const chess = new Chess()

		let result = ""

		do {
			chess.load("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
			while (!chess.isGameOver()) {
				const moves = chess.moves()
				const move = moves[Math.floor(Math.random() * moves.length)]
				chess.move(move)
			}
		} while (chess.pgn().length > 2000)

		await interaction.editReply("```" + chess.pgn() + "```")
	}
}