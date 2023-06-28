const { SlashCommandBuilder } = require('discord.js')

const d_leap = [4, 1, 7, 4, 2, 6, 4, 1, 5, 3, 7, 5]
const d_not_leap = [3, 7, 7, 4, 2, 6, 4, 1, 5, 3, 7, 5]
const week_day_names = {
	0: "Sunday",
	1: "Monday",
	2: "Tuesday",
	3: "Wednesday",
	4: "Thursday",
	5: "Friday",
	6: "Saturday"
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('day_of_week')
		.setDescription('Return which day of the week it is on a day')
		.addIntegerOption((option) => option
			.setName('date')
			.setDescription('The date')
			.setRequired(true)
		)
		.addIntegerOption((option) => option
			.setName('month')
			.setDescription('The month')
			.setRequired(true)
		)
		.addIntegerOption((option) => option
			.setName('year')
			.setDescription('The year')
			.setRequired(true)
		),

	async execute(interaction) {
		let date = interaction.options.getInteger('date')
		let month = interaction.options.getInteger('month')
		let year = interaction.options.getInteger('year')
		let leap = year % 4 == 0
		let month_days

		if (date < 1 || month < 1 || year < 0) {
			await interaction.reply({ content: "# Error\nNumbers must be a natural number", ephemeral: true })
			return
		}

		if (year.toString().length != 4 && year.toString().length != 3) {
	        await interaction.reply({ content: "# Error\nYear must be in YYYY format", ephemeral: true })
        	return
    	}

    	if (month < 1 || month > 12) {
	        await interaction.reply({ content: "# Error\nMonth must be between 1 and 12", ephemeral: true })
	        return
	    }

		if (month === 2 && !leap) {
	        month_days = 28
		} else if (month == 2 && leap) {
	        month_days = 29
		} else if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
	        month_days = 31
		} else {
	        month_days = 30
		}

		if (date > month_days) {
	        await interaction.reply({ content: "# Error\nInvalid amount of days for month", ephemeral: true })
	        return
        }

        let century = Math.floor(year / 100)
	    let century_anchor = (5 * (century % 4) + 2) % 7
	    let centurian = year % 100
	    let centurian_m = centurian % 12
	    let d_day = (Math.floor(centurian / 12) + centurian_m + Math.floor(centurian_m / 4) + century_anchor) % 7
	    let day_anchor = 0

	    if (year % 4 != 0 || (centurian == 0 && year % 400 == 0)) {
	    	day_anchor = d_not_leap[month - 1]
	    } else {
	    	day_anchor = d_leap[month - 1]
	    }

	    await interaction.reply(week_day_names[(d_day + date - day_anchor) % 7])
	}
}