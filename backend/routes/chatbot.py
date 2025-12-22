from flask import Blueprint, request, jsonify
from google import genai
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
chatbot = Blueprint('chatbot', __name__)

client = OpenAI(api_key=os.getenv('DEEPSEEK_API_KEY'), base_url="https://api.deepseek.com")

@chatbot.route("/api/chatbot", methods = ['POST'])
def bot():
    data = request.json
    message = data.get("message")

    response = get_chat_bot(message)

    return jsonify({
        "message": response
    })


def get_chat_bot(msg):

    # client = OpenAI()

    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=[
            {"role": "system", "content": "You are a helpful assistant"},
            {"role": "user", "content": "Hello"},
        ],
        stream=False
    )

    # print(os.getenv('DEEPSEEK_API_KEY'))
    
        
    return response.choices[0].message.content