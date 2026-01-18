from flask import Blueprint, request, jsonify
from google import genai
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
chatbot = Blueprint('chatbot', __name__)

# client = OpenAI(api_key=os.getenv('DEEPSEEK_API_KEY'), base_url="https://api.deepseek.com")

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
    client = genai.Client(api_key=os.getenv('api_key'))

    response = client.models.generate_content(
        model="gemini-2.5-flash", contents="You have to bring context anything related to the study of job market specially Cambodia related. Other things you have to tell them back that the scope is too big."
    )

    # print(os.getenv('DEEPSEEK_API_KEY'))
    
        
    # return response.choices[0].message.content

    return response.text