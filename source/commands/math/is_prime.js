const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('is_prime')
		.setDescription('Checks whether a number is prime or not')
		.addIntegerOption((option) => option
			.setName('number')
			.setDescription('The number to check')
			.setRequired(true)
		),

	async execute(interaction) {
		let number = interaction.options.getInteger('number')

		rt = number ** 0.5

		if (Math.floor(rt) === rt) {
			await interaction.reply(`**${number}** is __not__ prime`)
			return
		}
		for (let i = 2; i < Math.ceil(rt); i++) { if (number % i === 0) {
			await interaction.reply(`**${number}** is __not__ prime`)
			return
		}}

		await interaction.reply(`**${number}** is prime`)
	}
}