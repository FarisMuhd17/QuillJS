const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const path = require('path')
const fs = require('fs')

const ADMIN_COMMANDS = "```\
- ban** user\n\n\
- unban** user\n\
- kick** user\n\
```"

const CHESS_COMMANDS = "```\
- possible_moves fen\n\
- random_game\n\
- validate_fen fen\n\
```"

const MATH_COMMANDS = "```\
- average list\n\
- change_base number base\n\
- constant name\n\
- cos radian\n\
- sin radian\n\
- tan radian\n\
- exponent base exponent\n\
- factorial number\n\
- factors number\n\
- fibonacci number\n\
- herons_formula side_1 side_2 side_3\n\
- hyperfactorial number\n\
- hypotenuse altitude base\n\
- natural_log number\n\
- pascals_triangle row column\n\
- percentage numerator denominator\n\
- reciprocal number\n\
- reduce_fraction numerator denominator\n\
- remainder number1 number2\n\
- sum_ap first_term number_of_terms common_difference\n\
- sum_till number\n\
- summation start stop function\n\
- twonum category number1 number2\n\
- use_formula formula values\n\
```"

const MISC_COMMANDS = "```\
- coinflip\n\
- embed title description image thumbnail footer url\n\
- rps choice\n\
```"

const RANDOM_COMMANDS = "```\
- randint number1 number2\n\
- randoption list\n\
```"

const SCIENCE_COMMANDS = "```\
- element type input\n\
- periodic_table\n\
```"

const TIME_COMMANDS = "```\
- day_of_week date month year\n\
- days_for_month month\n\
- utc\n\
```"

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Help command')
		.addStringOption((option) => option
			.setName('type')
			.setDescription('The type of commands you want')
			.setRequired(true)
			.addChoices(
				{ name: 'Admin', value: 'admin' },
				{ name: 'Chess', value: 'chess' },
				{ name: 'Code', value: 'code' },
				{ name: 'Math', value: 'math' },
				{ name: 'Misc', value: 'misc' },
				{ name: 'Random', value: 'random' },
				{ name: 'Science', value: 'science' },
				{ name: 'Time', value: 'time' }
			)
		),

	async execute(interaction) {
		const commandsFolder = path.dirname(__dirname)
		const commandsSubfolders = fs.readdirSync(commandsFolder)

		let files = ""

		for (folder of commandsSubfolders) {
			if (folder === interaction.options.getString('type')) {
				const typeFolder = path.join(commandsFolder, folder)
				files = fs.readdirSync(typeFolder)
					.filter(file => file.endsWith('.js')).toString()
					.replaceAll('.js', '')
					.replaceAll(',', '\n')
				break
			}
		}

		let embed = new EmbedBuilder()
			.setTitle(interaction.options.getString('type').toUpperCase())
			.setDescription(files)
			.setColor([31, 64, 194])
			.setAuthor({
				name: interaction.user.username,
				iconURL: interaction.user.displayAvatarURL()
			})

		await interaction.reply({ embeds: [embed], ephemeral: true })
	}
}