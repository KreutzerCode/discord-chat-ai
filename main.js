const fs = require("fs");
const Discord = require("discord.js");
const {Configuration, OpenAIApi} = require("openai");
require("dotenv").config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

let {backstory, predefinedConversations, userConversations} = JSON.parse(fs.readFileSync('./chatData.json', 'utf8'));
let chatHistoryString = "";
const maxChatHistory = process.env.MAX_CHAT_HISTORY || 100;

client.login(process.env.DISCORD_TOKEN);
client.on("ready", () => {
    console.log(
        `Discord Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels`
    );
});

client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.content || message.length < 2) return;

    message.channel.sendTyping();

    let botAnswer = await returnBotAnswer(message.content);
    if (botAnswer.length < 1) {
        botAnswer = "..."
    } else {
        addConversationToChatHistory(message.content, botAnswer);
    }

    message.channel.send(botAnswer);
});

function addConversationToChatHistory(message, answer) {
    chatHistoryString = chatHistoryString.concat("\nHuman: ", message, "\nAI: ", answer);

    if (userConversations.length >= maxChatHistory) {
        userConversations.shift();
    }

    userConversations.push({
        human: message,
        ai: answer
    });

    saveConversationsToJsonFile();
}

function saveConversationsToJsonFile() {
    const data = {
        backstory,
        predefinedConversations,
        userConversations,
    }

    // write file to disk
    fs.writeFile('./chatData.json', JSON.stringify(data), 'utf8', (err) => {
        if (err) {
            // console.log(`Error writing file: ${err}`);
        } else {
            //  console.log(`File is written successfully!`);
        }
    });
}

function createChatHistoryString() {
    predefinedConversations.forEach(conversation => {
        chatHistoryString = chatHistoryString.concat("\nHuman: ", conversation.human, "\nAI: ", conversation.ai);
    });

    userConversations.forEach(conversation => {
        chatHistoryString = chatHistoryString.concat("\nHuman: ", conversation.human, "\nAI: ", conversation.ai);
    });
}

async function returnBotAnswer(message) {
    const response = await openai.createCompletion("text-davinci-002", {
        prompt: backstory.concat(chatHistoryString || createChatHistoryString(), " Human: ", message, " AI:"),
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        stop: [" Human:", " AI:"],
    });

    return response['data'].choices[0].text.toString().trim();
}
