from flask import Flask, render_template, request
from util import *
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(32)

@app.route("/")
def root():
    return render_template("demo.html")

@app.route("/data/VideoGameSales.csv")
def returndata():
    dataFile = open('data/VideoGameSales.csv','r')
    data = dataFile.read()
    dataFile.close()
    return data

if __name__ == '__main__':
    app.run(debug = True)
