const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('code')
		.setDescription('Create an embed of your code')
		.addStringOption((option) => option
			.setName('filename')
			.setDescription('The name of the file')
			.setRequired(true)
		)
		.addStringOption((option) => option
			.setName('description')
			.setDescription('A description of your code')
			.setRequired(true)
		)
		.addStringOption((option) => option
			.setName('code')
			.setDescription('Your code (Each line must be seperated by your chosen seperator)')
			.setRequired(true)
		)
		.addStringOption((option) => option
			.setName('seperator')
			.setDescription('The string you want to use to seperate each line of your program')
			.setRequired(true)
		),

	async execute(interaction) {
		let filename = interaction.options.getString('filename')
		let description = interaction.options.getString('description')
		let code = interaction.options.getString('code')
		let seperator = interaction.options.getString('seperator')

		if (!filename.includes('.')) {
			await interaction.reply('# Error\nFilename is not valid')
			return
		}

		code = code.replaceAll(seperator, "\n")

		await interaction.reply({ embeds: [new EmbedBuilder()
			.setTitle(filename)
			.setDescription(description)
			.setAuthor({
				name: interaction.user.username,
				iconURL: interaction.user.displayAvatarURL()
			})
			.setColor([31, 64, 194])
			.addFields({ name: 'Code', value: '```' + `${filename.split('.')[-1]}\n` + code + '```', inline: true })
		]})
	}
}