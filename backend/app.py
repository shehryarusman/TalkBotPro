import flask
from flask import jsonify
from flask import request
from flask_cors import CORS
import time
from yamlDB import yamlDB

app = flask.Flask(__name__)
app.secret_key = 'hatsune_miku'

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/')
def index():
    return jsonify(message='Hello, CORS!')

@app.route('/test')
def test():
    return {"Test": ["Test1", "Test2", "Test3"]}

@app.route('/sendTranscript', methods=['POST'])
def sendTranscript():
    data = request.json
    print(data)
    
    return jsonify({'user'    : 'system',
                    'content' : 'lol this is an example'})

@app.route('/sendJournal', methods=['POST'])
def sendJournal():
    data = request.json
    entry = data['content']

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