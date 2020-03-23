const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();

const rollToBonusNumber = (roll) => {
  const bonusNumbers = [
    "Fail!",  -8, -6, -6,
    -4,       -4, -2, -2,
    -1,       -1,  0,  0,
     1,        1,  2,  3,
     4,        5,  6,  7
  ]

  if(roll > bonusNumbers.length) {
    return Math.floor(((roll - 1) / 5)) + 4;
  } else {
    return bonusNumbers[roll - 1];
  }
}

function rollAndExplode(rolls = null, up = false) {
  let originalRoll = Math.floor(1 + Math.random() * 19);
  let effectiveRoll;
  if (originalRoll < 10 && !up ) {
    effectiveRoll = 10;
  } else {
    effectiveRoll = originalRoll;
  }
  if (rolls === null) {
    rolls = [originalRoll];
  } else {
    rolls.push(effectiveRoll);
  }

  if (originalRoll === 10 || originalRoll === 20) {
    rolls = rollAndExplode(rolls);
  }
  return rolls;
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.startsWith('!action')) {
    const match = msg.content.match(/\!action (\d+)\s?(up)?/);
    let dieRolls;
    if (match !== null) {
      const up = match[2] !== undefined
      const startingValue = parseInt(match[1]);
      dieRolls = rollAndExplode([startingValue], up);
    } else {
      dieRolls = rollAndExplode();
    }

    const total = dieRolls.reduce((acc, num) => acc+=num, 0);
    let reply = `Bonus Number: **${rollToBonusNumber(total)}** (rolled ${total}`;
    if(dieRolls.length > 1) {
      reply += ` [${dieRolls.join(' + ')}]`;
    }
    reply += `)`;
    msg.reply(reply);
  }
});

client.login(token);
