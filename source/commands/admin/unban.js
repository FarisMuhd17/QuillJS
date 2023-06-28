const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Unban a user from the server')
		.addStringOption((option) => option
			.setName('user_id')
			.setDescription('The user ID you want to unban from the server')
			.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.UnbanMembers),

	async execute(interaction) {
		let user = interaction.options.getString('user_id')
		let bans = await interaction.guild.bans.fetch()
		let bannedUser = bans.find(ban => ban.user.id.toString() === user)

		if (bannedUser) {
			await interaction.guild.members.unban(bannedUser.user)
			await interaction.reply('User unbanned')
		} else {
			await interaction.reply('User not found')
		}
	}
}