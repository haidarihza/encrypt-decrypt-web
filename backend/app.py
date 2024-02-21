from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

from utils.vigenereCipher import vigenereEncrypt, vigenereDecrypt
from utils.autoKeyVigenereCipher import autoKeyVigenereEncrypt, autoKeyVigenereDecrypt
from utils.extendedVigenereCipher import extendedVigenereEncrypt, extendedVigenereDecrypt
from utils.playFairCipher import playFairEncrypt, playFairDecrypt
from utils.affineCipher import affineEncrypt, affineDecrypt

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

@app.route('/auto-key-vigenere/encrypt', methods=['POST'])
@cross_origin()
def autoKeyVigenereEncryptRoute():
  data = request.get_json(force=True)
  plain_text = data['plain_text']
  key = data['key']
  encrypted_text = autoKeyVigenereEncrypt(plain_text, key)
  return jsonify({'encrypted_text': encrypted_text})

@app.route('/auto-key-vigenere/decrypt', methods=['POST'])
@cross_origin()
def autoKeyVigenereDecryptRoute():
  data = request.get_json(force=True)
  cipher_text = data['cipher_text']
  key = data['key']
  decrypted_text = autoKeyVigenereDecrypt(cipher_text, key)
  return jsonify({'decrypted_text': decrypted_text})

@app.route('/extended-vigenere/encrypt', methods=['POST'])
@cross_origin()
def extendedVigenereEncryptRoute():
  data = request.get_json(force=True)
  plain_text = data['plain_text']
  key = data['key']
  encrypted_text = extendedVigenereEncrypt(plain_text, key)
  return jsonify({'encrypted_text': encrypted_text})

@app.route('/extended-vigenere/decrypt', methods=['POST'])
@cross_origin()
def extendedVigenereDecryptRoute():
  data = request.get_json(force=True)
  cipher_text = data['cipher_text']
  key = data['key']
  decrypted_text = extendedVigenereDecrypt(cipher_text, key)
  return jsonify({'decrypted_text': decrypted_text})

@app.route('/playfair/encrypt', methods=['POST'])
@cross_origin()
def playFairEncryptRoute():
  data = request.get_json(force=True)
  plain_text = data['plain_text']
  key = data['key']
  encrypted_text = playFairEncrypt(plain_text, key)
  return jsonify({'encrypted_text': encrypted_text})

@app.route('/playfair/decrypt', methods=['POST'])
@cross_origin()
def playFairDecryptRoute():
  data = request.get_json(force=True)
  cipher_text = data['cipher_text']
  key = data['key']
  decrypted_text = playFairDecrypt(cipher_text, key)
  return jsonify({'decrypted_text': decrypted_text})

@app.route('/affine/encrypt', methods=['POST'])
@cross_origin()
def affineEncryptRoute():
  data = request.get_json(force=True)
  plain_text = data['plain_text']
  m = data['m']
  b = data['b']
  encrypted_text = affineEncrypt(plain_text, m, b)
  return jsonify({'encrypted_text': encrypted_text})

@app.route('/affine/decrypt', methods=['POST'])
@cross_origin()
def affineDecryptRoute():
  data = request.get_json(force=True)
  cipher_text = data['cipher_text']
  m = data['m']
  b = data['b']
  decrypted_text = affineDecrypt(cipher_text, m, b)
  return jsonify({'decrypted_text': decrypted_text})

if __name__ == '__main__':
  app.run(debug=True)