const { SlashCommandBuilder } = require('discord.js')
const pi = 3.141592653589793

module.exports = {
	data: new SlashCommandBuilder()
		.setName('angle_radian_conversion')
		.setDescription('Convert an angle to radian or vice versa')
		.addNumberOption((option) => option
			.setName('value')
			.setDescription('Radians or angle')
			.setRequired(true)
		)
		.addStringOption((option) => option
			.setName('convert_to')
			.setDescription('The type you want to convert to')
			.setRequired(true)
			.addChoices(
				{ name: 'Radians', value: 'radians' },
				{ name: 'Angles', value: 'angles' }
			)
		),

	async execute(interaction) {
		let value = interaction.options.getNumber('value')
		let convert_to = interaction.options.getString('convert_to')

		switch (convert_to) {
			case 'radians':
				await interaction.reply((value * pi / 180).toString())
				break

			case 'angles':
				await interaction.reply((180 * value / pi).toString())
				break
		}
	}
}