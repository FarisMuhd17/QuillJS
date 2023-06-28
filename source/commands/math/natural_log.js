const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('natural_log')
		.setDescription('Calculate the natural log of a positive rational number')
		.addNumberOption((option) => option
			.setName('number')
			.setDescription('The number of which you want to find the natural log of')
			.setRequired(true)
		),

	async execute(interaction) {
		let number = interaction.options.getNumber('number')

		if (number < 0) {
			await interaction.reply({ content: "# Error\nNumber must be a natural number", ephemeral: true })
			return
		}

		await interaction.reply((Math.log(number)).toString())
	}
}