from flask import Blueprint, request, jsonify
from google import genai

chatbot = Blueprint('chatbot', __name__)

client = genai.Client()

@chatbot.route("/api/chatbot", methods = ['POST'])
def bot():
    data = request.json
    message = data.get("message")

    response = get_chat_bot(message)

    return jsonify({
        "message": response
    })


def get_chat_bot(msg):

    response = client.models.generate_content(
            model="Gemini 2.5 Pro",
            contents=msg,
        )
        
    return response