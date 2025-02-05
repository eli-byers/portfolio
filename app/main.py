from flask import Flask, render_template, redirect, request, jsonify
app = Flask(__name__, static_url_path='/static')


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=80)
