const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')
const { ActionRowBuilder } = require('@discordjs/builders')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('display_code')
		.setDescription('Create an embed of your code'),

	async execute(interaction) {
		let inputsModal = new ModalBuilder()
			.setCustomId('code-inputModal')
			.setTitle('Inputs')
		
		let fileTypeInput = new TextInputBuilder()
			.setCustomId('fileTypeInput')
			.setLabel('File Type (example: py, js, c, ...)')
			.setStyle(TextInputStyle.Short)

		let codeInput = new TextInputBuilder()
			.setCustomId('codeInput')
			.setLabel('Script')
			.setStyle(TextInputStyle.Paragraph)

		let fileTypeInputActionRow = new ActionRowBuilder().addComponents(fileTypeInput)
		let codeInputActionRow = new ActionRowBuilder().addComponents(codeInput)

		inputsModal.addComponents(
			fileTypeInputActionRow,
			codeInputActionRow
		)

		await interaction.showModal(inputsModal)
	},

	async respondModal(interaction) {
		let fileType = interaction.fields.getTextInputValue('fileTypeInput')
		let code = interaction.fields.getTextInputValue('codeInput')

		await interaction.reply({ embeds: [new EmbedBuilder()
			.setAuthor({
				name: interaction.user.username,
				iconURL: interaction.user.displayAvatarURL()
			})
			.setColor([31, 64, 194])
			.addFields({ name: `File type: ${fileType}`, value: '```' + `${fileType}\n${code}` + '```', inline: true })
		]})
	}
}