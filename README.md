# Torg Discord Bot
This bot can be added to a discord server, to generate bonus number for the TTRPG TORG Eternity.
The bot has one command `!action`

## Roll
`!action` will generate a pseudo-random number between 1 and 20, exploding 10s, and 20s, and convert that roll into a bonus number.

## Roll and add to a previous roll
`!action <NUM>` will generate a pseudo-random number between 1 and 20, exploding 10s, and 20s, and add it to the existing roll, converting the final result that roll into a bonus number. This will take account of the fact that possibilites are alway at least a 10.

## Roll, but using an up, not a possibility
`!action <NUM> up` will do the same as above, but new rolls are not counted as at least 10s.
