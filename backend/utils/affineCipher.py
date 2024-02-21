def modInverse(a, m):
  for x in range(1, m):
    if (a * x) % m == 1:
      return x
  return 1

#create function to encrypt using affine cipher
def affineEncrypt(plain_text, m, b):
  #clear non-alphabetic characters and remove space from plain text and key
  plain_text = ''.join(e for e in plain_text if e.isalpha())

  #make the plain text and key uppercase
  plain_text = plain_text.upper()
  
  #encrypt the plain text
  encrypted_text = ''
  for char in plain_text:
    encrypted_char = chr(((m * (ord(char) - 65) + b) % 26) + 65)
    encrypted_text += encrypted_char
  return encrypted_text

#create function to decrypt using affine cipher
def affineDecrypt(cipher_text, m, b):
  #clear non-alphabetic characters and remove space from encrypted text and key
  cipher_text = ''.join(e for e in cipher_text if e.isalpha())

  #make the encrypted text and key uppercase
  cipher_text = cipher_text.upper()

  #decrypt the encrypted text
  decrypted_text = ''
  for char in cipher_text:
    decrypted_char = chr(((modInverse(m, 26) * (ord(char) - 65 - b)) % 26) + 65)
    decrypted_text += decrypted_char
  return decrypted_text
