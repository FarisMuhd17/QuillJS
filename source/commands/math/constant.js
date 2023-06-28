const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('constant')
		.setDescription('Return the value of a mathematical constant')
		.addStringOption(option =>option
			.setName('name')
			.setDescription('The constant you want the value of')
			.setRequired(true)
			.addChoices(
				{ name: 'π', value: 'pi' },
				{ name: 'e', value: 'e' },
				{ name: '𝜏', value: 'tau' },
				{ name: 'γ', value: 'euler_gamma' },
				{ name: 'φ', value: 'phi'}
			)),

	async execute(interaction) {
		switch (interaction.options.getString('name')) {
			case 'pi':
				await interaction.reply("3.141592653589793")
				break
			case 'e':
				await interaction.reply("2.718281828459045")
				break
			case 'tau':
				await interaction.reply("6.283185307179586")
				break
			case 'euler_gamma':
				await interaction.reply("0.5772156649015329")
				break
			case 'phi':
				await interaction.reply("1.618033988749894")
				break
		}
	}
}