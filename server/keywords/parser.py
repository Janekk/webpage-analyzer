import re

import requests
from bs4 import BeautifulSoup
from bs4.element import Comment


class KeywordsParser():
    def __init__(self, url: str):
        self.url = url
        self.soup = None

    def __str__(self):
        return f'<KeywordsParser url={self.url}>'

    def parse(self):
        res = requests.get(self.url)
        if res.ok:
            self.soup = BeautifulSoup(res.content, 'html.parser')
            keywords = self.get_keywords()
            return self.get_occurrences(keywords)

    def get_keywords(self):
            keyword_tags = self.soup.find_all('meta', attrs={'name': re.compile('^keywords$', re.I)})
            keyword_contents = [kt['content'] for kt in keyword_tags]
            keywords = [re.split(r',\s*', kc) for kc in keyword_contents]
            keywords = sum(keywords, [])
            return keywords

    def get_text_from_html(self):
        texts = self.soup.findAll(text=True)
        visible_texts = filter(self.is_tag_visible, texts)
        return ' '.join(t.strip() for t in visible_texts)

    @staticmethod
    def is_tag_visible(element):
        if element.parent.name in ['style', 'script', 'head', 'title', 'meta', '[document]']:
            return False
        if isinstance(element, Comment):
            return False
        return True

    def get_occurrences(self, keywords: list) -> list:
        text = self.get_text_from_html()
        result = []

        for keyword in keywords:
            count = 0
            location = -1
            while True:
                location = text.find(keyword, location + 1)
                if location == -1:
                    break
                count += 1
            result.append({'keyword': keyword, 'count': count})
        return result

