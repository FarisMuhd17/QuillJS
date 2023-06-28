const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reciprocal')
		.setDescription('Find the reciprocal of a number')
		.addNumberOption((option) => option
			.setName('number')
			.setDescription('The number which you want to find the reciprocal of')
			.setRequired(true)
		),

	async execute(interaction) {
		let number = interaction.options.getNumber('number')

		if (number === 0) {
			await interaction.reply({ content: "# Error\nNumber cannot be 0", ephemeral: true })
			return
		}

		await interaction.reply((1 / number).toString())
	}
}