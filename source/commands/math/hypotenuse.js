const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hypotenuse')
		.setDescription('Find the hypotenuse of a right triangle given the length of the altitude and base')
		.addIntegerOption((option) => option
			.setName('altitude')
			.setDescription('Length of the altitude')
			.setRequired(true)
		)
		.addIntegerOption((option) => option
			.setName('base')
			.setDescription('Length of the base')
			.setRequired(true)
		),

	async execute(interaction) {
		let altitude = interaction.options.getInteger('altitude')
		let base = interaction.options.getInteger('base')

		let hypotenuse = (altitude ** 2 + base ** 2) ** .5

		await interaction.reply(hypotenuse.toString())
	}
}