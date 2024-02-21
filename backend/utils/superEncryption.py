from utils.extendedVigenereCipher import extendedVigenereEncrypt, extendedVigenereDecrypt

def transpositionEncrypt(plain_text, key):
  #encrypt using transposition
  encrypted_text = ''
  for i in range(key):
    encrypted_text += plain_text[i::key]
  return encrypted_text

def transpositionDecrypt(cipher_text, key):
  #decrypt using transposition
  decrypted_text = ''
  for i in range(len(cipher_text) // key + 1):
    decrypted_text += cipher_text[i::len(cipher_text) // key + 1]
  return decrypted_text

#create super encryption function
def superEncrypt(plain_text, key):
  #encrypt using extended vigenere
  encrypted_text = extendedVigenereEncrypt(plain_text, key)
  #encrypt using transposition
  encrypted_text = transpositionEncrypt(encrypted_text, len(key))
  return encrypted_text

#create super decryption function
def superDecrypt(cipher_text, key):
  #decrypt using transposition
  decrypted_text = transpositionDecrypt(cipher_text, len(key))
  #decrypt using extended vigenere
  decrypted_text = extendedVigenereDecrypt(decrypted_text, key)
  return decrypted_text