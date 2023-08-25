const { SlashCommandBuilder } = require('discord.js')

function factorial(n) {
	if (n === 0 || n === 1) {
		return 1;
	}
	return n * factorial(n - 1);
}

function allEqualInArray(inputArray) {
	for (let i = 1; i < inputArray.length; i++) {
		if (inputArray[i] !== inputArray[i - 1]) {
			return false
		}
	}
	return true
}

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

function findFormula(inputs) {
    function recursiveGet(inputValues) {
        let polynomialDegree = 0
        let tList = inputValues
        while (!allEqualInArray(tList)) {
            let t2List = []
            polynomialDegree++

            for (let i = 1; i < tList.length; i++) {
                t2List.push(tList[i] - tList[i - 1])
            }

            tList = t2List
        }

        if (polynomialDegree === 0) {
            return ''
        }

        let commonAdditive = tList[0]
        let coefficient = commonAdditive / factorial(polynomialDegree)
        let equation = `+ ${coefficient !== 1 ? coefficient + '*' : ''} x ${polynomialDegree !== 1 ? '** ' + polynomialDegree.toString() : ''} `

        let newValues = []
        for (let i = 0; i < inputValues.length - 1; i++) {
            let eqnt = equation.replaceAll(' ', '').replaceAll('x', i + 1)
            eqnt = eqnt.substring(1)
            newValues.push(inputValues[i] - eval(eqnt))
        }

        if (allEqualInArray(newValues)) {
            return equation
        } else {
            return equation + recursiveGet(newValues)
        }
    }

    let result = recursiveGet(inputs)
        .replaceAll(' ', '')
        .slice(1)

    let constant = inputs[0] - eval(result.replaceAll('x', 1))

    if (parseInt(constant) === 0) {
        return formatEquation(result)
    }

    return formatEquation(`${result} + ${constant}`)
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('polynomial_from_outputs')
		.setDescription('Create a polynomial from the given inputs')
		.addStringOption((option) => option
			.setName('outputs')
			.setDescription('The outputs produced by the polynomial, p(x), from p(1) to p(n)')
			.setRequired(true)
		),

	async execute(interaction) {
		let outputs = interaction.options.getString('outputs')
			.replaceAll(' ', '')
			.split(',')

		outputs = outputs.map(str => {
            return parseInt(str, 10);
        })

		await interaction.reply('```' + findFormula(outputs) + '```')
	}
}