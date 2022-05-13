from flask import Flask, render_template, url_for

app = Flask(__name__) #defining the flask app

@app.route('/')
def home():
    return render_template("nilu.html")

@app.route('/projects')
def projects():
    return render_template("projects.html")
