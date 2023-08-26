const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('digitsum')
		.setDescription('Calculate the sum of the digits of an integer')
		.addStringOption((option) => option
			.setName('number')
			.setDescription('The number you want to calculate the digit sum of')
			.setRequired(true)
		),

	async execute(interaction) {
		let number = interaction.options.getString('number')
		let final_sum = 0

		const allowed_chars = [
			'0', '1', '2',
			'3', '4', '5',
			'6', '7', '8',
			'9'
		]

		for (let character of number) {
			if (!allowed_chars.includes(character)) {
				await interaction.reply('`number` must be a number')
				return
			} else {
				final_sum += parseInt(character)
			}
		}

		await interaction.reply(final_sum.toString())
	}
}