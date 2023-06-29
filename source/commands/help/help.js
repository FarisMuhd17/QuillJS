const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const path = require('path')
const fs = require('fs')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Help command')
		.addStringOption((option) => option
			.setName('type')
			.setDescription('The type of commands you want')
			.setRequired(true)
			.addChoices(
				{ name: 'Admin', value: 'admin' },
				{ name: 'Chess', value: 'chess' },
				{ name: 'Code', value: 'code' },
				{ name: 'Math', value: 'math' },
				{ name: 'Misc', value: 'misc' },
				{ name: 'Random', value: 'random' },
				{ name: 'Science', value: 'science' },
				{ name: 'Time', value: 'time' }
			)
		),

	async execute(interaction) {
		const commandsFolder = path.dirname(__dirname)
		const commandsSubfolders = fs.readdirSync(commandsFolder)

		let files = ""

		for (folder of commandsSubfolders) {
			if (folder === interaction.options.getString('type')) {
				const typeFolder = path.join(commandsFolder, folder)
				files = fs.readdirSync(typeFolder)
					.filter(file => file.endsWith('.js')).toString()
					.replaceAll('.js', '')
					.replaceAll(',', '\n')
				break
			}
		}

		let embed = new EmbedBuilder()
			.setTitle(interaction.options.getString('type').toUpperCase())
			.setDescription(files)
			.setColor([31, 64, 194])
			.setAuthor({
				name: interaction.user.username,
				iconURL: interaction.user.displayAvatarURL()
			})

		await interaction.reply({ embeds: [embed], ephemeral: true })
	}
}