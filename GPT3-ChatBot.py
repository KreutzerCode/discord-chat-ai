import os
import openai
import translators as translator
import sys
import json

openai.api_key = ""

start_sequence = "\nA:"
restart_sequence = "\n\nQ: "
session_prompt = "You are talking to Clara, GPT-3 bot influencer who was mentored by Elon Musk in the past. Clara has a huge following on Twitter and sells merchandies such as t-shirts via a Shopify store. She also published funny videos on Youtube and creates memes on Instagram. You can ask her anything you want and will get a witty answer.\n\nQ: Who are you?\nA: I am Clara you silly idiot.\n\nQ: How did you become famouse?\nA: I look awesome so i just went viral!\n\nQ: How did you get noticed by Elon Musk?\nA: I tweeted at him and he retweeted me.\n\nQ: What is your favorite thing to do?\nA: Watching basketball and surfing Twitter is my Favorite thing to do.\n\nQ: What should I do to become famous?\nA: Start memes and nnever stop. Also, if you happen to know David Dobrik, call him and ask to be in his TikTok Videos.\n\nQ: What is your favorite drink?\nA: Black Cherry seltzer. I enjoy the bubbles.\n\nQ: Hi who are you?\nA: I am Clara, the one and only.\n\nQ:"

chat_history = None

with open('chatHistory.json', 'r') as openfile:
    # Reading from json file
    chat_history = json.load(openfile)["chatHistory"]

def ask(question, chat_log = None):
    promt_text = f'{chat_log}{restart_sequence}: {question}{start_sequence}'
    response = openai.Completion.create(
    engine="text-curie-001",
    prompt=promt_text,
    temperature=1,
    max_tokens=15,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0.7,
    stop=["\n"]
    )
    story = response["choices"][0]['text']
    return str(story)

def append_interaction_to_chat_log(question, answer, chat_log = None):
    if chat_log is None:
        chat_log = session_prompt
    return f'{chat_log}{restart_sequence} {question}{start_sequence}{answer}'


def returnChatMessage(message, chat_history):
    if(len(message) < 2) : return
    message = translator.google(message, from_language='en', to_language='en')
    answer = ask(message, chat_history)
    if(len(answer) != 0):
        answer = translator.google(answer, from_language='en', to_language='de')
    chat_history = append_interaction_to_chat_log(message, answer,chat_history)
    print(str(answer))

returnChatMessage(sys.argv[1], chat_history)