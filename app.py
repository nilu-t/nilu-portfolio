from flask import Flask, render_template, url_for

app = Flask(__name__) #defining the flask app

#home page url.
@app.route('/')
def home():
    return render_template("nilu.html")

#projects page url.
@app.route('/projects')
def projects():
    return render_template("projects.html")
