const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('caesar_cipher')
        .setDescription('Use the caesar cipher on a piece of text')
        .addStringOption((option) => option
            .setName('text')
            .setDescription('The text you want to apply the cipher to ')
            .setRequired(true)
        )
        .addIntegerOption((option) => option
            .setName('shift')
            .setDescription('The shift you want to apply to the text')
            .setRequired(true)
        ),

    async execute(interaction) {
        let text = interaction.options.getString('text')
        let shift = interaction.options.getInteger('shift')

        if (shift < 1) {
            await interaction.reply({ content: '# Error\nShift must be a natural number', ephemeral: true })
            return
        }

        text = text.toLowerCase()
        shift = shift % 26
        let alphabet = 'abcdefghijklmnopqrstuvwxyz'
        let shifted = alphabet.slice(shift) + alphabet.slice(0, shift)
        
        let encrypted = ''
        for (let i = 0; i < text.length; i++) {
            let char = text[i];
            let index = alphabet.indexOf(char)
            
            if (index !== -1) {
                encrypted += shifted[index]
            } else {
                encrypted += char
            }
        }

        await interaction.reply(encrypted)
    }
}