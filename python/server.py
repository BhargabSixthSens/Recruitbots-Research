from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
import requests

# Load environment variables from .env file
load_dotenv()

DAILY_CALL_API_KEY = os.getenv('DAILY_CO_API_KEY')

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/meeting', methods=['POST'])
def create_meeting():
    data = request.get_json()
    name = data.get('name')
    
    if not name:
        return jsonify({'error': 'Name is required'}), 400

    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {DAILY_CALL_API_KEY}'
    }
    
    payload = {
        'name': name,
        'privacy': 'private',
        'properties': {
            'start_audio_off': True,
            'start_video_off': True
        }
    }
    
    response = requests.post('https://api.daily.co/v1/rooms/', headers=headers, json=payload)
    
    if response.status_code == 200:
        return jsonify(response.json()), 200
    else:
        return jsonify({'error': response.text}), response.status_code

@app.route('/meeting-token', methods=['POST'])
def create_meeting_token():
    data = request.get_json()
    name = data.get('name')
    
    if not name:
        return jsonify({'error': 'Name is required'}), 400

    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {DAILY_CALL_API_KEY}'
    }
    
    payload = {
        'properties': {
            'room_name': name
        }
    }
    
    response = requests.post('https://api.daily.co/v1/meeting-tokens', headers=headers, json=payload)
    
    if response.status_code == 200:
        return jsonify(response.json()), 200
    else:
        return jsonify({'error': response.text}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
