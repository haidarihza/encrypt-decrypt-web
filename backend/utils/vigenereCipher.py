#create encyprt function for vigenere cipher
def vigenereEncrypt(plain_text, key):
  #clear non-alphabetic characters and remove space from plaintext and key
  plain_text = ''.join(e for e in plain_text if e.isalpha())
  key = ''.join(e for e in key if e.isalpha())
  #make the plaintext and key uppercase
  plain_text = plain_text.upper()
  key = key.upper()

  #encrypt the plaintext
  cipher_text = ''
  for i in range(len(plain_text)):
    plain_text_char = plain_text[i]
    key_char = key[i % len(key)]
    encrypted_char = chr(((ord(plain_text_char) + ord(key_char)) % 26) + 65)
    cipher_text += encrypted_char
  return cipher_text

#create decrypt function for vigenere cipher
def vigenereDecrypt(cipher_text, key):
  #clear non-alphabetic characters and remove space from encrypted text and key
  cipher_text = ''.join(e for e in cipher_text if e.isalpha())
  key = ''.join(e for e in key if e.isalpha())
  #make the encrypted text and key uppercase
  cipher_text = cipher_text.upper()
  key = key.upper()

  #decrypt the encrypted text
  decrypted_text = ''
  for i in range(len(cipher_text)):
    encrypted_text_char = cipher_text[i]
    key_char = key[i % len(key)]
    decrypted_char = chr(((ord(encrypted_text_char) - ord(key_char) + 26) % 26) + 65)
    decrypted_text += decrypted_char
  return decrypted_text