const { EmbedBuilder } = require('discord.js')
const fs = require('fs')

module.exports = {
	name: 'help',
	description: 'List of commands or information on specific command',
	syntax: 'q.help ( optional: command_name )',
	async execute(args) {
		let [client, message] = args

		const owner_command_folder_contents = fs.readdirSync(__dirname)
			.filter(file => file.endsWith('.js'))

		if (message.content.split(' ').length === 1) {
			let files = ""

			for (file of owner_command_folder_contents) {
				if (file === 'help.js') continue
				files += file.replace('.js', '') + '\n'
			}

			await message.channel.send({ embeds: [new EmbedBuilder()
				.setDescription(files)
				.setColor([31, 64, 194])
			]})
		} else {
			let command_name = message.content.split(' ')[1]
			if (!owner_command_folder_contents.includes(command_name + '.js')) {
				await message.channel.send('Invalid command')
				return
			}

			let comm = require(`./${command_name}.js`)
			await message.channel.send({ embeds: [new EmbedBuilder()
				.setTitle(command_name)
				.setDescription(`**Description:** ${comm.description}\n**Syntax:** \`${comm.syntax}\``)
				.setColor([31, 64, 194])
			]})
		}
	}
}