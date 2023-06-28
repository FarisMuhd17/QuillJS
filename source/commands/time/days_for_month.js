const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('days_for_month')
		.setDescription('Return the number of days for a month')
		.addIntegerOption((option) => option
			.setName('month')
			.setDescription('The month of which you want the number of days of')
			.setRequired(true)
			.addChoices(
				{ name: 'January', value: 1 },
				{ name: 'February', value: 2 },
				{ name: 'March', value: 3 },
				{ name: 'April', value: 4 },
				{ name: 'May', value: 5 },
				{ name: 'June', value: 6 },
				{ name: 'July', value: 7 },
				{ name: 'August', value: 8 },
				{ name: 'September', value: 9 },
				{ name: 'October', value: 10 },
				{ name: 'November', value: 11 },
				{ name: 'December', value: 12 }
			)
		),

	async execute(interaction) {
	    let month = interaction.options.getInteger('month')

	    if (month === 2) {
	    	await interaction.reply('28 (29 if leap year)')
	    } else if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
			await interaction.reply('31')
		} else {
			await interaction.reply('30')
		}
	}
}