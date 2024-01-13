# Quill.js

An all in one discord bot made using the [discord.js](https://discordjs.guide/) library. The bot works using slash commands, and as for non slash commands, the prefix is `q.`

## Features

### 1. Toggling command types

The bot allows the server owner to choose which all command types should be enabled in that server

For any user in that server, in order to view which all are the allowed types, simply run the following [command](./source/allow_command.js) in the server:
```
q.allowed_commands
```
The output of this functions should be the following if, as an example, all the commands are turned on, except the chess commands:
```
Enabled commands:
- Admin
- Code
- Math
- Misc
- Random
- Science
- Time

Disabled commands:
- Chess
```

For the server owner to choose which all commands must be enabled or disable, the `q.allow_command` command, which is case insensitive.
```js
q.allow_command [TYPE] [BOOLEAN: true, false]
```
For example, to disable the chess command, the following command should be run in the server:
```js
q.allow_command chess false
```
Or for example, to enable the math command, the following command should be run in the server:
```js
q.allow_command math true
```
The command types would be the same as the name of the folder that holds those commands, which are present under the [commands](./source/commands) folder. The changes will all be saved into a json file (`allowed_comamnds.json`), in the source folder, which must be present for the program to run.

### 2. Owner commands

These are [commands](./source/owner_commands) reserved just for the creator of the bot, for debugging the bot, editting the console, getting some data from the bot, controlling the bot, etc.

The following are the syntax of all of these commands:
```py
q.cls # Clears the console
q.deletemsg [message_id] # Deletes a message
q.echo [user | channel] [object_id] [content] # Sends a message
q.guild_ids # Collects the server IDs of all the servers the bot is in
q. guild_names # Collects the names of the servers the bot is in
q.readfile [path] # Outputs the contents of a path
q.readfolder [path] # Outputs the files and folders
q.status [online | dnd | idle | invisible] # Change the status of the bot
q.stop # Stops the bot
```
These can be gotten using the [q.help](./source/owner_commands/help.js) command as well, whose output should contain the names of all the owner commands. Though it can provide a description for all the owner commands like this:
```
q.help [commands_name]
```
The output should something like this if the inputted command was the [echo](./source/owner_commands/echo.js) command for example
```
Description:
Send a message to a user or channel

Syntax:
q.echo ( user / channel ) id content
```

## Commands

Commands are divided based on a type, these types are the following:

1. [Admin](./source/commands/admin)
2. [Chess](./source/commands/chess)
3. [Code](./source/commands/code)
4. [Math](./source/commands/math)
5. [Misc](./source/commands/misc)
6. [Random](./source/commands/random)
7. [Science](./source/commands/science)
8. [Time](./source/commands/time)

A [help](./source/commands/help/help.js) command is also present to provide all the commands in a specific type
```
/help [type]
```

The following few sections shall look over all the commands within these types

### 1. Admin commands

[Admin commands](./source/commands/admin) are commands generally usable only by those given some higher permission in a server.

The commands given as admin commands are the following:

1. [kick](./source/commands/admin/kick.js)
2. [ban](./source/commands/admin/ban.js)
3. [unban](./source/commands/admin/unban.js)

#### Kick

This [command](./source/commands/admin/kick.js) simply removes a member from the server, it does not permanently remove them.

**Syntax**
```
/kick [user]
```

#### Ban

As the name suggests, this [command](./source/commands/admin/ban.js) simply bans a user from the server. Once run, the user will be immediately banned from the server.

**Syntax**
```
/ban [user]
```

#### Unban

This [command](./source/commands/admin/unban.js) removes the ban on a user, basically re-allowing them to rejoin the server after having been banned. Note that this command needs you to input the user's id instead, which can be acquired from the server settings.

**Syntax**
```
/unban [user_id]
```

### 2. Chess

These are [commands](./source/commands/chess) that allow using chess inside of discord itself.

The commands given as chess commands are the following:

1. [possible_moves](./source/commands/chess/possible_moves.js)
2. [random_game](./source/commands/chess/random_game.js)
3. [validate_fen](./source/commands/chess/validate_fen.js)

#### Possible moves

This [command](./source/commands/chess/possible_moves.js) returns all the possible moves in a given position

**Syntax**
```
/possible_moves [fen]
```

#### Random game

This [commands](./source/commands/chess/random_game.js) generates a random game, full of just random moves, till the game is over

**Syntax**
```
/random_game
```

#### Validate FEN

This [commands](./source/commands/chess/validate_fen.js) checks whether a given [fen](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation) is valid or not

**Syntax**
```
/validate_fen [fen]
```

### 3. Code

These are [commands](./source/commands/code) that are related to programming or files

The commands that come under the code type are the following:

1. [code](./source/commands/code/code.js)
2. [display_file](./source/commands/code/display_file.js)

#### Code

This [command](./source/commands/code/code.js) allows you to display a snippet of code in a neat embed. Upon running the command, a prompt will come up asking for the file type and the code. The file type is required for the code highlighting. The code will then be displayed in clean embed in discord constisting of the author of the code at the top, and the code itself.

**Syntax**
```
/code
```

#### Display file

This [command](./source/commands/code/display_file.js) allows you to display a local file from your device in a neat embed.

**Syntax**
```
/display_file [file: Has to be attached] [description: Unrequired]
```

### 4. Math

These [commands](./source/commands/math) were primarily the focus of the bot, so it makes sense that there is a lot of math commands in the bot. It should be commands that can allow you to use it like a calculator, and does some boring tasks for you.

The commands that come under the math type are the following:

1. [angle_radian_conversion](./source/commands/math/angle_radian_conversion.js)
2. [antifactorial](./source/commands/math/antifactorial.js)
3. [average](./source/commands/math/average.js)
4. [change_base](./source/commands/math/change_base.js)
5. [ci_amount](./source/commands/math/ci_amount.js)
6. [constant](./source/commands/math/constant.js)
7. [cos](./source/commands/math/cos.js)
8. [sin](./source/commands/math/sin.js)
9. [tan](./source/commands/math/tan.js)
10. [differentiate_function](./source/commands/math/differentiate_function.js)
11. [integrate_function](./source/commands/math/integrate_function.js)
12. [evaluate](./source/commands/math/evaluate.js)
13. [factorial](./source/commands/math/factorial.js)
14. [factors](./source/commands/math/factors.js)
15. [fibonacci](./source/commands/math/fibonacci.js)
16. [herons_formula](./source/commands/math/herons_formula.js)
17. [hyperfactorial](./source/commands/math/hyperfactorial.js)
18. [is_prime](./source/commands/math/is_prime.js)
19. [nth_prime](./source/commands/math/nth_prime.js)
20. [natural_log](./source/commands/math/natural_log.js)
21. [pascals_triangle](./source/commands/math/pascals_triangle.js)
22. [polynomial_from_outputs](./source/commands/math/polynomial_from_outputs.js)
23. [quadratic_equation](./source/commands/math/quadratic_equation.js)
24. [solve_x](./source/commands/math/solve_x.js)
25. [sum_ap](./source/commands/math/sum_ap.js)
26. [summation](./source/commands/math/summation.js)
27. [twonum](./source/commands/math/twonum.js)
28. [use_formula](./source/commands/math/use_formula.js)
29. [saved_formulas](./source/commands/math/saved_formulas.js)

#### Angle radian conversion

This [function](./source/commands/math/angle_radian_conversion.js) does the conversion from degrees to [radians](https://en.wikipedia.org/wiki/Radian) or vice versa.

**Syntax**
```
/angle_radian_conversion [value] [convert_to: Radians | Angles]
```

#### Antifactorial

The inverse of the [factorial](https://en.wikipedia.org/wiki/Factorial) function. Finds the number whose factorial is the given number.

**Syntax**
```
/antifactorial [number]
```

#### Average

Computes the [average](https://en.wikipedia.org/wiki/Mean) from a set of inputs, i.e. numbers seperated by commas.

**Syntax**
```
/average [numbers]
```

#### Change base

Changes the [base](https://en.wikipedia.org/wiki/Numeral_system) of the given number from base-10 to some other base.

```
/change_base [number: in base-10] [new_base]
```

#### Compound intrest amount

Computes the amount of [compound intrest](https://en.wikipedia.org/wiki/Compound_interest) acquired over some time. It can compute for yearly, half yearly, or quarter yearly.

**Syntax**
```
/ci_amount [type: Yearly | Half yearly | Quarter yearly] [principly] [rate] [time]
```

#### Constant

Gives the value of a given [constant](https://en.wikipedia.org/wiki/Mathematical_constant) in math

**Syntax**
```
/constant [name: π | e | 𝜏 | γ | φ]
```

#### Cos

Computes the [cosine](https://en.wikipedia.org/wiki/Sine_and_cosine) of an angle in radians

**Syntax**
```
/cos [radians]
```

#### Sin

Computes the [sin](https://en.wikipedia.org/wiki/Sine_and_cosine) of an angle in radians

**Syntax**
```
/sin [radians]
```

#### Tan

Computes the [tan](https://en.wikipedia.org/wiki/Trigonometric_functions) of an angle in radians

**Syntax**
```
/tan [radians]
```

#### Differentiate function

Finds the value of the [derivative](https://en.wikipedia.org/wiki/Derivative) of a function at some value

**Syntax**
```
/differentiate_function [function] [at]
```

#### Integrate function

Finds the value of the definite [integral](https://en.wikipedia.org/wiki/Integral) of a function between two bounds

**Syntax**
```
/integrate_function [function] [from] [to]
```

#### Evaluate

Calculate the value of a given [math expression](https://en.wikipedia.org/wiki/Expression_(mathematics)). Note that the expression must be a valid expression, using only math numbers and symbols.

**Syntax**
```
/evaluate [expression]
```

#### Factorial

Compute the [factorial](https://en.wikipedia.org/wiki/Factorial) of a number. The number must a positive non-zero [integer](https://en.wikipedia.org/wiki/Integer) to work.

**Syntax**
```
/factorial [number]
```

#### Factors

Find the [factors](https://en.wikipedia.org/wiki/Factor) of a number, i.e. all the numbers that can be used to multiply with other numbers to get the original number back.

**Syntax**
```
/factors [number]
```

#### Fibonacci

Find the nth number in the [Fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_sequence), i.e. a sequence of numbers such that the next number is the sum of the previous two.

**Syntax**
```
/fibonacci [term]
```

#### Heron's formula

A formula to calculate the area of a scalene [triangle](https://en.wikipedia.org/wiki/Triangle) given the length of all its sides.

**Syntax**
```
/herons_formula [side_1] [side_2] [side_3]
```

#### Hyperfactorial

The [hyperfactorial](https://en.wikipedia.org/wiki/Hyperfactorial) of a number is the product of all the natural numbers from 1 to that number to the power of the current number

**Syntax**
```
/hyperfactorial [number]
```

#### Is prime

Checks whether a given number is [prime](https://en.wikipedia.org/wiki/Prime_number) or not, i.e. a number divisible by only 1 and itself.

**Syntax**
```
/is_prime [number]
```

#### Nth prime

This [command](./source/commands/math/nth_prime.js) finds the nth [prime number](https://en.wikipedia.org/wiki/Prime_number). It uses a large [json file](./source/data/primes.json), which was created in python using a sufficiently fast algorithm, to get the first million prime numbers.

**Syntax**
```
/nth_prime [index]
```

#### Natural log

Find the [natural log](https://en.wikipedia.org/wiki/Natural_logarithm) of a number

**Syntax**
```
/natural_log [number]
```

#### Pascal's triangle

Finds the value of [Pascal's triangle](https://en.wikipedia.org/wiki/Pascal%27s_triangle) at some row and column

**Syntax**
```
/pascals_trangle [row] [column]
```

#### Polynomial from outputs

Finds the [polynomial](https://en.wikipedia.org/wiki/Polynomial) satisfying the given outputs, if the outputs corrospond to x-values from 1 to some value

**Syntax**
```
/polynomial_from_outputs [outputs: Seperated by commas]
```

#### Quadratic equation

Compute the [roots](https://en.wikipedia.org/wiki/Quadratic_formula) of a quadratic polynomial

**Syntax**
```
/quadratic_equation [a: The coefficient of x^2] [b: The coefficient of x] [c: The constant]
```

#### Solve X

Find the roots of a function using [Newton's method](https://en.wikipedia.org/wiki/Newton%27s_method), given the initial value

**Syntax**
```
/solve_x [function] [equal_to] [x0]
```

#### Sum of arithmetic progression

Find the sum of an [arithmetic progression](https://en.wikipedia.org/wiki/Arithmetic_progression)

**Syntax**
```
/sum_ap [first_term] [number_of_terms] [common_difference]
```

#### Summation

Calculates the [summation](https://en.wikipedia.org/wiki/Summation) between two bounds of a function

**Syntax**
```
/summation [start] [stop] [function]
```

#### Two numbers

This [command](./source/commands/math/twonum.js) finds two numbers that satisfy a condition given an initial two numbers. The possible conditions are the following:

- Sum & Difference
- Product & Quotient
- Sum & Product

**Syntax**
```
/twonum [category: sum_difference | product_quotient | sum_product] [number1] [number2]
```

#### Use formula

This [command](./source/commands/math/use_formula.js) allows you to type out a [formula](https://en.wikipedia.org/wiki/Formula), and then plug in the values you want, and then the program evaluates the result. All the values in the `values` variable must be seperated using commas, and the assigned variable must be followed by an equals with the value you want to give it.

**Syntax**
```
/use_formula [formula] [values]
```

#### Saved formulas

This is a [command](./source/commands/math/saved_formulas.js) that allows you to save formulas, use them, and delete them. This function can do multiple things at once depending on the `method` argument. The formulas are saved in a [json file](./source/data) holding your user id, thus the formulas are saved indirectly in your discord account. All the inputted values are case sensitive.

If the `method` argument is `List`, then the program would list out all the formulas you have saved to your account along with the formula they hold. When the method is to list out all the formulas, the `name` and `inputs` arguments can simply be left with anything; the input given to those two arguments wouldn't change the resulting output.

If the `method` argument is `Use`, the the program will evaluate the formula with given inputs. The `name` argument can hold the name of the formula, while the `inputs` argument can hold all the inputs seperated by commas (For example: a = 2, b = c).

If the `method` argument is `Create`, then the program would create a new formula onto your account. The `name` argument would be what is used to run the formula, and the actual formula can be passed under the `inputs` argument.

If the `method` argument is `Delete`, then the program would delete the formula from your account. The `name` argument can hold the name of the formula you want to delete, and the `inputs` argument can be left empty.

**Syntax**
```
/saved_formulas [method: List | Use | Create | Delete] [name] [inputs]
```

### 5. Misc

These [commands](./source/commands/misc) are ones that don't fall in some specific type, thus are under this more general type.

The commands that come under the misc type are the following:

1. [caesar_cipher](./source/commands/misc/caesar_cipher.js)
2. [coinflip](./source/commands/misc/coinflip.js)
3. [embed](./source/commands/misc/embed.js)
4. [rps](./source/commands/misc/rps.js)

#### Caeser cipher

This [function](./source/commands/misc/caesar_cipher.js) applies the [Ceaser cipher](https://en.wikipedia.org/wiki/Caesar_cipher) onto a string of text by some shift

**Syntax**
```
/caeser_cipher [text] [shift]
```

#### Coinflip

Simply does a coinflip

**Syntax**
```
/coinflip
```

#### Embed

Create a neat embed with a title, description, image, thumbnail, a footer, and a URL. The URL us present at the text that holds the name of the author present in the embed. None of the arguments to this [command](./source/commands/misc/embed.js) is required.

**Syntax**
```
/embed [title] [description] [image] [thumbnail] [footer] [url]
```

#### Rock, Paper, Scissors

Play rock, paper, scissors against a random choice.

**Syntax**
```
/rps [choice: Rock | Paper | Scissor]
```

### 6. Random

These [commands](./source/commands/random) involving choosing a random value. Note that no value returned is genuinely random, it is only [pseudo-random](https://en.wikipedia.org/wiki/Pseudorandomness), as computers are unable to generate genuinely random numbers.

The commands that come under the random type are the following:

1. [randint](./source/commands/random/randint.js)
2. [randoption](./source/commands/random/randoption.js)

#### Random integer

Chooses a random number between two given values

**Syntax**
```
/randint [lower_bound] [upper_bound]
```

#### Random option

Chooses a random option from a set of objects

**Syntax**
```
/randoption [list: Seperated by commas]
```

### 7. Science

These [commands](./source/commands/science) are more science related commands that generally works using [chemistry](https://en.wikipedia.org/wiki/Chemistry) and [physics](https://en.wikipedia.org/wiki/Physics) calculations

The comands that come under the science type are the following:

1. [element](./source/commands/science/element.js)
2. [periodic_table](./source/commands/science/periodic_table.js)
3. [word_to_elements](./source/commands/science/word_to_elements.js)

#### Element

This [function](./source/commands/science/element.js) allows you to give one information of an [element](https://en.wikipedia.org/wiki/Chemical_element) from the [periodic table](https://en.wikipedia.org/wiki/Periodic_table), such as the name, [symbol](https://en.wikipedia.org/wiki/Chemical_symbol), or [atomic number](https://en.wikipedia.org/wiki/Atomic_number), and it can return the other two values. The `type` argument refers to the value you are inputting.

**Syntax**
```
/element [type: Name | Symbol | Atomic number] [input: Must corrospond to type]
```

#### Periodic table

This [command](./source/commands/science/periodic_table.js) returns the image of the [periodic table](https://en.wikipedia.org/wiki/Periodic_table)

**Syntax**
```
/periodic_table
```

#### Word to elements

This command converts a word into a set of [elements](https://en.wikipedia.org/wiki/Chemical_element), whose [symbols](https://en.wikipedia.org/wiki/Chemical_symbol) corrospond to that word when placed together. Note that if there are multiple solutions, this program with only give the first one it finds.

**Syntax**
```
/word_to_elements [word]
```

### 8. Time

These are [commands](./source/commands/time) more related to the time, day of the week, month, etc.

The commands that come under the time type are the following:

1. [day_of_week](./source/commands/time/day_of_week.js)
2. [days_for_month](./source/commands/time/days_for_month.js)
3. [utc](./source/commands/time/utc.js)

#### Day of the week

This [command](./source/commands/time/day_of_week.js) returns that day of the week a specific date is. If the date is invalid, then the program will be unable to find the day it was.

**Syntax**
```
/day_of_week [day] [month] [year]
```

#### Days for the month

This [command](./source/commands/time/days_for_month.js) returns the number of days present in a given month.

**Syntax**
```
/days_for_month [month]
```

#### UTC (Coordinated Universal time)

This [command](./source/commands/time/utc.js) returns the current time it is, but in the [coordinated universal time (utc)](https://en.wikipedia.org/wiki/Coordinated_Universal_Time).

**Syntax**
```
/utc
```

## Environment variables

Some [environment variables](https://en.wikipedia.org/wiki/Environment_variable) must be present for the program to run, with data that must be set by the owner. This file must be named `.env`, and must by present just outside the `source` folder. The following are the variables inside of the file:

1. Token
2. Client ID
3. Owner ID
4. Console channel ID

---

### Contacts
*Email address:* farismuhd172009@gmail.com