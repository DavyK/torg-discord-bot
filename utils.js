const sum = (arr) => arr.reduce((acc, rollObj) => acc += rollObj.effectiveRoll, 0);

const d20 = () => 1 + Math.floor((Math.random() * 20));

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

const rollToString = ({ roll, effectiveRoll }) => {
  if (roll === effectiveRoll) {
    return roll;
  } else {
    return `${effectiveRoll} (up from ${roll})`;
  }
}

const formatResult = ({ total, rolls}) => {
  let gloryMessage = '';
  if (total >= 60) {
    gloryMessage = '**GLORY:** ';
  }
  let reply = `${gloryMessage}**${rollToBonusNumber(total)}** (rolled ${total}`;
  if(rolls.length > 1) {
    reply += ` [${rolls.map(rollToString).join(' + ')}]`;
  }
  reply += `)`;
  return reply;
}

function rollAndExplode(opts = { min: 1 }) {
  let rolls = [];
  let roll;
  while(true) {
    roll = d20();
    if (roll < opts.min && rolls.length === 0) {
      rolls.push({ roll, effectiveRoll: opts.min });
      return rolls;
    }

    rolls.push({ roll, effectiveRoll: roll });
    if(roll !== 10 && roll !== 20){
      return rolls;
    }
  }
}

function rollNormal() {
  let rolls = rollAndExplode();
  let total = sum(rolls);
  return formatResult({
    total,
    rolls,
  });
}

function rollPossibility(startingValue) {
  let rolls = [{roll: startingValue, effectiveRoll: startingValue }];
  rolls = rolls.concat(rollAndExplode({ min: 10 }));
  let total = sum(rolls);
  return formatResult({
    total,
    rolls
  });
}

function rollUp(startingValue) {
  let rolls = [{roll: startingValue, effectiveRoll: startingValue }];
  rolls = rolls.concat(rollAndExplode());
  let total = sum(rolls);
  return formatResult({
    total,
    rolls,
  });
}

function action(command) {
  const match = command.match(/\!action (\d+)\s?(up)?/);
  if (match !== null) {
    const startingValue = parseInt(match[1]);
    const up = match[2] !== undefined
    if(up) {
      return rollUp(startingValue);
    } else {
      return rollPossibility(startingValue);
    }
  } else {
    return rollNormal();
  }
}


module.exports = {
  d20,
  rollNormal,
  rollUp,
  rollPossibility,
  action,
};
