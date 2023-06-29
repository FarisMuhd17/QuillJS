const { EmbedBuilder } = require('discord.js')
const path = require('path')
const fs = require('fs')

module.exports = {
	name: 'readfolder',
	async execute(client, message)  {
		if (message.content.length < 2) {
			await message.channel.send('# Error\nSyntax: readfolder path')
			return
		}

		let folder = ""
		for (let i = 1; i < message.content.split(' ').length; i++) {
			folder += message.content.split(' ')[i].replaceAll('DIRNAME', path.dirname(path.dirname(__dirname)))
		}
		
		if (!fs.existsSync(folder)) {
			await message.channel.send(`# Error\n'${folder}' does not exist`)
			return
		}

		fs.readdir(folder, (error, data) => {
			if (error) {
				console.error(error)
			} else {
				if (data.toString().replaceAll(',', '\n').length > 4000) {
					message.channel.send(`# Error\nContent is larger than 4000 characters (${data.toString().replaceAll(',', '\n').length})`)
				}

				message.channel.send({
					embeds: [new EmbedBuilder()
						.setTitle(folder)
						.setDescription(data.toString().replaceAll(',', '\n'))
						.setColor([31, 64, 194])
					]
				})
			}
		})
	}
}