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
		)
		.addNumberOption((option) => option
			.setName('x0')
			.setDescription('An approximate solution')
			.setRequired(true)
		),

	async execute(interaction) {
		let func = interaction.options.getString('polynomial')
		let equal_to = interaction.options.getNumber('equal_to')
		let x0 = interaction.options.getNumber('x0')

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

		function f(n) {
			return eval(func.replaceAll('x', `(${n})`) + `-${equal_to}`)
		}

		const dx = 10 ** -5
		function f_prime(n) {
			return (f(n + dx) - f(n)) / dx
		}

		let x_previous = x0
		let x_current = 0

		for (let i = 1; i < 100; i++) {
			x_current = x_previous - f(x_previous) / f_prime(x_previous)
			x_previous = x_current
		}

		func = formatEquation(func)

		await interaction.reply('```' + `${func} = ${equal_to}\n=> x = ${x_current}` + '```')
	}
}