# Demo app for analyzing webpage keywords

## Contents

* REST API (`/server`)
* front-end (`/client`)

## Features

App allows for fetching meta keywords of a web page and show a summary of occurrences of each keyword in page's text.

Server is a REST API endpoint writen in Python/Flask.

Client is a standalone front-end application written with React and ES Next.

Server and Client are decoupled from each other and can be deployed separately.
 
## Local setup

### API endpoint

1. Setup virtualenv and install dependencies

```
cd server/
virtualenv .venv -p python3.6
source .venv/bin/activate
pip install -r requirements.txt
```



2. Start the local server 
  
```
python api.py
```

Example command to test the server:

```
curl -d 'url=https://searchenginewatch.com/2016/05/16/how-to-write-meta-title-tags-for-seo-with-good-and-bad-examples/' http://127.0.0.1:5000/keywords

```
 
### Client app

Requires Node and NPM installed in order to build from sources

1. Setup

```
cd client/
npm i
num run build
```

2. Start the App 
  
Bundled client assets are exported to `/client/static/dist`. Client App can be run either locally by opening the `/client/static/index.html` file or copied over to the server directory. (In this case copy the entire `static/` dir from `client/` to `server/` and it should be accessible from root location, by default `http://127.0.0.1:5000/`)   