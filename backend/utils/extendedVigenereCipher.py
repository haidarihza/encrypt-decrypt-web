#create extended vigenere encrypt function for 256 ascii
def extendedVigenereEncrypt(plain_text, key):
  #encrypt the plaintext
  cipher_text = ''
  for i in range(len(plain_text)):
    plain_text_char = plain_text[i]
    key_char = key[i % len(key)]
    encrypted_char = chr((ord(plain_text_char) + ord(key_char)) % 256)
    cipher_text += encrypted_char
  return cipher_text

#create extended vigenere decrypt function for 256 ascii
def extendedVigenereDecrypt(cipher_text, key):
  #decrypt the encrypted text
  decrypted_text = ''
  for i in range(len(cipher_text)):
    encrypted_text_char = cipher_text[i]
    key_char = key[i % len(key)]
    decrypted_char = chr((ord(encrypted_text_char) - ord(key_char)) % 256)
    decrypted_text += decrypted_char
  return decrypted_text