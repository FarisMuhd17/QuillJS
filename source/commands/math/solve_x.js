const { SlashCommandBuilder } = require('discord.js')

function formatEquation(equation) {
    equation = equation
    	.replace(/ /g, '')
    	.replace(/\+\-/g, '-')
    	.replace(/\*/g, ' * ')
    	.replace(/ \*  \* /g, ' ** ')
    	.replace(/\+/g, ' + ')
    	.replace(/\//g, ' / ')
    	.replace(/-/g, ' - ')

    if (equation[0] === '+') {
        equation = equation.slice(2)
    }

    while (equation[0] === ' ') {
        equation = equation.slice(1)
    }

    if (equation[0] === '-') {
        equation = '-' + equation.slice(2)
    }

    return equation
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('solve_x')
		.setDescription('Solve for p(x) = n')
		.addStringOption((option) => option
			.setName('polynomial')
			.setDescription('The polynomial')
			.setRequired(true)
		)
		.addNumberOption((option) => option
			.setName('equal_to')
			.setDescription('What the result is equal to')
			.setRequired(true)
		),

	async execute(interaction) {
		let func = interaction.options.getString('polynomial')
		let equal_to = interaction.options.getNumber('equal_to')

		func = func.replace(/ /g, "")
		func = func.replace(/pi/g, "3.141592653589793")
		func = func.replace(/e/g, "2.718281828459045")
		func = func.replace(/tau/g, "6.283185307179586")
		func = func.replace(/euler_gamma/g, "0.5772156649015329")
		func = func.replace(/phi/g, "1.618033988749894")

		const allowed_chars = [
			'0', '1', '2',
			'3', '4', '5',
			'6', '7', '8',
			'9', 'x', '*',
			'+', '-', '/',
			'.', '(', ')'
		]

		for (let char of func) {
			if (!allowed_chars.includes(char)) {
				await interaction.reply(`\`${func}\` is invalid`)
				return
			}
		}

		let unsolvability_value = 10 * equal_to

		function f(n) {
			return eval(func.replaceAll('x', `(${n})`))
		}

		let lower_bound = 0
		let upper_bound = 0

		while (f(lower_bound) - equal_to > 0) {
			lower_bound--
			unsolvability_value--

			if (unsolvability_value === 0) {
				await interaction.reply('Unable to solve')
				return
			}
		}

		upper_bound = lower_bound
		unsolvability_value = 10 * equal_to

		while (f(upper_bound) - equal_to < 0) {
			upper_bound++
			unsolvability_value--

			if (unsolvability_value === 0) {
				await interaction.reply('Unable to solve')
				return
			}
		}

		let value = 0

		for (let i = 0; i < 1000; i++) {
			value = 0.5 * (lower_bound + upper_bound)

			if (f(value) - equal_to > 0) {
				upper_bound = value
			} else if (f(value) - equal_to < 0) {
				lower_bound = value
			} else break
		}

		func = formatEquation(func)

		await interaction.reply('```' + `${func} = ${equal_to}\n=> x = ${value}` + '```')
	}
}