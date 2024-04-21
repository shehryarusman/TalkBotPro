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
import json

app = flask.Flask(__name__)
app.secret_key = 'hatsune_miku'

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Function to open a file and return its contents as a string
def open_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as infile:
        return infile.readlines()

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
    # TODO check for emergency from user_input before chatting further
    
    conversation_history = [{"role":"assistant", "content":"Hi, how have you been?"}]
    with open("conversation.json", "r") as f:
        conversation = json.load(f)
    if len(conversation["chat"]) > 0:
        conversation_history = conversation["chat"]
    system_message = "".join(open_file("chatbot2.txt"))
    # Load the sentence transformer model
    model = SentenceTransformer("all-MiniLM-L6-v2")

    # Load the initial content from the vault.txt file
    vault_content = open_file("vault.txt")
    vault_embeddings_tensor = torch.load("vault_embeddings_tensor.pth")
    conversation_history = get_chatbot_response(user_input, conversation_history, vault_embeddings_tensor, system_message, vault_content, model)
    response = conversation_history[-1]
    with open("conversation.json", "w") as f:
        json.dump({"chat": conversation_history}, f)
    return {"role":"assistant", "content": response}

@app.route('/sendJournal', methods=['POST'])
def sendJournal():
    data = request.json
    entry = data['content']
    with open("vault.txt", "a", encoding="utf-8") as vault_file:
        vault_file.write("\nThis is a personal journal entry, only use this if you need to check up on the user::\n")
        vault_file.write(entry)
        vault_file.write("\n\n")
    vault_content = open_file("vault.txt")
    model = SentenceTransformer("all-MiniLM-L6-v2")
    vault_embeddings = model.encode(vault_content) if vault_content else []
    vault_embeddings_tensor = torch.tensor(vault_embeddings)
    torch.save(vault_embeddings_tensor, "vault_embeddings_tensor.pth")

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