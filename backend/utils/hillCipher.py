import numpy as np
from egcd import egcd

#create function to encrypt using hill cipher
def padding(plain_text, key_length):
  while len(plain_text) % key_length != 0:
    plain_text += 'X'
  return plain_text

def hillEncrypt(plain_text, key):
  #clear non-alphabetic characters and remove space from plain text and key
  plain_text = ''.join(e for e in plain_text if e.isalpha())

  #make the plain text and key uppercase
  plain_text = plain_text.upper()
  #padding the plain text
  plain_text = padding(plain_text, len(key))
  plain_text_chunks = [plain_text[i:i+len(key)] for i in range(0, len(plain_text), len(key))]

  #enrypt using np
  encrypted_text = ''
  for chunk in plain_text_chunks:
    #change chunk to number
    chunk_vector = np.array([ord(c) - 65 for c in chunk])
    #multiply matrix
    encrypted_chunk_vector = np.dot(key, chunk_vector) % 26
    #change number to character
    encrypted_chunk = ''.join([chr(c + 65) for c in encrypted_chunk_vector])
    encrypted_text += encrypted_chunk
  return encrypted_text

def inverseMatrix(matrix, mod=26):
    det = int(np.round(np.linalg.det(matrix)))  # Step 1)
    det_inv = egcd(det, mod)[1] % mod  # Step 2)
    matrix_modulus_inv = (
        det_inv * np.round(det * np.linalg.inv(matrix)).astype(int) % mod
    )  # Step 3)

    return matrix_modulus_inv

def hillDecrypt(cipher_text, key):
  #clear non-alphabetic characters and remove space from plain text and key
  cipher_text = ''.join(e for e in cipher_text if e.isalpha())

  #make the plain text and key uppercase
  cipher_text = cipher_text.upper()
  #padding the plain text
  cipher_text = padding(cipher_text, len(key))
  cipher_text_chunks = [cipher_text[i:i+len(key)] for i in range(0, len(cipher_text), len(key))]

  #find the inverse of key and handle error
  try:
    inverse_key = inverseMatrix(key)
  except ValueError as e:
    return str(e)
  #decrypt using np
  decrypted_text = ''
  for chunk in cipher_text_chunks:
    #change chunk to number
    chunk_vector = np.array([ord(c) - 65 for c in chunk])
    #multiply matrix
    decrypted_chunk_vector = np.dot(inverse_key, chunk_vector) % 26
    #change number to character
    decrypted_chunk = ''.join([chr(c + 65) for c in decrypted_chunk_vector])
    decrypted_text += decrypted_chunk
  return decrypted_text