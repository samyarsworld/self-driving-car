from flask import Flask, request,jsonify
from flask_cors import CORS

app = Flask("__main__")
CORS(app)

x, y = 0, 0

class Car:
    def __init__(self, x, y, width, height):
        self.x = x
        self.y = y
        self.width = width
        self.height = height

@app.route("/", methods = ['POST', 'GET'])
def move():
    if request.method == 'POST':
        print('hey', request.POST)
        return jsonify({"val":"Go left!"})
    else:
        global x
        x += 10
        global y
        y += 10
        return jsonify({"x": x, "y":y})


if __name__ == "__main__":
    app.run(debug=True)
