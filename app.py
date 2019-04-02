from flask import Flask, render_template, request
from util import *
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(32)

@app.route("/")
def root():
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug = True)
