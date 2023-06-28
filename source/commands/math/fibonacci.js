const { SlashCommandBuilder } = require('discord.js')

function add_floats(float1, float2) {
	let fstr1 = float1.toString()
	let fstr2 = float2.toString()

	let fdlen1 = 0
	let fdlen2 = 0

	if (fstr1.includes('.')) {
		fdlen1 = (fstr1.split('.')[1]).length
	}

	if (fstr2.includes('.')) {
		fdlen2 = (fstr2.split('.')[1]).length
	}

	let afterd = 0

	if (fdlen1 != fdlen2) {
		if (fdlen1 > fdlen2) {
			afterd = fdlen1
		}

		else if (fdlen2 > fdlen1) {
			afterd = fdlen2
		}
	} else {
		afterd = fdlen1
	}

	return (float1 * 10 ** afterd + float2 * 10 ** afterd) / 10 ** afterd
}

function sub_floats(float1, float2) {
	let fstr1 = float1.toString()
	let fstr2 = float2.toString()

	let fdlen1 = 0
	let fdlen2 = 0

	if (fstr1.includes('.')) {
		fdlen1 = (fstr1.split('.')[1]).length
	}

	if (fstr2.includes('.')) {
		fdlen2 = (fstr2.split('.')[1]).length
	}

	let afterd = 0

	if (fdlen1 != fdlen2) {
		if (fdlen1 > fdlen2) {
			afterd = fdlen1
		}

		else if (fdlen2 > fdlen1) {
			afterd = fdlen2
		}
	} else {
		afterd = fdlen1
	}

	return (float1 * 10 ** afterd - float2 * 10 ** afterd) / 10 ** afterd
}

const phi = add_floats(1, 5 ** .5) / 2

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fibonacci')
		.setDescription('Find the fibonacci at the inputted number')
		.addIntegerOption((option) => option
			.setName('number')
			.setDescription('Must be a natural number')
			.setRequired(true)
		),

	async execute(interaction) {
		let number = interaction.options.getInteger('number')

		if (number < 0) {
			await interaction.reply({ content: "# Error\nNumber must be a natural number", ephemeral: true })
			return
		}
		await interaction.reply((Math.round((sub_floats(phi ** number, (-phi) ** (-number))) / 5 ** .5)).toString())
	}
}
