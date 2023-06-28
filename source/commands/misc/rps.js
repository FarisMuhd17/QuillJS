const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rps')
		.setDescription('Play rock, paper, scissors against the bot')
		.addStringOption((option) => option
			.setName('choice')
			.setDescription('Your choice')
			.setRequired(true)
			.addChoices(
				{ name: 'Rock', value: 'rock' },
				{ name: 'Paper', value: 'paper' },
				{ name: 'Scissors', value: 'scissor' }
			)
		),

	async execute(interaction) {
		let choice = interaction.options.getString('choice')
		let list = ["rock", "paper", "scissor"]
		let bot_choice = (list[Math.floor(Math.random() * list.length)])

		let outcome

		switch (choice) {
			case 'rock':
				switch (bot_choice) {
					case 'rock':
						outcome = 1
						break

					case 'paper':
						output = 0
						break

					case 'scissor':
						output = 2
						break
				}
				break

			case 'paper':
				switch (bot_choice) {
					case 'rock':
						outcome = 2
						break

					case 'paper':
						outcome = 1
						break

					case 'scissor':
						outcome = 0
						break
				}
				break

			case 'scissor':
				switch (bot_choice) {
					case 'rock':
						outcome = 0
						break

					case 'paper':
						outcome = 2
						break

					case 'scissor':
						outcome = 1
						break
				}
				break
		}

		let output_result

		switch (outcome) {
			case 0:
				output_result = "lost"
				break

			case 1:
				output_result = "drew"
				break

			case 2:
				output_result = "won"
				break
		}

		await interaction.reply(`Bot chose ${bot_choice}, you **${output_result}**`)
	}
}