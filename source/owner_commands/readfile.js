const path = require('path')
const fs = require('fs')

module.exports = {
	name: 'readfile',
	description: 'Read a local file',
	syntax: 'q.readfile path',
	async execute(args)  {
		let [client, message] = args

		if (message.content.length < 2) {
			await message.channel.send('# Error\nSyntax: readfile path')
			return
		}

		let file = ""
		for (let i = 1; i < message.content.split(' ').length; i++) {
			file += message.content.split(' ')[i].replaceAll('#', path.dirname(path.dirname(__dirname)))
		}
		
		if (!fs.existsSync(file)) {
			await message.channel.send(`# Error\n'${file}' does not exist`)
			return
		}

		fs.readFile(file, 'utf8', (error, data) => {
			if (error) {
				console.error(error)
			} else {
				if (data.length > 4000) {
					message.channel.send(`# Error\nContent is larger than 4000 characters (${data.length})`)
					return
				}

				if (file.includes('.')) {
					message.channel.send('```' + `${file.split('.')[1]}\n` + data + '```')
				} else {
					message.channel.send('```' + data + '```')
				}
			}
		})
	}
}