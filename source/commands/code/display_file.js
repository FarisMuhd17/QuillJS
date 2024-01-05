const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('display_file')
		.setDescription('Display your file in an embed')
		.addAttachmentOption((option) => option
			.setName('file')
			.setDescription('The file you want to display')
			.setRequired(true)
		)
		.addStringOption((option) => option
			.setName('description')
			.setDescription('A description of the file (Not required)')
		),

	async execute(interaction) {
		let file = interaction.options.getAttachment('file')
		let desc = interaction.options.getString('description')
		if (!desc && file.description) desc = file.description
		if (!desc) desc = null

		await interaction.deferReply()

		fetch(file.attachment)
			.then(r => r.text())
			.then(file_data => {
				if (file_data.length > 3000) {
					interaction.editReply(`File too large: ${file_data.length} characters (max 3000)`)
					return
				}

				let embed = new EmbedBuilder()
					.setTitle(file.name)
					.setDescription(desc)
					.setURL(file.attachment)
					.setAuthor({
						name: interaction.user.username,
						iconURL: interaction.user.displayAvatarURL()
					})
					.setColor([31, 64, 194])
					.addFields(
						{ name: 'File size', value: `${file.size} bytes`, inline: true },
						{ name: 'Code', value: '```' + `${file.name.split('.')[-1]}\n` + file_data + '```', inline: false }
					)

				interaction.editReply({ embeds: [embed] })
			})
	}
}