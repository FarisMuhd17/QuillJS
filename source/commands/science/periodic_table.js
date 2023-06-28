const { SlashCommandBuilder } = require('discord.js')
const path = require('path')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('periodic_table')
		.setDescription('Give you an image of the periodic table'),

	async execute(interaction) {
		parent_parent_folder = path.dirname(path.dirname(__dirname))
		await interaction.reply({ files: [parent_parent_folder + "/assets/periodic_table.png"] })
	}
}