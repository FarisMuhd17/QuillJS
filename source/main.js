const { Client, GatewayIntentBits, Routes, Collection } = require('discord.js')
const { REST } = require('@discordjs/rest')
const { config } = require('dotenv')
const fs = require('fs')
const path = require('path')

config()

const OWNER_ID = parseInt(process.env.OWNER_ID)
const TOKEN = process.env.TOKEN
const CLIENT_ID = process.env.CLIENT_ID

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers
	]
})

const rest = new REST({version: '10'}).setToken(TOKEN)
const commands = []

async function load_commands(guild) {
	try {
		const data = await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, guild.id),
			{ body: commands }
		)

		console.log(`Loaded ${data.length} : ${guild.name} | ${guild.id}`)
	} catch (error) {
		console.error(error)
	}
}

client.on('ready', () => {
	console.log(`[INFO] Launched as ${client.user.username}`)
	client.guilds.cache.forEach(guild => {
		(async () => {
			await load_commands(guild)
		})()
	})
})

client.on('messageCreate', (message) => {
	if (message.author.bot) return

	if (message.author.id == OWNER_ID) {
		switch (message.content) {
			case "q.stop":
				client.destroy()
				break

			case "q.guild_ids":
				console.log("Guild IDs:")
				client.guilds.cache[0].forEach(guild => {
					console.log(guild.id)
				})
				break

			case "q.guild_names":
				console.log("Guild Names:")
				client.guilds.cache[0].forEach(guild => {
					console.log(guild.name)
				})
				break			
		}
	}
})

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isChatInputCommand()) {return}

	let command = null

	for (let i = 0; i < commands.length; i++) {
		if (commands[i]['name'] === interaction.commandName) {
			command = commands[i]
		}
	}

	if (!command) {
		interaction.reply({ content: "# Error\nCommand not found", ephemeral: true })
		return
	}

	command.execute(interaction)
})

const foldersPath = path.join(__dirname, 'commands')
const commandFolders = fs.readdirSync(foldersPath)

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder)
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file)
		const command = require(filePath)

		if ('data' in command && 'execute' in command) {
			let command_data = command.data.toJSON()
			command_data["execute"] = command.execute

			commands.push(command_data)
		} else {
			console.warn(`${filePath} is missing 'data' or 'execute' property`)
		}
	}
}

try {
	client.login(TOKEN)
} catch (error) {
	console.error(error)
}
