const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ci_amount')
		.setDescription('Calculate the amount in a compound intrest yearly, half-yearly, or quarter-yearly')
		.addStringOption((option) => option
			.setName('type')
			.setDescription('Yearly, Half yearly, Quarter yearly')
			.setRequired(true)
			.addChoices(
				{ name: 'Yearly', value: 'yearly' },
				{ name: 'Half yearly', value: 'half' },
				{ name: 'Quarter yeraly', value: 'quarter' }
			)
		)
		.addIntegerOption((option) => option
			.setName('principle')
			.setDescription('The principle of the compound intrest')
			.setRequired(true)
		)
		.addIntegerOption((option) => option
			.setName('rate')
			.setDescription('The rate of the compound intrest')
			.setRequired(true)
		)
		.addIntegerOption((option) => option
			.setName('time')
			.setDescription('The time for the compound intrest')
			.setRequired(true)
		),

	async execute(interaction) {
		let principle = interaction.options.getInteger('principle')
		let rate = interaction.options.getInteger('rate')
		let time = interaction.options.getInteger('time')

		switch (interaction.options.getString('type')) {
			case 'yearly':
				await interaction.reply((principle * (1 + rate / 100) ** time).toString())
				break

			case 'half':
				await interaction.reply((principle * (1 + rate / 200) ** (2 * time)).toString())
				break

			case 'quarter':
				await interaction.reply((principle * (1 + rate / 400) ** (4 * time)).toString())
				break
		}
	}
}