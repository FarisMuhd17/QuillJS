const { SlashCommandBuilder } = require('discord.js')
const path = require('path')
const fs = require('fs')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('saved_formulas')
		.setDescription('Use or save a formula to use later')
		.addStringOption((option) => option
			.setName('method')
			.setDescription('Whether you want to create or use an existing formula')
			.setRequired(true)
			.addChoices(
				{ name: 'List', value: 'list_formulas' },
				{ name: 'Use', value: 'use_formula' },
				{ name: 'Create', value: 'create_formula' },
				{ name: 'Delete', value: 'delete_formula' }
			)
		)
		.addStringOption((option) => option
			.setName('name')
			.setDescription('The name of the formula')
			.setRequired(true)
		)
		.addStringOption((option) => option
			.setName('inputs')
			.setDescription('The assigned values of the variables')
			.setRequired(true)
		),

	async execute(interaction) {
		let json_file = path.join(path.join(path.dirname(path.dirname(__dirname)), 'data'), 'saved_formulas.json')
		let formulas_data = require(json_file)
		if (!formulas_data[interaction.user.id]) formulas_data[interaction.user.id] = {}
		let user_formulas = formulas_data[interaction.user.id]
		let name = interaction.options.getString('name')
		let inputs = interaction.options.getString('inputs')

		let output = ''

		switch (interaction.options.getString('method')) {
			case 'list_formulas':
				if (Object.keys(user_formulas).length === 0) {
					output = 'You have not created any formulas yet'
					break
				}

				let formulas = Object.keys(user_formulas)
				for (let i = 0; i < Object.values(user_formulas).length; i++) {
					output += `- ${formulas[i]} = ${user_formulas[formulas[i]]}\n`
				}
				break

			case 'use_formula':
				if (!Object.keys(user_formulas).includes(name)) {
					output = `You have no formula named **${name}**`
					break
				}

				let func = user_formulas[name]
				func = func.replace(/ /g, "")
				func = func.replace(/pi/g, "3.141592653589793")
				func = func.replace(/e/g, "2.718281828459045")
				func = func.replace(/tau/g, "6.283185307179586")
				func = func.replace(/euler_gamma/g, "0.5772156649015329")
				func = func.replace(/phi/g, "1.618033988749894")

				inputs = inputs.replaceAll(' ', '')
				let input_terms = inputs.split(',')
				let inputs_obj = {}

				for (let i = 0; i < input_terms.length; i++) {
					let term = input_terms[i].split('=')
					if (term[0].length !== 1) {
						output = `Invalid input: ${input_terms[i]}`
						break
					}
					inputs_obj[term[0]] = term[1]
				}

				let expression = ''
				for (let i = 0; i < func.length; i++) {
					if (Object.keys(inputs_obj).includes(func[i])) {
						expression += inputs_obj[func[i]]
					} else {
						expression += func[i]
					}
				}

				let allowed_chars = [
					'0', '1', '2', 
					'3', '4', '5', 
					'6', '7', '8', 
					'9', '+', '-', 
					'*', '/', '(',
					')', '.'
				]

				for (let i = 0; i < expression.length; i++) {
					if (!allowed_chars.includes(expression[i])) {
						output = `Invalid character while computing: ${expression[i]} in expression: ${expression}`
						break
					}
				}

				output = eval(expression)
				break

			case 'create_formula':
				formulas_data[interaction.user.id][name] = inputs
				output = `Created **${name}** = ${inputs}`

				break

			case 'delete_formula':
				delete formulas_data[interaction.user.id][name]
				output = `Deleted **${name}**`

				break
		}

		await fs.writeFile(
			json_file,
			JSON.stringify(formulas_data, null, 4),
			'utf8',
			(error, data) => {
				if (error) {
					interaction.reply("An error occured")
				} else interaction.reply(output.toString())
			}
		)
	}
}