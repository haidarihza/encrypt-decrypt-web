def createMatrix(key):
  matrix = []
  alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'
  #replace J with I
  key = key.replace('J', 'I')
  key += alphabet
  for char in key:
    if char not in matrix:
      matrix.append(char)

  matrix = [matrix[i:i+5] for i in range(0, 25, 5)]
  return matrix

def getCharPosition(matrix, char):
  for i in range(5):
    for j in range(5):
      if matrix[i][j] == char:
        return i, j

#create function to encrypt using playfair cipher
def playFairEncrypt(plain_text, key):
  #clear non-alphabetic characters and remove space from plaintext and key
  plain_text = ''.join(e for e in plain_text if e.isalpha())
  key = ''.join(e for e in key if e.isalpha())
  #make the plaintext and key uppercase
  plain_text = plain_text.upper()
  key = key.upper()
  #create the playfair matrix
  matrix = createMatrix(key)
  #check if the plaintext length is odd
  if len(plain_text) % 2 != 0:
    plain_text += 'X'
  #encrypt the plaintext
  cipher_text = ''
  for i in range(0, len(plain_text), 2):
    plain_text_char1 = plain_text[i]
    plain_text_char2 = plain_text[i + 1]
    #check if char1 and char2 is same
    if plain_text_char1 == plain_text_char2:
      plain_text_char2 = 'X'
    row1, col1 = getCharPosition(matrix, plain_text_char1)
    row2, col2 = getCharPosition(matrix, plain_text_char2)
    decrypted_char1 = ''
    decrypted_char2 = ''
    #check if char1 and char2 is in the same row
    if row1 == row2:
      decrypted_char1 = matrix[row1][(col1 + 1) % 5]
      decrypted_char2 = matrix[row2][(col2 + 1) % 5]
    #check if char1 and char2 is in the same column
    elif col1 == col2:
      decrypted_char1 = matrix[(row1 + 1) % 5][col1]
      decrypted_char2 = matrix[(row2 + 1) % 5][col2]
    else:
      decrypted_char1 = matrix[row1][col2]
      decrypted_char2 = matrix[row2][col1]
    cipher_text += decrypted_char1 + decrypted_char2
  return cipher_text

#create function to decrypt using playfair cipher
def playFairDecrypt(cipher_text, key):
  #clear non-alphabetic characters and remove space from encrypted text and key
  cipher_text = ''.join(e for e in cipher_text if e.isalpha())
  key = ''.join(e for e in key if e.isalpha())
  #make the encrypted text and key uppercase
  cipher_text = cipher_text.upper()
  key = key.upper()
  #create the playfair matrix
  matrix = createMatrix(key)
  #decrypt the encrypted text
  decrypted_text = ''
  for i in range(0, len(cipher_text), 2):
    cipher_text_char1 = cipher_text[i]
    cipher_text_char2 = cipher_text[i + 1]
    row1, col1 = getCharPosition(matrix, cipher_text_char1)
    row2, col2 = getCharPosition(matrix, cipher_text_char2)
    decrypted_char1 = ''
    decrypted_char2 = ''
    #check if char1 and char2 is in the same row
    if row1 == row2:
      decrypted_char1 = matrix[row1][(col1 - 1) % 5]
      decrypted_char2 = matrix[row2][(col2 - 1) % 5]
    #check if char1 and char2 is in the same column
    elif col1 == col2:
      decrypted_char1 = matrix[(row1 - 1) % 5][col1]
      decrypted_char2 = matrix[(row2 - 1) % 5][col2]
    else:
      decrypted_char1 = matrix[row1][col2]
      decrypted_char2 = matrix[row2][col1]
    if (i + 2 != len(cipher_text) and decrypted_char2 == 'X'):
      decrypted_char2 = decrypted_char1
    decrypted_text += decrypted_char1 + decrypted_char2
  return decrypted_text
