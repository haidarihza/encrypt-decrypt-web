import { Matrix } from 'matrix.js';

const charToNum = (char) => char.charCodeAt(0) - 65;
const numToChar = (num) => String.fromCharCode(num + 65);

const paddingPlaintext = (plaintext, keyLength) => {
  const remainder = plaintext.length % n;
  if (remainder !== 0) {
      plaintext += 'X'.repeat(n - remainder);
  }
  return plaintext;
}

export function HillEncrypt(plainText, key) {
  //clear non-Alphabets characters and remove spaces and make to Uppercase
  plainText = plainText.toUpperCase().replace(/[^A-Z]/g, "");

  //key is in array 2 dimension
  plainText = paddingPlaintext(plainText, key.length);

  const keyMatrix = new Matrix(key);
  const plaintextMatrix = new Matrix(plainText.split('').map(charToNum), key.length);

  const encryptedMatrix = plaintextMatrix.multiply(keyMatrix).mod(26);
  const encryptedText = encryptedMatrix.to1DArray().map(numToChar).join('');
  //convert encrypted text to base 64
  return btoa(encryptedText);
}

export function HillDecrypt(cipherText, key) {
  //convert encrypted text from base 64
  let encryptedText = atob(cipherText);
  //make sure ciphertext is in uppercase
  encryptedText = encryptedText.toUpperCase();

  const keyMatrix = new Matrix(key);
  const inverseKeyMatrix = keyMatrix.inverse().mod(26);

  const ciphertextMatrix = new Matrix(cipherText.split('').map(charToNum), key.length);

  const decryptedMatrix = ciphertextMatrix.multiply(inverseKeyMatrix).mod(26);
  const decryptedText = decryptedMatrix.to1DArray().map(numToChar).join('');

  return decryptedText;
}