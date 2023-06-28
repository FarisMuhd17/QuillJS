const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('herons_formula')
		.setDescription('Calculate the area of a triangle given the length of its three sides')
		.addIntegerOption((option) => option
			.setName('side_1')
			.setDescription('The length of the first side')
			.setRequired(true)
		)
		.addIntegerOption((option) => option
			.setName('side_2')
			.setDescription('The length of the second side')
			.setRequired(true)
		)
		.addIntegerOption((option) => option
			.setName('side_3')
			.setDescription('The length of the third side')
			.setRequired(true)
		),

	async execute(interaction) {
		let side_1 = interaction.options.getInteger('side_1')
		let side_2 = interaction.options.getInteger('side_2')
		let side_3 = interaction.options.getInteger('side_3')

		if (side_1 < 1 || side_2 < 1 || side_3 < 1) {
			await interaction.reply({ content: "# Error\nNumber must be a natural number", ephemeral: true })
			return
		}

		let semi_perimeter = (side_1 + side_2 + side_3) / 2

		let area = (semi_perimeter * (semi_perimeter - side_1) * (semi_perimeter - side_2) * (semi_perimeter - side_3)) ** .5

		await interaction.reply(area.toString())
	}
}