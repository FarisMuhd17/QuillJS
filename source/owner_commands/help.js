const { EmbedBuilder } = require('discord.js')
const fs = require('fs')
const path = require('path')

module.exports = {
	name: 'help',
	async execute(client, message) {
		const owner_command_folder_contents = fs.readdirSync(__dirname)
			.filter(file => file.endsWith('.js'))

		let files = ""

		for (file of owner_command_folder_contents) {
			if (file === 'help.js') continue
			files += file.replace('.js', '') + '\n'
		}

		await message.channel.send({
			embeds: [new EmbedBuilder()
				.setDescription(files)
				.setColor([31, 64, 194])]
		})
	}
}