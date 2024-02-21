from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

from utils.vigenereCipher import vigenereEncrypt, vigenereDecrypt

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
@cross_origin()
def home():
  return jsonify({'message': 'Hello, World!'})

@app.route('/vigenere/encrypt', methods=['POST'])
@cross_origin()
def vigenerEncryptRoute():
  data = request.get_json(force=True)
  plain_text = data['plain_text']
  key = data['key']
  encrypted_text = vigenereEncrypt(plain_text, key)
  return jsonify({'encrypted_text': encrypted_text})

@app.route('/vigenere/decrypt', methods=['POST'])
@cross_origin()
def vigenerDecryptRoute():
  data = request.get_json(force=True)
  cipher_text = data['cipher_text']
  key = data['key']
  decrypted_text = vigenereDecrypt(cipher_text, key)
  return jsonify({'decrypted_text': decrypted_text})

if __name__ == '__main__':
  app.run(debug=True)