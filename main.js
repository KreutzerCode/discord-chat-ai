const Discord = require("discord.js");
require("dotenv").config();
const fs = require("fs");

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});
client.login(process.env.DISCORD_TOKEN);
client.on("ready", () => {
  console.log(
    `Clara Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels`
  );
  client.user.setActivity(`hot and bored`);
});

client.on("messageCreate", async (message) => {

  if (message.author.bot) return;
  if (!message.content) return;

  message.channel.sendTyping();

  const spawn = require("child_process").spawn;
  const process = spawn("python", ["./GPT3-ChatBot.py", message.content]);

  process.stdout.on("data", (data) => {
    let response = data.toString().trim();
    if(response.length < 1) response = "...";
    message.channel.send(response);
  });
});