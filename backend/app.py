import flask
from flask import jsonify
from flask import request
from flask_cors import CORS
import time
import os
import torch
from sentence_transformers import SentenceTransformer, util
from talk3 import get_chatbot_response
from yamlDB import yamlDB

app = flask.Flask(__name__)
app.secret_key = 'hatsune_miku'

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Function to open a file and return its contents as a string
def open_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as infile:
        return infile.read()

@app.route('/')
def index():
    return jsonify(message='Hello, CORS!')

@app.route('/test')
def test():
    return {"Test": ["Test1", "Test2", "Test3"]}

@app.route('/sendTranscript', methods=['POST'])
def sendTranscript():
    data = request.get_json()
    user_input = data["content"]
        
    conversation_history = []
    #conversation_history.append({'role' : 'system', 'content' : "Hello, how was your day?"})
    system_message = open_file("chatbot2.txt")
    # Load the sentence transformer model
    model = SentenceTransformer("all-MiniLM-L6-v2")

    # Load the initial content from the vault.txt file
    vault_content = []
    if os.path.exists("vault.txt"):
        with open("vault.txt", "r", encoding="utf-8") as vault_file:
            vault_content = vault_file.readlines()
    # Create embeddings for the initial vault content
    vault_embeddings = model.encode(vault_content) if vault_content else []
    vault_embeddings_tensor = torch.tensor(vault_embeddings)
    conversationStarted = False

    n_conversation_history, n_conversationStarted, n_vault_embeddings, n_vault_embeddings_tensor, system_message, vault_content, model = get_chatbot_response(user_input, conversation_history, conversationStarted, vault_embeddings, vault_embeddings_tensor, system_message, vault_content, model)
    conversation_history = n_conversation_history
    conversationStarted = n_conversationStarted
    vault_embeddings = n_vault_embeddings
    vault_embeddings_tensor = n_vault_embeddings_tensor
    response = conversation_history[-1]
    return jsonify(response)

@app.route('/sendJournal', methods=['POST'])
def sendJournal():
    data = request.json
    entry = data['content']
    # TODO save to vault.txt

    db = yamlDB()
    db.inject(data)

    return "success!"

@app.route('/getJournals', methods=['GET'])
def getJournals():
    db = yamlDB()
    data = db.getAll()
    return data

if __name__ == '__main__':
    app.run(debug=True, port=8080)