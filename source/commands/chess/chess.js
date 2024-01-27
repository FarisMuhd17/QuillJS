const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { Chess } = require('chess.js')
const fs = require('fs')
const path = require('path')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chess')
		.setDescription('Play chess in discord itself')
		.addSubcommand((subcommand) => subcommand
			.setName('challenge')
			.setDescription('Challenge another user')
			.addUserOption((option) => option
				.setName('user')
				.setDescription('The user you want to challenge')
				.setRequired(true)
			)
		)
		.addSubcommand((subcommand) => subcommand
			.setName('accept')
			.setDescription('Accept a challenge from another user')
			.addUserOption((option) => option
				.setName('user')
				.setDescription('The user you want to accept the challenge from')
				.setRequired(true)
			)
		)
		.addSubcommand((subcommand) => subcommand
			.setName('move')
			.setDescription('Make a move to a current game')
			.addUserOption((option) => option
				.setName('opponent')
				.setDescription('The user you want to make the move against')
				.setRequired(true)
			)
			.addStringOption((option) => option
				.setName('move')
				.setDescription('The move you want to make (In algebraic notation)')
				.setRequired(true)
			)
		)
		.addSubcommand((subcommand) => subcommand
			.setName('resign')
			.setDescription('Resign a current game')
			.addUserOption((option) => option
				.setName('opponent')
				.setDescription('The winner of the game')
				.setRequired(true)
			)
		)
		.addSubcommand((subcommand) => subcommand
			.setName('position')
			.setDescription('Show the current position')
			.addUserOption((option) => option
				.setName('user')
				.setDescription('The user of the game you want the position of')
				.setRequired(true)
			)
			.addUserOption((option) => option
				.setName('opponent')
				.setDescription('The opponent of the game you want the position of')
				.setRequired(true)
			)
		)
		.addSubcommand((subcommand) => subcommand
			.setName('stats')
			.setDescription('Show the stats of a user')
			.addUserOption((option) => option
				.setName('user')
				.setDescription('The user of which you want the stats of')
				.setRequired(true)
			)
		)
		.addSubcommand((subcommand) => subcommand
			.setName('get_game')
			.setDescription('Gives a past game of a user against another')
			.addStringOption((option) => option
				.setName('user_id')
				.setDescription('The ID of the user')
				.setRequired(true)
			)
			.addStringOption((option) => option
				.setName('opponent_id')
				.setDescription('The ID of the opponent')
				.setRequired(true)
			)
			.addIntegerOption((option) => option
				.setName('index')
				.setDescription('Index of the game, 1 being the first')
				.setRequired(true)
			)
		)
		.addSubcommand((subcommand) => subcommand
			.setName('total_games_against')
			.setDescription('Gives the total number of games a user had with another')
			.addStringOption((option) => option
				.setName('user_id')
				.setDescription('The ID of the user')
				.setRequired(true)
			)
			.addStringOption((option) => option
				.setName('opponent_id')
				.setDescription('The ID of the opponent')
				.setRequired(true)
			)
		)
		.addSubcommand((subcommand) => subcommand
			.setName('current_games')
			.setDescription('Gets all the users you are playing against currently')
		),

	async execute(interaction) {
		let json_file = path.join(path.join(path.dirname(path.dirname(__dirname)), 'data'), 'chess_games.json')
		let chess_data = require(json_file)
		if (!chess_data[interaction.user.id]) chess_data[interaction.user.id] = {
			'username': interaction.user.username,
			'challenges': [],
			'games': {},
			'stats': {
				'wins': 0,
				'losses': 0,
				'draws': 0
			},
			'played_games': {}
		}

		/* DATA STRUCTURE

		"USER_ID": {
			'username': 'USER's username,
			'challenges': ['opponent_id_1', 'opponent_id_2'], // The people who challenged USER
			'games': {
				'opponent_id_3': {
					'position': 'POSITION',
					'moves': ['MOVES'],
					'turn': 0(white) or 1(black),
					'color': 0 or 1 // This is USER_ID's color on this game
				}
			},
			'stats': {
				'wins': 12,
				'losses': 5,
				'draws': 2
			},
			'played_games': {
				'opponent_id_4': {
					1: {
						'moves': "MOVES"
						'winner': "" // Search for user in here to get the username
					},
				}
			}
		}

		*/

		let user, opponent, user_id, opponent_id

		switch (interaction.options.getSubcommand()) {
			case 'challenge':
				user = interaction.options.getUser('user')
				if (!chess_data[user.id]) chess_data[user.id] = {
					'username': user.username,
					'challenges': [],
					'games': {},
					'stats': {
						'wins': 0,
						'losses': 0,
						'draws': 0
					},
					'played_games': {}
				}

				if (chess_data[user.id]['challenges'].includes(interaction.user.id)) {
					await interaction.reply({ content: `You have already challenged ${user.username}`, ephemeral: true })
					break
				}

				if (Object.keys(chess_data[interaction.user.id]['games']).includes(user.id)) {
					await interaction.reply({ content: `You are already in a game with ${user.id}`, ephemeral: true })
					break
				}

				chess_data[user.id]['challenges'].push(interaction.user.id)

				await fs.writeFile(
					json_file,
					JSON.stringify(chess_data, null, 4),
					'utf8',
					(error, data) => {
						if (error) {
							interaction.reply({ content: 'An error occured: Try again later', ephemeral: true })
						} else interaction.reply({ content: `Challenged ${chess_data[user.id]['username']}`, ephemeral: true })
					}
				)

				break

			case 'accept':
				user = interaction.options.getUser('user')
				if (!chess_data[user.id] || !chess_data[interaction.user.id]['challenges'].includes(user.id)) {
					await interaction.reply({ content: `${user.username} has not challenged you`, ephemeral: true })
					break
				}

				let color = Math.round(Math.random())

				chess_data[interaction.user.id]['challenges'].splice(chess_data[interaction.user.id]['challenges'].indexOf(user.username), 1)
				chess_data[interaction.user.id]['games'][user.id] = {
					'position': 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
					'moves': [],
					'turn': 0,
					'color': color
				}
				chess_data[user.id]['games'][interaction.user.id] = {
					'position': 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
					'moves': [],
					'turn': 0,
					'color': color ^ 1
				}

				await fs.writeFile(
					json_file,
					JSON.stringify(chess_data, null, 4),
					'utf8',
					(error, data) => {
						if (error) {
							interaction.reply({ content: 'An error occured: Try again later', ephemeral: true })
						} else interaction.reply({ content: `Now playing a game against ${chess_data[user.id]['username']}, it is ${color === 0 ? 'your' : 'their'} turn to play.`, ephemeral: true })
					}
				)

				break

			case 'move':
				opponent = interaction.options.getUser('opponent')
				let move = interaction.options.getString('move')

				if (!chess_data[interaction.user.id]['games'][opponent.id]) {
					await interaction.reply({ content: `You are currently not in a game with ${opponent.username}`, ephemeral: true })
					break
				}

				if (chess_data[interaction.user.id]['games'][opponent.id]['color'] !== chess_data[interaction.user.id]['games'][opponent.id]['turn']) {
					await interaction.reply({ content: 'It is not your turn to move', ephemeral: true })
					break
				}

				let chess = new Chess(chess_data[interaction.user.id]['games'][opponent.id]['position'])

				if (!chess.moves().includes(move)) {
					interaction.reply(`**${move}** is an invalid move`)
					break
				}

				chess.move(move)

				chess_data[interaction.user.id]['games'][opponent.id]['position'] = chess.fen()
				chess_data[opponent.id]['games'][interaction.user.id]['position'] = chess.fen()

				chess_data[interaction.user.id]['games'][opponent.id]['moves'].push(move)
				chess_data[opponent.id]['games'][interaction.user.id]['moves'].push(move)

				if (chess.isGameOver()) {
					if (!chess_data[interaction.user.id]['played_games'][user.id]) {
						chess_data[interaction.user.id]['played_games'][user.id] = {}
						chess_data[user.id]['played_games'][interaction.user.id] = {}
					}

					if (chess.isDraw()) {
						chess_data[interaction.user.id]['played_games'][opponent.id][Object.keys(chess_data[interaction.user.id]['played_games']).length + 1] = {
							'moves': chess_data[interaction.user.id]['games'][opponent.id]['moves'],
							'winner': null
						}
						chess_data[user.id]['played_games'][interaction.user.id][Object.keys(chess_data[user.id]['played_games']).length + 1] = {
							'moves': chess_data[user.id]['games'][interaction.user.id]['moves'],
							'winner': null
						}

						chess_data[interaction.user.id]['stats']['draws'] += 1
						chess_data[opponent.id]['stats']['draws'] += 1
					} else {
						chess_data[interaction.user.id]['played_games'][opponent.id][Object.keys(chess_data[interaction.user.id]['played_games']).length + 1] = {
							'moves': chess_data[interaction.user.id]['games'][opponent.id]['moves'],
							'winner': interaction.user.id
						}
						chess_data[user.id]['played_games'][interaction.user.id][Object.keys(chess_data[user.id]['played_games']).length + 1] = {
							'moves': chess_data[user.id]['games'][interaction.user.id]['moves'],
							'winner': interaction.user.id
						}

						chess_data[interaction.user.id]['stats']['wins'] += 1
						chess_data[opponent.id]['stats']['losses'] += 1
					}

					delete chess_data[interaction.user.id]['games'][opponent.id]
					delete chess_data[opponent.id]['games'][interaction.user.id]
				} else {
					chess_data[interaction.user.id]['games'][opponent.id]['turn'] ^= 1
					chess_data[opponent.id]['games'][interaction.user.id]['turn'] ^= 1
				}

				await fs.writeFile(
					json_file,
					JSON.stringify(chess_data, null, 4),
					'utf8',
					(error, data) => {
						if (error) {
							interaction.reply({ content: 'An error occured: Try again later', ephemeral: true })
						} else {
							if (chess.isGameOver()) {
								if (chess.isDraw()) {
									interaction.reply('Draw')
								} else {
									interaction.reply('Win')
								}
							} else {
								interaction.reply(`Made move ${move}`)
							}
						}
					}
				)

				break

			case 'resign':
				user = interaction.options.getUser('opponent')
				if (!Object.keys(chess_data[interaction.user.id]['games']).includes(user.id)) {
					await interaction.reply({ content: `You are not playing a game against ${user.username} currently`, ephemeral: true })
					break
				}

				if (!chess_data[interaction.user.id]['played_games'][user.id]) {
					chess_data[interaction.user.id]['played_games'][user.id] = {}
					chess_data[user.id]['played_games'][interaction.user.id] = {}
				}

				chess_data[interaction.user.id]['played_games'][user.id][Object.keys(chess_data[interaction.user.id]['played_games']).length + 1] = {
					'moves': chess_data[interaction.user.id]['games'][user.id]['moves'],
					'winner': user.id
				}
				chess_data[user.id]['played_games'][interaction.user.id][Object.keys(chess_data[user.id]['played_games']).length + 1] = {
					'moves': chess_data[user.id]['games'][interaction.user.id]['moves'],
					'winner': user.id
				}

				chess_data[interaction.user.id]['stats']['losses'] += 1
				chess_data[user.id]['stats']['wins'] += 1

				delete chess_data[interaction.user.id]['games'][user.id]
				delete chess_data[user.id]['games'][interaction.user.id]

				await fs.writeFile(
					json_file,
					JSON.stringify(chess_data, null, 4),
					'utf8',
					(error, data) => {
						if (error) {
							interaction.reply({ content: 'An error occured: Try again later', ephemeral: true })
						} else interaction.reply({ content: `You have resigned your game against ${user.username}`, ephemeral: true })
					}
				)

				break

			case 'position':
				user = interaction.options.getUser('user')
				opponent = interaction.options.getUser('opponent')

				if (!chess_data[user.id]) {
					await interaction.reply({ content: `${user.username} is not currently playing a game`, ephemeral: true })
					break
				}

				if (!chess_data[user.id]['games'][opponent.id]) {
					await interaction.reply({ content: `${user.username} is not currently playing a game against ${opponent.username}`, ephemeral: true })
					break
				}

				await interaction.reply('```' + chess_data[user.id]['games'][opponent.id]['position'] + '``````' + new Chess(chess_data[user.id]['games'][opponent.id]['position']).ascii() + '```')

				break

			case 'stats':
				user = interaction.options.getUser('user')

				if (!chess_data[user.id]) {
					await interaction.reply(`${user.username} has not played a single game yet`)
					break
				}

				await interaction.reply({ embeds: [new EmbedBuilder()
					.setTitle('Stats')
					.setAuthor({
						name: user.username,
						iconURL: user.displayAvatarURL()
					})
					.addFields({ name: 'Wins', value: chess_data[user.id]['stats']['wins'].toString(), inline: true })
					.addFields({ name: 'Losses', value: chess_data[user.id]['stats']['losses'].toString(), inline: true })
					.addFields({ name: 'Draws', value: chess_data[user.id]['stats']['draws'].toString(), inline: true })
					.setColor([31, 64, 194])
				]})

				break

			case 'get_game':
				user_id = interaction.options.getString('user_id')
				opponent_id = interaction.options.getString('opponent_id')
				let game_index = interaction.options.getInteger('index').toString()

				if (!chess_data[user_id]) {
					await interaction.reply('This user has not played a game yet')
					break
				}

				if (!chess_data[user_id]['played_games'][opponent_id]) {
					await interaction.reply('This user has not played a game against this opponent')
					break
				}

				if (!chess_data[user_id]['played_games'][opponent_id][game_index]) {
					await interaction.reply('This user has not played this many games against this opponent. Use the `/chess total_games_against` command to get the total number of games.')
					break
				}

				await interaction.reply({ embeds: [new EmbedBuilder()
					.setTitle(`Game ${game_index}`)
					.addFields({ name: 'Winner', value: chess_data[user_id]['played_games'][opponent_id][game_index]['winner'], inline: false })
					.addFields({ name: 'Moves', value: chess_data[user_id]['played_games'][opponent_id][game_index]['moves'].toString().replaceAll(' ', '').replaceAll(',', ' '), inline: false })
					.setColor([31, 64, 194])
				]})

				break

			case 'total_games_against':
				user_id = interaction.options.getString('user_id')
				opponent_id = interaction.options.getString('opponent_id')

				if (!chess_data[user_id]) {
					await interaction.reply('This user has not played a game yet')
					break
				}

				if (!chess_data[user_id]['played_games'][opponent_id]) {
					await interaction.reply('This user has not played a game against this opponent')
					break
				}

				await interaction.reply(Math.max(...Object.keys(chess_data[user_id]['played_games'][opponent_id])).toString())
				break

			case 'current_games':
				let out = ''
				let current_opponents = Object.keys(chess_data[interaction.user.id]['games'])

				for (let i = 0; i < current_opponents.length; i++) {
					out += `${chess_data[current_opponents[i]]['username']} - ${current_opponents[i]}\n`
				}

				await interaction.reply('```' + out + '```')

				break
		}
	}
}