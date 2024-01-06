const { SlashCommandBuilder } = require('discord.js')

function add(before, new_value) {
    return before + new_value
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('average')
        .setDescription('Find the average value of a list of numbers')
        .addStringOption((option) => option
            .setName('numbers')
            .setDescription('The list of numbers (Seperate with commas)')
            .setRequired(true)
        ),

    async execute(interaction) {
        let numbers = interaction.options.getString('numbers')
        numbers = numbers.replace(/ /g, "")

        let numlist = numbers.split(",")
        numlist = numlist.map(str => {
            return parseFloat(str, 10);
        })

        await interaction.reply((numlist.reduce(add, 0) / numlist.length).toString())
    }
}