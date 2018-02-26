from flask_restful import reqparse
from .parser import KeywordsParser
from flask_restful import Resource
import validators


class KeywordsView(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('url', required=True, type=str, help='URL of a page to scrape')
        args = parser.parse_args(strict=True)
        url = args['url']
        if not validators.url(url):
            return {'url': 'Invalid URL'}, 400

        parser = KeywordsParser(url)
        return parser.parse()
