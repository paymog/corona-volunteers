import datetime

from flask import Flask, render_template, jsonify, request
import google
from google.oauth2.id_token import verify_firebase_token
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/api/')
def root():
    return jsonify("hello world from GAE"), 200



@app.route('/api/top_users')
def top_users():
    if 'Authorization' in request.headers:
        id_token = request.headers['Authorization'].split(' ').pop()

        claims = verify_firebase_token(
            id_token, request)
        if not claims:
            return 'Unauthorized', 401

    return jsonify([{'name': 'bob'}, {'name': 'jim'}])


@app.after_request
def after_request(response):
    # Needed to simplify CORS
    # TODO don't have this when we go to prod
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    # Flask's development server will automatically serve static files in
    # the "static" directory. See:
    # http://flask.pocoo.org/docs/1.0/quickstart/#static-files. Once deployed,
    # App Engine itself will serve those files as configured in app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
