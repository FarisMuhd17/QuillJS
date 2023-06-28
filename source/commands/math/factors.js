const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('factors')
		.setDescription('Find the factors of a number')
		.addIntegerOption((option) => option
			.setName('number')
			.setDescription('The number of which you want to find the factors of')
			.setRequired(true)
		),

	async execute(interaction) {
		let number = interaction.options.getInteger('number')

		if (number === 1) {
			await interaction.reply('1')
			return
		}

		let numfactors = []

		if (number < 0) {
			numfactors.push(-1)
			number *= -1
		}

		for (let i = 1; i <= number; i++) {
			if (number % i === 0) {
				numfactors.push(i)
			}
		}

		numfactors = numfactors.sort(function(a, b){return a-b})
		numfactorsstr = numfactors.toString()
    	numfactorsstr = numfactors.toString().replace(/,/g, ', ')

    	await interaction.reply('```' + numfactorsstr + '```')
	}
}