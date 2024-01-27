const fs = require('fs')
const path = require('path')

module.exports = {
	async set_allowed(client, message) {
		let allowed_commands_json = require('./allowed_commands.json')

		message_content = message.content.toLowerCase()
		let split_message = message_content.split(' ')

		let command_types = fs.readdirSync(path.join(__dirname, 'commands'))

		if (
			!command_types.includes(split_message[1]) ||
			!['true', 'false'].includes(split_message[2])
		) return

		if (!allowed_commands_json[message.guild.id]) {
			allowed_commands_json[message.guild.id] = {}

			for (let i = 0; i < command_types.length; i++) {
				allowed_commands_json[message.guild.id][command_types[i]] = true
			}
		}

		allowed_commands_json[message.guild.id][split_message[1]] = (split_message[2] === 'true')

		await fs.writeFile(
			path.join(__dirname, 'allowed_commands.json'),
			JSON.stringify(allowed_commands_json, null, 4),
			'utf8',
			(error, data) => {
				if (error) {
					message.channel.send(`An error occured: \`${error}\``)
				} else message.channel.send(`:white_check_mark: Succesfully set **${split_message[1]}** to **${split_message[2]}**`)
			}
		)
	},

	async read_allowed(client, message) {
		let allowed_commands_data = require('./allowed_commands.json')[message.guild.id]
		let msg = ''

		let allowed = []
		let not_allowed = []

		for (let key of Object.keys(allowed_commands_data)) {
			if (allowed_commands_data[key]) {
				allowed.push(key)
			} else {
				not_allowed.push(key)
			}
		}

		if (allowed.length !== 0) {
			msg += 'Enabled commands:\n'
			for (let cmd of allowed) { msg += `- ${cmd}\n` }
		}

		if (not_allowed.length !== 0) {
			msg += '\nDisabled commands:\n'
			for (let cmd of not_allowed) { msg += `- ${cmd}\n` }
		}

		await message.channel.send('```' + msg + '```')
	}
}