const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('Create an elegant embed')
		.addStringOption((option) => option
			.setName('title')
			.setDescription('The title of the embed')
		)
		.addStringOption((option) => option
			.setName('description')
			.setDescription('The description of the embed')
		)
		.addStringOption((option) => option
			.setName('image')
			.setDescription('The larger image at the bottom of the embed')
		)
		.addStringOption((option) => option
			.setName('thumbnail')
			.setDescription('The smaller image at the top-right of the embed')
		)
		.addStringOption((option) => option
			.setName('footer')
			.setDescription('The footer of the embed')
		)
		.addStringOption((option) => option
			.setName('url')
			.setDescription('Set a URL to the title of the embed')
		),

	async execute(interaction) {
		let title = interaction.options.getString('title') ?? null
		let desc = interaction.options.getString('description') ?? null
		let image = interaction.options.getString('image') ?? null
		let thumbnail = interaction.options.getString('thumbnail') ?? null
		let footer = interaction.options.getString('footer') ?? null
		let url = interaction.options.getString('url') ?? null

		let embed = new EmbedBuilder()
			.setTitle(title)
			.setDescription(desc)
			.setImage(image)
			.setThumbnail(thumbnail)
			.setURL(url)
			.setAuthor({
				name: interaction.user.username,
				iconURL: interaction.user.displayAvatarURL()
			})
			.setFooter({
				text: footer
			})
			.setColor([31, 64, 194])

		await interaction.reply({ embeds: [embed] })
	}
}