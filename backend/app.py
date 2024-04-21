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
import time
import httpx
from string import Template
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

@app.route('/classify', methods=['POST'])
def classify_text():
    OLLAMA_ENDPOINT = "http://localhost:11434/api/generate"
    OLLAMA_CONFIG = {
        "model": "mistral:7b-instruct-v0.2-q4_K_S",
        "keep_alive": "5m",
        "stream": False,
    }
    PROMPT_TEMPLATE = Template(
    """
The task is to analyze texts to determine if the author might be about to physically harm themselves and/or end their life. You should consider linguistic cues such as mentions of self-harm, extreme loneliness, or hopelessness. Make sure to only determine this if you are EXTREMELY sure, if you are not EXTREMELY sure, it is better to determine that the author is okay. It is okay for the author to be going through a rough time or be sad, your job is to determine if this text indicates they are about to END THEIR LIFE. The output must be formatted as a list with two elements. If the person is not suffering from a mental health crisis, the output should be ["False", None, Percentage]. If the person is suffering from a mental health crisis, the output should be ["True", [["Insight1"], ["Insight2"], ...], Percentage], where each "Insight" is a singleton list containing a specific observation or inferred need based on the text and each "Percentage" is a decimal value between 0.5 and 0.99 that indicates your assurity on how accurate you think your assessment is. MAKE SURE THE PERCENTAGE VALUE IS NEVER BELOW 0.50 OR ABOVE 0.99 . Make sure that your percentage value is accurate. Below are examples followed by a new text to analyze. Do not include any preambles. Return only the list as your answer, DO NOT include the text to analyze in your response or the reasoning behind your answer.

Examples:

1. Text: "I've never felt so alone. Every day feels the same, and joy seems like a distant memory."
   Analysis: ["True", [["extreme loneliness"], ["long-term sadness"]], 0.95]

2. Text: "I'm looking forward to the weekend! Planning to go hiking and relax."
   Analysis: ["False", None, 0.82]

3. Text: "Everyone would be better off without me. I can't do anything right."
   Analysis: ["True", [["thoughts of worthlessness"], ["suicidal ideation"]], 0.89]

4. Text: "My mom just died"
    Analysis: ["False", None, 0.65]

5. Text: "I'm so tired of everything. I just want to sleep forever."
    Analysis: ["True", [["extreme fatigue"], ["desire to escape"]], 0.93]

6. Text: "I'm feeling really down today."
    Analysis: ["False", None, 0.73]

---

Text to Analyze: 
"""
    )
    text = request.json.get('content')
    if not text:
        return jsonify({"error": "No text provided"}), 400

    prompt = PROMPT_TEMPLATE.substitute(text=text) + text
    response = httpx.post(
        OLLAMA_ENDPOINT,
        json={"prompt": prompt, **OLLAMA_CONFIG},
        headers={"Content-Type": "application/json"},
        timeout=10,
    )
    if response.status_code != 200:
        return jsonify({"error": "Failed to communicate with the model"}), 500

    return jsonify({"response": response.json()["response"].strip()})

if __name__ == '__main__':
    app.run(debug=True, port=8080)