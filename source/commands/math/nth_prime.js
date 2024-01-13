const { SlashCommandBuilder } = require('discord.js')
const path = require('path')
const primes = require(path.join(path.join(path.dirname(path.dirname(__dirname)), 'data'), 'primes.json'))

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nth_prime')
		.setDescription('Find the nth prime number')
		.addIntegerOption((option) => option
			.setName('index')
			.setDescription('The index of the prime number you want. Must be a positive integer less than or equal to a 1,000,000')
			.setRequired(true)
		),

	async execute(interaction) {
		let index = interaction.options.getInteger('index') - 1

		if (index < 0 || index > 1000000) {
			await interaction.reply(`**${index + 1}** an invalid index. Must be a positive integer less than 1,000,000.`)
			return
		}

		await interaction.reply(primes['primes'][index].toString())
	}
}