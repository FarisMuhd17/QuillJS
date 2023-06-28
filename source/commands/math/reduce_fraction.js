const { SlashCommandBuilder } = require('discord.js')

function factors(number) {
	if (number === 1 || number === 0) {
		return [number]
	}

	let numfactors = []

	if (number < 0) {
		numfactors.push(-1)
		number *= -1
	}

	let org_num = number

	for (let i = 2; i <= org_num; i++) {
		while (number % i === 0) {
			numfactors.push(i)
			number /= i
		}

		if (number === 1) {
			break
		}
	}

	return numfactors.sort(function(a, b){return a-b})
}

function multiply_all(numbers) {
	let ans = 1
	for (let i = 0; i < numbers.length; i++) {
		ans *= numbers[i]
	}
	return ans
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reduce_fraction')
		.setDescription('Reduce a fraction by cancelling all its terms')
		.addIntegerOption((option) => option
			.setName('numerator')
			.setDescription('Numerator of the fraction')
			.setRequired(true)
		)
		.addIntegerOption((option) => option
			.setName('denominator')
			.setDescription('Denominator of the fraction')
			.setRequired(true)
		),

	async execute(interaction) {
		let numerator = interaction.options.getInteger('numerator')
		let denominator = interaction.options.getInteger('denominator')

		if (denominator === 0) {
			await interaction.reply({ content: "# Error\nInvalid fraction (Denominator cannot be 0)", ephemeral: true })
			return
		}

		if (numerator === 0) {
			await interaction.reply('0')
			return
		}

		let positive = true

		if (numerator < 0 && denominator > 0) {
			numerator *= -1
			positive = false
		}

		if (numerator > 0 && denominator < 0) {
			denominator *= -1
			positive = false
		}

		if (numerator < 0 && denominator < 0) {
			numerator *= -1
			denominator *= -1
		}

		let nfactors = factors(numerator)
		let dfactors = factors(denominator)

		for (let i = 0; i < nfactors.length; i++) {
			for (let j = 0; j < dfactors.length; j++) {
				if (nfactors[i] === dfactors[j]) {
					nfactors.splice(nfactors.indexOf(nfactors[i]), 1)
					dfactors.splice(dfactors.indexOf(dfactors[j]), 1)
				}
			}
		}

		if (positive) {
			await interaction.reply(`${multiply_all(nfactors)} / ${multiply_all(dfactors)}`)
		} else {
			await interaction.reply(`${multiply_all(nfactors) * -1} / ${multiply_all(dfactors)}`)
		}
	}
}