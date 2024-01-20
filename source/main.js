const { Client, GatewayIntentBits, Routes, Collection, EmbedBuilder } = require('discord.js')
const { REST } = require('@discordjs/rest')
const { config } = require('dotenv')
const fs = require('fs')
const path = require('path')

config()

const OWNER_ID = parseInt(process.env.OWNER_ID)
const TOKEN = process.env.TOKEN
const CLIENT_ID = process.env.CLIENT_ID
const CONSOLE_CHANNEL_ID = process.env.CONSOLE_CHANNEL_ID

const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildMembers
]})

const rest = new REST({ version: '10' }).setToken(TOKEN)

const commands = []
const owner_commands = []
const command_types = {}
const allow_command = require('./allow_command.js')
let help_command = null

const allowed_commands = require('./allowed_commands.json')

async function load_command(guild) {
	try {
		let guild_commands = []

		if (allowed_commands[guild.id]) {
			commands.forEach(comm => {
				if (allowed_commands[guild.id][command_types[comm.name]]) {
					guild_commands.push(comm)
				}
			})

			guild_commands.push(help_command)
		} else {
			guild_commands = commands
		}

		const data = await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, guild.id),
			{ body: guild_commands }
		)

		console.log(`[LOADED ${data.length}] ${guild.id}`)
	} catch (error) {
		console.error(`[LOAD-ERROR] ${error}`)
	}
}

client.on('ready', () => {
	console.log(`[INFO] Launched as ${client.user.username}#${client.user.discriminator}\n`)

	client.guilds.cache.forEach(guild => {
		(async () => {
			await load_command(guild)
		})()
	})

	let now = new Date()
	client.channels.cache.get(CONSOLE_CHANNEL_ID).send(`**Online:** ${now.getUTCDate()}/${now.getUTCMonth()}/${now.getUTCFullYear()}-${now.getUTCHours()}:${now.getUTCMinutes()}:${now.getUTCSeconds()}`)
})

client.on('messageCreate', (message) => {
	if (message.author.bot) return

	if (message.content.startsWith('q.allowed_commands')) allow_command.read_allowed(client, message)

	if (
		(message.author.id === message.guild.ownerId ||
		message.author.id === OWNER_ID) &&
		message.content.startsWith('q.allow_command')
	) allow_command.set_allowed(client, message)

	if (message.author.id == OWNER_ID && message.content.startsWith('q.')) {
		let command = null

		for (let i = 0; i < owner_commands.length; i++) { if (message.content.startsWith("q." + owner_commands[i]['name'])) {
			command = owner_commands[i]
			break
		}}

		if (!command) return

		command.execute([client, message])
	}
})

client.on('interactionCreate', async (interaction) => {
	if (interaction.isChatInputCommand()) {
		let command = commands.find((elem) => elem['name'] === interaction.commandName)

		if (!command) {
			interaction.reply({
				content: `# Error\nCommand \`'${interaction.commandName}'\` does not exist`,
				ephemeral: true
			})
		} else command.execute(interaction)
	}

	else if (interaction.isModalSubmit()) {
		let command = commands.find((elem) => elem['name'] === interaction.customId.split('-')[0])
		
		if (!command) {
			interaction.reply({
				content: `# Error\nCommand \`'${interaction.commandName}'\` does not exist`,
				ephemeral: true
			})
		} else command.respondModal(interaction)
	}
})

const commandsFoldersPath = path.join(__dirname, 'commands')
const commandFolders = fs.readdirSync(commandsFoldersPath)

for (const folder of commandFolders) {
	const commandsPath = path.join(commandsFoldersPath, folder)
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file)
		const command = require(filePath)

		if ('data' in command && 'execute' in command) {
			let command_data = command.data.toJSON()

			command_data["execute"] = command.execute
			command_data["respondModal"] = command.respondModal

			commands.push(command_data)

			command_types[command_data.name] = folder

			if (command_data.name === 'help') {
				help_command = command_data
			}
		} else {
			console.warn(`[ERROR] ${filePath} is missing required 'data' or 'execute' property`)
		}
	}
}

const ownercommandsFoldersPath = path.join(__dirname, 'owner_commands')
const ownercommandFiles = fs.readdirSync(ownercommandsFoldersPath).filter(file => file.endsWith('.js'))

for (const file of ownercommandFiles) {
	const filePath = path.join(ownercommandsFoldersPath, file)
	const command = require(filePath)

	if ('name' in command && 'execute' in command) {
		owner_commands.push(command)
	} else {
		console.warn(`[ERROR] ${filePath} is missing required 'name' or 'execute' property`)
	}
}

try {
	client.login(TOKEN)
} catch (error) {
	console.error(`[ERROR] ${error}`)
}
