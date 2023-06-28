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

module.exports = {
	data: new SlashCommandBuilder()
		.setName('twonum')
		.setDescription('Find two numbers that fits the category')
		.addStringOption((option) => option
			.setName('category')
			.setDescription('The category for the two numbers')
			.setRequired(true)
			.addChoices(
				{ name: 'Number 1: Sum | Number 2 : Difference', value: 'sum_difference' },
				{ name: 'Number 1: Product | Number 2: Quotient', value: 'product_quotient' },
				{ name: 'Number 1: Sum | Number 2: Product', value: 'sum_product' }
			)
		)
		.addIntegerOption((option) => option
			.setName('number1')
			.setDescription('First number')
			.setRequired(true)
		)
		.addIntegerOption((option) => option
			.setName('number2')
			.setDescription('Second number')
			.setRequired(true)
		),

	async execute(interaction) {
		let number1 = interaction.options.getInteger('number1')
		let number2 = interaction.options.getInteger('number2')

		switch (interaction.options.data[0].value) {
			case 'sum_difference':
    			await interaction.reply(`a: ${.5 * (number1 + number2)}\nb: ${.5 * (number1 - number2)}`)
    			break

    		case 'product_quotient':
			    await interaction.reply(`a: ${(number1 * number2) ** .5}\nb: ${(number1 / number2) ** .5}`)
			    break

			case 'sum_product':
			    await interaction.reply(`a: ${0.5 * add_floats(number1, sub_floats(number1 ** 2, 4 * number2) ** 0.5)}\nb: ${0.5 * sub_floats(number1, sub_floats(number1 ** 2, 4 * number2) ** 0.5)}`)
			    break
		}
	}
}