from urllib import request
from flask import Flask, render_template, redirect, url_for

app = Flask(__name__) #defining the flask app

#home page url.
@app.route('/')
def home():
    return render_template("nilu.html")

#about page.
@app.route('/about')
def about():
    return render_template("about.html")

#projects page url.
@app.route('/projects')
def projects():
    return render_template("projects.html")

#skills page.
@app.route('/skills')
def skills():
    return render_template("skills.html")

#contact info page.
@app.route('/contact')
def contact():
    return render_template("contact_info.html")

#work experience page.
@app.route('/work')
def work():
    return render_template("work_experience.html")