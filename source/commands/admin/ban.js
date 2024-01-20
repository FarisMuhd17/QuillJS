const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a user from the server')
		.addUserOption((option) => option
			.setName('user')
			.setDescription('The user you want to ban from the server')
			.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

	async execute(interaction) {
		let user = interaction.options.getUser('user')
		await interaction.guild.members.ban(user)

    	await interaction.reply(`**${user.tag}** has been banned from the server`)
	}
}