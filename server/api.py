from flask import Flask
from flask_restful import Api
from keywords.views import KeywordsView
from flask_cors import CORS

app = Flask(__name__, static_url_path='')
CORS(app)


@app.route('/')
def root():
    return app.send_static_file('index.html')


api = Api(app)
api.add_resource(KeywordsView, '/keywords')

if __name__ == '__main__':
    app.run(debug=True)
