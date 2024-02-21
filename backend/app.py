from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import numpy as np

from utils.vigenereCipher import vigenereEncrypt, vigenereDecrypt
from utils.autoKeyVigenereCipher import autoKeyVigenereEncrypt, autoKeyVigenereDecrypt
from utils.extendedVigenereCipher import (
    extendedVigenereEncrypt,
    extendedVigenereDecrypt,
)
from utils.playFairCipher import playFairEncrypt, playFairDecrypt
from utils.affineCipher import affineEncrypt, affineDecrypt
from utils.hillCipher import hillEncrypt, hillDecrypt
from utils.superEncryption import superEncrypt, superDecrypt

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


@app.route("/")
@cross_origin()
def home():
    return jsonify({"message": "Hello, World!"})


@app.route("/vigenere/encrypt", methods=["POST"])
@cross_origin()
def vigenerEncryptRoute():
    data = request.get_json(force=True)
    plain_text = data["plain_text"]
    key = data["key"]
    encrypted_text = vigenereEncrypt(plain_text, key)
    return jsonify({"encrypted_text": encrypted_text})


@app.route("/vigenere/decrypt", methods=["POST"])
@cross_origin()
def vigenerDecryptRoute():
    data = request.get_json(force=True)
    cipher_text = data["cipher_text"]
    key = data["key"]
    decrypted_text = vigenereDecrypt(cipher_text, key)
    return jsonify({"decrypted_text": decrypted_text})


@app.route("/auto-key-vigenere/encrypt", methods=["POST"])
@cross_origin()
def autoKeyVigenereEncryptRoute():
    data = request.get_json(force=True)
    plain_text = data["plain_text"]
    key = data["key"]
    encrypted_text = autoKeyVigenereEncrypt(plain_text, key)
    return jsonify({"encrypted_text": encrypted_text})


@app.route("/auto-key-vigenere/decrypt", methods=["POST"])
@cross_origin()
def autoKeyVigenereDecryptRoute():
    data = request.get_json(force=True)
    cipher_text = data["cipher_text"]
    key = data["key"]
    decrypted_text = autoKeyVigenereDecrypt(cipher_text, key)
    return jsonify({"decrypted_text": decrypted_text})


@app.route("/extended-vigenere/encrypt", methods=["POST"])
@cross_origin()
def extendedVigenereEncryptRoute():
    data = request.get_json(force=True)
    plain_text = data["plain_text"]
    key = data["key"]
    encrypted_text = extendedVigenereEncrypt(plain_text, key)
    return jsonify({"encrypted_text": encrypted_text})


@app.route("/extended-vigenere/decrypt", methods=["POST"])
@cross_origin()
def extendedVigenereDecryptRoute():
    data = request.get_json(force=True)
    cipher_text = data["cipher_text"]
    key = data["key"]
    decrypted_text = extendedVigenereDecrypt(cipher_text, key)
    return jsonify({"decrypted_text": decrypted_text})


@app.route("/playfair/encrypt", methods=["POST"])
@cross_origin()
def playFairEncryptRoute():
    data = request.get_json(force=True)
    plain_text = data["plain_text"]
    key = data["key"]
    encrypted_text = playFairEncrypt(plain_text, key)
    return jsonify({"encrypted_text": encrypted_text})


@app.route("/playfair/decrypt", methods=["POST"])
@cross_origin()
def playFairDecryptRoute():
    data = request.get_json(force=True)
    cipher_text = data["cipher_text"]
    key = data["key"]
    decrypted_text = playFairDecrypt(cipher_text, key)
    return jsonify({"decrypted_text": decrypted_text})


@app.route("/affine/encrypt", methods=["POST"])
@cross_origin()
def affineEncryptRoute():
    data = request.get_json(force=True)
    plain_text = data["plain_text"]
    m = data["m"]
    b = data["b"]
    encrypted_text = affineEncrypt(plain_text, m, b)
    return jsonify({"encrypted_text": encrypted_text})


@app.route("/affine/decrypt", methods=["POST"])
@cross_origin()
def affineDecryptRoute():
    data = request.get_json(force=True)
    cipher_text = data["cipher_text"]
    m = data["m"]
    b = data["b"]
    decrypted_text = affineDecrypt(cipher_text, m, b)
    return jsonify({"decrypted_text": decrypted_text})


@app.route("/hill/encrypt", methods=["POST"])
@cross_origin()
def hillEncryptRoute():
    data = request.get_json(force=True)
    plain_text = data["plain_text"]
    # key in 2d array
    key = data["key"]
    # # convert key to 2d array
    # key = np.array(key).reshape(int(len(key) ** 0.5), int(len(key) ** 0.5))
    encrypted_text = hillEncrypt(plain_text, key)
    return jsonify({"encrypted_text": encrypted_text})


@app.route("/hill/decrypt", methods=["POST"])
@cross_origin()
def hillDecryptRoute():
    data = request.get_json(force=True)
    cipher_text = data["cipher_text"]
    # key in 2d array
    key = data["key"]
    # #convert key to 2d array
    # key = np.array(key).reshape(int(len(key)**0.5), int(len(key)**0.5))
    decrypted_text = hillDecrypt(cipher_text, key)
    return jsonify({"decrypted_text": decrypted_text})


@app.route("/super/encrypt", methods=["POST"])
@cross_origin()
def superEncryptRoute():
    data = request.get_json(force=True)
    plain_text = data["plain_text"]
    key = data["key"]
    encrypted_text = superEncrypt(plain_text, key)
    return jsonify({"encrypted_text": encrypted_text})


@app.route("/super/decrypt", methods=["POST"])
@cross_origin()
def superDecryptRoute():
    data = request.get_json(force=True)
    cipher_text = data["cipher_text"]
    key = data["key"]
    decrypted_text = superDecrypt(cipher_text, key)
    return jsonify({"decrypted_text": decrypted_text})


if __name__ == "__main__":
    app.run(debug=True)
