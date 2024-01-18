const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')
const { ActionRowBuilder } = require('@discordjs/builders')
const path = require('path')
const fs = require('fs')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('saved_formulas')
		.setDescription('Use or save a formula to use later')
		.addSubcommand((subcommand) => subcommand
			.setName('list')
			.setDescription('List out all your existing formulas')
		)
		.addSubcommand((subcommand) => subcommand
			.setName('read')
			.setDescription('Read the script of a formula')
			.addStringOption((option) => option
				.setName('name')
				.setDescription('Name of the script')
				.setRequired(true)
			)
		)
		.addSubcommand((subcommand) => subcommand
			.setName('use')
			.setDescription('Use an existing formula')
			.addStringOption((option) => option
				.setName('name')
				.setDescription('The name of the formula')
				.setRequired(true)
			)
			.addStringOption((option) => option
				.setName('inputs')
				.setDescription('Inputs seperated by commas')
				.setRequired(true)
			)
		)
		.addSubcommand((subcommand) => subcommand
			.setName('add')
			.setDescription('Create an save a new formula')
		)
		.addSubcommand((subcommand) => subcommand
			.setName('delete')
			.setDescription('Delete an existing formula')
			.addStringOption((option) => option
				.setName('name')
				.setDescription('The name of the formula you want to delete')
				.setRequired(true)
			)
		),

	async execute(interaction) {
		let json_file = path.join(path.join(path.dirname(path.dirname(__dirname)), 'data'), 'saved_formulas.json')
		let formulas_data = require(json_file)
		if (!formulas_data[interaction.user.id]) formulas_data[interaction.user.id] = {}
		let user_formulas = formulas_data[interaction.user.id]

		switch (interaction.options.getSubcommand()) {
			case 'list':
				if (Object.keys(user_formulas).length === 0) {
					await interaction.reply('You have not created any formulas yet')
					break
				}

				let output = ''
				let formulas = Object.keys(user_formulas)
				for (let i = 0; i < Object.values(user_formulas).length; i++) {
					output += `- ${formulas[i]}\n`
				}

				await interaction.reply(output)

				break

			case 'read':
				let name = interaction.options.getString('name')
				if (!Object.keys(user_formulas).includes(name)) {
					await interaction.reply(`You have no formula named **${name}**`)
					break
				}

				await interaction.reply(`**${name}:**` + '```' + user_formulas[name]['script'] + '```' + 'Variables:' + '```' + user_formulas[name]['variables'] + '```')
				break

			case 'use':
				let scriptName = interaction.options.getString('name')
				let inputs = interaction.options.getString('inputs').replaceAll(' ', '')

				if (!Object.keys(user_formulas).includes(scriptName)) {
					await interaction.reply(`You have no formula named **${scriptName}**`)
					break
				}

				let formulaInputs = {}
				for (let term of inputs.split(',')) {
					let term_parts = term.split('=')

					if (isNaN(parseFloat(term_parts[1]))) {
						await interaction.reply('All inputs to variables must be a number')
						return
					}

					if (!user_formulas[scriptName]['variables'].includes(term_parts[0])) {
						await interaction.reply(`Invalid input: \`${term_parts[0]}=${term_parts[1]}\``)
						return
					}

					formulaInputs[term_parts[0]] = parseFloat(term_parts[1])
				}

				let script = user_formulas[scriptName]['script']

				let out = ''
				for (let line of script.split('\n')) {
					let nextLineTrue = !line.endsWith('CONT')
					line = line.replaceAll('CONT', '')

					if (line.startsWith('text')) {
						let l = line.replace('text:', '')
						for (let variable of Object.keys(formulaInputs)) {
							if (l.includes(`VAR:${variable}`)) {
								l = l.replaceAll(`VAR:${variable}`, formulaInputs[variable])
							}
						}

						out += nextLineTrue ? l + '\n' : l

					} else if (line.startsWith('eqnt')) {
						line = line.replaceAll(' ', '')
						line = line.replace('eqnt:', '')
						line = line.replace(/pi/g, "3.141592653589793")
						line = line.replace(/e/g, "2.718281828459045")
						line = line.replace(/tau/g, "6.283185307179586")
						line = line.replace(/euler_gamma/g, "0.5772156649015329")
						line = line.replace(/phi/g, "1.618033988749894")

						let allowed_chars = [
							'0', '1', '2', 
							'3', '4', '5', 
							'6', '7', '8', 
							'9', '+', '-', 
							'*', '/', '%', 
							'(', ')', '.'
						]

						let l = ''
						for (let char of line) {
							if (allowed_chars.includes(char)) {
								l += char
							} else if (user_formulas[scriptName]['variables'].includes(char)) {
								if (Object.keys(formulaInputs).includes(char)) {
									l += formulaInputs[char]
								} else {
									await interaction.reply(`Unkown variable: \`${char}\``)
									return
								}
							} else {
								await interaction.reply(`Invalid character: \`${char}\``)
								return
							}
						}

						out += nextLineTrue ? eval(l).toString() + '\n' : eval(l).toString()

					} else {
						await interaction.reply('Invalid script')
						break
					}
				}

				await interaction.reply(out)
				break

			case 'add':
				let inputModal = new ModalBuilder()
					.setCustomId('saved_formulas-inputModal-add')
					.setTitle('New formula')

				let nameInput = new TextInputBuilder()
					.setCustomId('nameInput')
					.setLabel('Name')
					.setStyle(TextInputStyle.Short)

				let variablesInput = new TextInputBuilder()
					.setCustomId('variablesInput')
					.setLabel('Variables')
					.setStyle(TextInputStyle.Short)

				let scriptInput = new TextInputBuilder()
					.setCustomId('scriptInput')
					.setLabel('Script')
					.setStyle(TextInputStyle.Paragraph)

				inputModal.addComponents(
					new ActionRowBuilder().addComponents(nameInput),
					new ActionRowBuilder().addComponents(variablesInput),
					new ActionRowBuilder().addComponents(scriptInput)
				)

				await interaction.showModal(inputModal)

				break

			case 'delete':
				let scriptToDeleteName = interaction.options.getString('name')

				delete formulas_data[interaction.user.id][scriptToDeleteName]
				await fs.writeFile(
					json_file,
					JSON.stringify(formulas_data, null, 4),
					'utf8',
					(error, data) => {
						if (error) {
							interaction.reply('An error occured: Try again later')
						} else interaction.reply(`Delete **${scriptToDeleteName}**`)
					}
				)

				break
		}
	},

	async respondModal(interaction) {
		let scriptName = interaction.fields.getTextInputValue('nameInput')
		let scriptVariables = interaction.fields.getTextInputValue('variablesInput').replaceAll(' ', '')
		let script = interaction.fields.getTextInputValue('scriptInput')

		for (let line of script.split('\n')) {
			if (!(line.startsWith('text:') || line.startsWith('eqnt:'))) {
				console.log(line)

				await interaction.reply('Invalid script: Lines must begin with either `text` or `eqnt`:' + '```' + script + '```')
				return
			}
		}

		for (let variable of scriptVariables.split(',')) {
			if (variable.length !== 1) {
				await interaction.reply(`Invalid script: All variables must be 1 character long: \`${variable}\``)
				return
			}
		}

		let json_file = path.join(path.join(path.dirname(path.dirname(__dirname)), 'data'), 'saved_formulas.json')
		let json_data = require(json_file)

		json_data[interaction.user.id][scriptName] = {
			'script': script,
			'variables': scriptVariables.split(',')
		}

		await fs.writeFile(
			json_file,
			JSON.stringify(json_data, null, 4),
			'utf8',
			(error, data) => {
				if (error) {
					interaction.reply("An error occured")
				} else interaction.reply(`Succesfully saved \`${scriptName}\` as:` + '```' + script + '```')
			}
		)
	}
}