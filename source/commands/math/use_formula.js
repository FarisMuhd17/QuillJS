const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('use_formula')
		.setDescription('Use a formula with inputted values')
		.addStringOption((option) => option
			.setName('formula')
			.setDescription('The formula you want to use')
			.setRequired(true)
		)
		.addStringOption((option) => option
			.setName('values')
			.setDescription('The values you want to input to the formula using "=" and seperated using commas')
			.setRequired(true)
		),

	async execute(interaction) {
		let formula = interaction.options.getString('formula')
		let values = interaction.options.getString('values')

		formula = formula.toLowerCase()
		values = values.toLowerCase()

		formula = formula.replace(/ /g, "")
		values = values.replace(/ /g, "")

		formula = formula.replace(/pi/g, "3.141592653589793")
		formula = formula.replace(/e/g, "2.718281828459045")
		formula = formula.replace(/tau/g, "6.283185307179586")
		formula = formula.replace(/euler_gamma/g, "0.5772156649015329")
		formula = formula.replace(/phi/g, "1.618033988749894")

		values = values.replace(/pi/g, "3.141592653589793")
		values = values.replace(/e/g, "2.718281828459045")
		values = values.replace(/tau/g, "6.283185307179586")
		values = values.replace(/euler_gamma/g, "0.5772156649015329")
		values = values.replace(/phi/g, "1.618033988749894")

		numlist = values.split(',')

		numdict = {}

		for (setting of numlist) {
			numdict[setting.split('=')[0]] = setting.split('=')[1]
		}

		for (character of formula) {
			if (numdict[character] !== undefined) {
				formula = formula.replace(character, numdict[character])
			}
		}

		let allowed_chars = [
			'0', '1', '2', 
			'3', '4', '5', 
			'6', '7', '8', 
			'9', '+', '-', 
			'*', '/', '(',
			')', '.', ' ',
			'='
		]

		for (character of formula) {
			if (!allowed_chars.includes(character)) {
				await interaction.reply(`\`${formula}\` is an invalid formula\nValue of \`${character}\` is unknown`)
				return
			}
		}

		if (formula.includes('=')) {
			await interaction.reply(`${eval(formula.replace('=', '==='))} (${eval(formula.split('=')[0])})`)
			return
		}

		await interaction.reply(eval(formula).toString())
	}
}