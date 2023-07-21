const elements = [
    'H',
    'He',
    'Li',
    'Be',
    'B',
    'C',
    'N',
    'O',
    'F',
    'Ne',
    'Na',
    'Mg',
    'Al',
    'Si',
    'P',
    'S',
    'Cl',
    'Ar',
    'K',
    'Ca',
    'Sc',
    'Ti',
    'V',
    'Cr',
    'Mn',
    'Fe',
    'Co',
    'Ni',
    'Cu',
    'Zn',
    'Ga',
    'Ge',
    'As',
    'Se',
    'Br',
    'Kr',
    'Rb',
    'Sr',
    'Y',
    'Zr',
    'Nb',
    'Mo',
    'Tc',
    'Ru',
    'Rh',
    'Pd',
    'Ag',
    'Cd',
    'In',
    'Sn',
    'Sb',
    'Te',
    'I',
    'Xe',
    'Cs',
    'Ba',
    'La',
    'Ce',
    'Pr',
    'Nd',
    'Pm',
    'Sm',
    'Eu',
    'Gd',
    'Tb',
    'Dy',
    'Ho',
    'Er',
    'Tm',
    'Yb',
    'Lu',
    'Hf',
    'Ta',
    'W',
    'Re',
    'Os',
    'Ir',
    'Pt',
    'Au',
    'Hg',
    'Tl',
    'Pb',
    'Bi',
    'Po',
    'A',
    'Rn',
    'Fr',
    'Ra',
    'Ac',
    'Th',
    'Pa',
    'U',
    'Np',
    'Pu',
    'Am',
    'Cm',
    'Bk',
    'Cf',
    'Es',
    'Fm',
    'Md',
    'No',
    'Lr',
    'Rf',
    'Db',
    'Sg',
    'Bh',
    'Hs',
    'Mt',
    'Ds',
    'Rg',
    'Cn',
    'Nh',
    'Fl',
    'Mc',
    'Lv',
    'Ts',
    'Og',
]

const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('word_to_elements')
        .setDescription('Convert a word to a combination of symbols of elements in the periodic table')
        .addStringOption((option) => option
            .setName('word')
            .setDescription('The word you want to convert')
            .setRequired(true)
        ),

    async execute(interaction) {
        let name = interaction.options.getString('word')
        let values = []

        let iteration = 0
        let skip_once = false

        for (let letter of name) {
            if (skip_once) {
                skip_once = false
                continue
            }

            if (elements.includes(letter.toUpperCase())) {
                values.push(letter.toUpperCase())
                iteration++

                continue
            }

            if (iteration !== 0) {
                if (elements.includes(name[iteration - 1].toUpperCase() + letter.toLowerCase())) {
                    values.pop()
                    values.push(name[iteration - 1].toUpperCase() + letter.toLowerCase())
                    iteration++

                    continue
                }
            }

            if (iteration + 1 !== name.length) {
                if (elements.includes(letter.toUpperCase() + name[iteration + 1].toLowerCase())) {
                    values.push(letter.toUpperCase() + name[iteration + 1].toLowerCase())
                    skip_once = true;
                    iteration++

                    continue
                }
            }

            values = false
            break
        }

        await interaction.reply(values ? values.toString() : 'Not possible')
    }
}