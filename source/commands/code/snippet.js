const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const fs = require('fs')
const path = require('path')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('snippet')
		.setDescription('Get a code snippet in your preferred language')
		.addStringOption((option) => option
			.setName('language')
			.setDescription('The language you want the output to be in')
			.setRequired(true)
			.addChoices(
				{ name: 'Python', value: 'py' },
				{ name: 'JavaScript', value: 'js' }
			)
		)
		.addStringOption((option) => option
			.setName('code')
			.setDescription('The code snippet you want')
			.setRequired(true)
			.addChoices(
				{ name: 'Get all files and folders in a directory', value: 'code1' },
				{ name: 'Search for a file or folder in a directory', value: 'code2' }
			)
		),

	async execute(interaction) {
		let language = interaction.options.getString('language')
		let code = interaction.options.getString('code')

		let code_snippets_folder = path.join(path.dirname(path.dirname(__dirname)), 'code_snippets')
		let code_file = path.join(code_snippets_folder, `${code}_${language}.txt`)

		fs.readFile(code_file, (error, data) => {
			if (error) {
				interaction.reply({ content: 'An error occurred', ephemeral: true })
				console.log(code_file)
				console.log(error)
			} else {
				let embed = new EmbedBuilder()
					.setTitle("Code snippet")
					.setDescription('```' + `${language}\n` + data + '```')
					.setAuthor({
						name: interaction.user.username,
						iconURL: interaction.user.displayAvatarURL()
					})
					.setColor([31, 64, 194])

				interaction.reply({ embeds: [embed] })
			}
		})
	}
}