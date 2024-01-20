const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a user from the server')
		.addUserOption((option) => option
			.setName('user')
			.setDescription('The user you want to kick from the server')
			.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

	async execute(interaction) {
		let user = interaction.options.getUser('user')
		let member = interaction.guild.members.cache.get(user.id)
		await member.kick()

    	await interaction.reply(`**${user.tag}** has been kicked from the server`)
	}
}