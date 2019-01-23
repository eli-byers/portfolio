import os
from flask import Flask, render_template, redirect, request, jsonify
from dotenv import load_dotenv

app = Flask(__name__, static_url_path='/static')

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/arcade')
def arcade():
    return render_template('arcade.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=80)
