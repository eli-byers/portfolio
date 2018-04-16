import os
from flask import Flask, render_template, redirect, request, jsonify
from dotenv import load_dotenv
from flask_mail import Mail, Message

app = Flask(__name__, static_url_path='/static')

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

app.config.update(dict(
    DEBUG = True,
    MAIL_SERVER = 'smtp.gmail.com',
    MAIL_PORT = 587,
    MAIL_USE_TLS = True,
    MAIL_USE_SSL = False,
    MAIL_USERNAME = os.getenv('MAIL_USERNAME'),
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD'),
))

mail = Mail(app)

@app.route('/')
def index():
    print "Test"
    return render_template('index.html')

@app.route('/contact', methods=['post'])
def contact():
    print "This is only a test post"
    name = request.form['name']
    email = request.form['email']
    phone = request.form['phone']
    message = request.form['message']
    me = os.getenv('MAIL_USERNAME')

    subject = "Contact Form: {}".format(name)
    msgStr='{}<br>{}<br>{}<br><br>{}'.format(name, email, phone, message)

    msg = Message(sender=email, reply_to=email, subject=subject, html=msgStr, recipients=[me])
    try:
        mail.send(msg)
        return jsonify({'status':True})
    except Exception as e:
        print e
        return jsonify({'status':False})


if __name__ == "__main__":
    # app.run(host='0.0.0.0', debug=True, port=80)

    app.run(host='0.0.0.0', debug=True)