const Discord = require('discord.js');
const express = require('express');
const { rollNormal, rollPossibility, rollUp, action } = require('./utils');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('TORG Discord bot!'))

app.get('/action', (req, res) => {
  result = rollNormal();
  res.send(`Result: ${result}`);
});

app.get('/action/:value', (req, res) => {
  let startingValue = parseInt(req.params.value);
  result = rollPossibility(startingValue);
  res.send(`Result: ${result}`);
});

app.get('/action/:value/up', (req, res) => {
  let startingValue = parseInt(req.params.value);
  result = rollUp(startingValue);
  res.send(`Result: ${result}`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.startsWith('!action')) {
    msg.reply(action(msg.content));
  }
});

const token = process.env.DISCORD_TORG_BOT_TOKEN;
if (token === undefined) {
 console.log('Could not find token');
} else {
  client.login(token);
}
