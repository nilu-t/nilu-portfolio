from flask import Flask, render_template, redirect, url_for

app = Flask(__name__) #defining the flask app

#home page url.
@app.route('/')
def home():
    return render_template("nilu.html")

#about page.
@app.route('/about')
def about():
    return "This is the about page. Under construction."

#projects page url.
@app.route('/projects')
def projects():
    return render_template("projects.html")

#skills page.
@app.route('/skills')
def skills():
    return "This is the skills page. Under construction."

#contact info page.
@app.route('/contact')
def contact():
    return "This is the contact info page. Under construction."

#mini games page.
@app.route('/mini_games')
def games():
    return "This is the mini games page. Under construction."