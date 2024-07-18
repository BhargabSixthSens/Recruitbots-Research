import requests
import time

class DeepgramTTS:
    def __init__(self, api_key, microphone, logger):
        self.api_key = api_key
        self.microphone = microphone
        self.logger = logger

    def text_to_speech(self, text):
        url = 'https://api.deepgram.com/v1/speak?model=aura-asteria-en&encoding=linear16&sample_rate=16000'
        headers = {
            'Authorization': f'Token {self.api_key}',
            'Content-Type': 'application/json'
        }
        data = {
            'text': text
        }

        response = requests.post(url, headers=headers, json=data)
        if response.status_code == 200:
            audio = response.content
            self.handle_audio(audio)
        else:
            self.logger.error(f"Deepgram API request failed with status code {response.status_code}: {response.text}")

    def handle_audio(self, audio):
        self.logger.info("!!! Starting speaking")
        start = time.time()
        b = bytearray()
        smallest_write_size = 3200
        try:
            for i in range(0, len(audio), smallest_write_size):
                chunk = audio[i:i + smallest_write_size]
                b.extend(chunk)
                l = len(b) - (len(b) % smallest_write_size)
                if l:
                    self.microphone.write_frames(bytes(b[:l]))
                    b = b[l:]

            if len(b):
                self.microphone.write_frames(bytes(b))
        except Exception as e:
            self.logger.error(f"Exception in handle_audio: {e}")
        finally:
            self.logger.info(f"!!! Finished speaking in {time.time() - start} seconds")
