import os
from flask import Flask, render_template, redirect, request, jsonify
from flask_request_params import bind_request_params

app = Flask(__name__, static_url_path='/static')
app.before_request(bind_request_params)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/arcade')
def arcade():
    return render_template('arcade.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=80)
