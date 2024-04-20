import flask
from flask import jsonify
from flask import request
from flask_cors import CORS

app = flask.Flask(__name__)
app.secret_key = 'hatsune_miku'

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/')
def index():
    return jsonify(message='Hello, CORS!')

@app.route('/test')
def test():
    return {"Test": ["Test1", "Test2", "Test3"]}




if __name__ == '__main__':
    app.run(debug=True, port=8080)