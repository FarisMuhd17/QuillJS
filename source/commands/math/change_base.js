const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('change_base')
		.setDescription('Change the base of a number from base 10 to any base')
		.addIntegerOption((option) => option
			.setName('number')
			.setDescription('The number in base 10')
			.setRequired(true)
		)
		.addIntegerOption((option) => option
			.setName('base')
			.setDescription('The base you want to change to')
			.setRequired(true)
		),

	async execute(interaction) {
		let number = interaction.options.getInteger('number')
		let base = interaction.options.getInteger('base')

		if (base < 2) {
			await interaction.reply({ content: "# Error\nBase must be a greater than 1", ephemeral: true })
			return
		}

		await interaction.reply(number.toString(base))
	}
}