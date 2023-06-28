// 

const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('randoption')
		.setDescription('Choose a random option from a list of option seperated by commas')
		.addStringOption((option) => option
			.setName('list')
			.setDescription('Seperate by commas')
			.setRequired(true)
		),

	async execute(interaction) {
		let list = interaction.options.getString('list').split(',')
		await interaction.reply(list[Math.floor(Math.random() * list.length)])
	}
}