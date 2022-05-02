[![](https://img.shields.io/badge/discord.js-v13-blue.svg?logo=npm)](https://github.com/discordjs)
[![](https://img.shields.io/badge/openai-v2-blue.svg?logo=npm)](https://github.com/discordjs)

<img width="175" height="175" style="float: left; margin: 0 10px 0 0;" alt="Discord Chat AI" src="https://github.com/KreutzerCode/discord-chat-ai/blob/master/img/discord-chat-bot.png?raw=true">
<h3>Discord Chat-AI</h3>
<br>
<p>
    Discord Chat-AI is a project that is designed to take Discord's chatbots to the next level of conversation. With the power of GPT-3, it is possible to create unique characters with exciting or funny backstories that will amaze your Discord users.
</p>
<p>
    If you liked this project, feel free to leave a star ⭐ , it helps the project a lot! Thank you!
</p>
<br>
<br>


**🤖 Project**

Discord Chat-AI is a node js based Discord chatbot. It combines discord.js v13 with gpt-3 from openai to create interesting and exciting conversations.

+ Node v16+ <br>
+ openai v2+<br>
+ discord.js v13<br>

**What is GPT-3?**

GPT-3, or the third generation Generative Pre-trained Transformer, is a neural network machine learning model trained using internet data to generate any type of text. Developed by OpenAI, it requires a small amount of input text to generate large volumes of relevant and sophisticated machine-generated text.

GPT-3's deep learning neural network is a model with over **175 billion** machine learning parameters. To put things into scale, the largest trained language model before GPT-3 was Microsoft's Turing NLG model, which had 10 billion parameters.

Learn more about GPT-3 in [this great article](https://www.techtarget.com/searchenterpriseai/definition/GPT-3) and of course on [OpenAI's website](https://openai.com/blog/gpt-3-apps/)


**🚀 Bot features**

+ Easily configurable chatbot character properties<br>
+ Persistent memory<br>
+ Easy to set up<br>
+ Variable length of the chat history<br>
+ Easy to use<br>
 <br>  
 
**📁 Installation**

__Step 1.__
Run `npm install` after cloning the project to install the required dependencies.

__Step 2.__
Log in to your [Discord developer account](https://discord.com/developers/applications) and create a Discord bot.

__Step 3.__
Create a `.env` file in the project root and add the Discord token of the created bot in `DISCORD_TOKEN`.

__Step 4.__ 
Log in to your [OpenAI Account](https://beta.openai.com/account/api-keys) and add your API key in the `.env` file in the `OPENAI_API_KEY` field.

__Step 5.__
Start the Discord bot with the command `node .`.

__Step 6.__
Enjoy your bot !

 <br>  


**👨🏽‍💻 Configuration**

* Configure the backstory of your chatbot by editing the `backstory` property in the `chatData.json` file in the root directory of the project.

    ```
    {
        "backstory": "The following is a conversation with a chat AI created for Discord. The chat AI is helpful, creative, clever and very friendly."
    }
    ```

* Configure some predefined conversations to further specify the properties of the chatbot's responses. To do this, you need to edit the `predefinedConversations` property in the `chatData.json` file at the root of the project.

    ```
    {
        "predefinedConversations":[
            {
                "human":"Hello, who are you?",
                "ai":"I am an AI created by OpenAI. How can I help you today?"
            },
            {
                "human":"How are you today?",
                "ai":"I'm feeling great today. Thanks for speaking with me."
            },
            {
                "human":"What is your favorite thing to do?",
                "ai":"I love to chat with people like you!"
            }
    }
    ```

* Configure the maximum number of saved conversations by editing the `MAX_CHAT_HISTORY` property in the `.env` file in the project root directory.
 
    The default value is 100.

    ```
    MAX_CHAT_HISTORY = 69
    ```

---

## Contributing ✨

Feel free to contribute. Whether it's a feature request or a pull request, any kind of contribution is welcome!
