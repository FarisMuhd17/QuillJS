const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sum_till')
		.setDescription('Find the sum of all natural numbers from 0 to n')
		.addIntegerOption((option) => option
			.setName('number')
			.setDescription('The last natural number that is added to the sequence')
			.setRequired(true)
		),

	async execute(interaction) {
		let number = interaction.options.getInteger('number')
		let answer = (number * (number + 1)) / 2

		await interaction.reply(answer.toString())
	}
}