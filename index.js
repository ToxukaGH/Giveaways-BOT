const express = require('express');
const app = express();

app.listen(() => console.log('Toxuka'));
app.listen(() => console.log('leyon'));
app.use('/ping', (req, res) => {
	res.send(new Date());
});


const Discord = require('discord.js');
const client = new Discord.Client();
let fs = require('fs');
const { prefix, token } = require('./config.json');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.on('message', async message => {
  if (message.content.startsWith(`${prefix}`)) {
    let file_name = `${message.content.split(' ')[0].replace(prefix, '')}.js`;
    if(!fs.existsSync('./commands/' + file_name)) return undefined;
    if(fs.existsSync('./commands/' + file_name)) {
      client.commands.get(file_name.replace('.js', '')).execute(client, message);
    }
  }
});

client.login(token);
