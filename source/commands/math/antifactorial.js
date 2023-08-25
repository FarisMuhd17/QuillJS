const { SlashCommandBuilder } = require('discord.js')

function antifactorial(n) {
	let t = 1

	while (n !== 1) {
		t += 1
		n /= t

		if (n < 1) {
			return false
		}
	}

	return t
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('antifactorial')
		.setDescription('Find the antifactorial of a number')
		.addIntegerOption((option) => option 
			.setName('number')
			.setDescription('Number you want to find the antifactorial of')
			.setRequired(true)
		),

	async execute(interaction) {
		let number = interaction.options.getInteger('number')
		let af = antifactorial(number)

		interaction.reply(af ? af.toString() : `Antifactorial of ${number} does not exist`)
	}
}