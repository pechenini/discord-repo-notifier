const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.DISCORD_TOKEN)
const app = express();

app.use(bodyParser.json());

app.post('/pull-request/create', function (req, res) {
  const { pullrequest } = req.body;
  const prLink = pullrequest.links.html.href;
  const message = `**${pullrequest.author.display_name}**💻 created a pull request **${pullrequest.title}**. Check this out: ${prLink}`;
  const prChannel = client.channels.find(channel => channel.name == process.env.PR_CHANNEL);
  
  if (!prChannel) {
      console.log(`pr channel ${process.env.PR_CHANNEL} was not found.`)
      res.send('Done');
      return
  }

  prChannel.send(message)
  console.log(message);
  res.send('Done');
});

app.post('/build/status/update', function (req, res) {
    const data = req.body;
    const { url, name, state } = data.commit_status;
     
    let message = `Build in progress`;
    
    if (state == "SUCCESSFUL") {
        message = `Build for commit **${name}** is ✅**${state}**✅. Check this out: ${url}`;
    } else if (state == "FAILED") {
        message = `Build for commit **${name}** is ⛔️**${state}**⛔️. Check this out: ${url}`;
    } else {
        return;
    }

    const buildChannel = client.channels.find(channel => channel.name == process.env.BUILD_CHANNEL);
    
    if (!buildChannel) {
        console.log(`build channel ${process.env.BUILD_CHANNEL} was not found.`)
        res.send('Done');
        return
    }
  
    buildChannel.send(message)
    console.log(message);
    res.send('Done');
});

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port 3000!');
});