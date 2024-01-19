const { SlashCommandBuilder } = require('discord.js')
const path = require('path')
const elements = require(path.join(path.join(path.dirname(path.dirname(__dirname)), 'data'), 'periodic_table.json'))['elements']

module.exports = {
    data: new SlashCommandBuilder()
        .setName('element')
        .setDescription('Find the other two values of an element from the periodic table when inputted one')
        .addStringOption((option) => option
            .setName('type')
            .setDescription('The type of input of the element you are inputting (Name, Symbol, Atomic number)')
            .setRequired(true)
            .addChoices(
                { name: 'Name', value: 'name' },
                { name: 'Symbol', value: 'symbol' },
                { name: 'Atomic number', value: 'number' }
            )
        )
        .addStringOption((option) => option
            .setName('input')
            .setDescription('Must be appropriate to the type you chose')
            .setRequired(true)
        ),

    async execute(interaction) {
        let type = interaction.options.getString('type')
        let input = interaction.options.getString('input')

        switch (type) {
            case 'name':
                input = input.toLowerCase()
                input = input.charAt(0).toUpperCase() + input.slice(1)

                for (let i = 0; i < elements.length; i++) {
                    if (input === elements[i]["name"]) {
                        await interaction.reply(`${elements[i]["atomic_number"]}. ${elements[i]["symbol"]}`)
                        break
                    }
                }

                break

            case 'symbol':
                input = input.toLowerCase()
                input = input.charAt(0).toUpperCase() + input.slice(1)

                for (let i = 0; i < elements.length; i++) {
                    if (input === elements[i]["symbol"])     {
                        await interaction.reply(`${elements[i]["atomic_number"]}. ${elements[i]["name"]}`)
                        break
                    }
                }

                break

            case 'number':
                input = parseInt(input)

                for (let i = 0; i < elements.length; i++) {
                    if (input === elements[i]["atomic_number"]) {
                        await interaction.reply(`${elements[i]["symbol"]} - ${elements[i]["name"]}`)
                        break
                    }
                }
        }
    }
}