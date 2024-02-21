export function AutoKeyVigenereEncrypt(plainText, key) {
  //clear non-Alphabets characters and remove spaces and make to Uppercase
  plainText = plainText.toUpperCase().replace(/[^A-Z]/g, "");
  key = key.toUpperCase().replace(/[^A-Z]/g, "");

  //add the key with plainText to create autokey
  key += plainText;

  //encrypt the text
  let encryptedText = "";
  for (let i = 0; i < plainText.length; i++) {
    let plainTextChar = plainText.charCodeAt(i);
    let keyChar = key.charCodeAt(i);
    let encryptedChar = (plainTextChar + keyChar) % 26;
    encryptedText += String.fromCharCode(65 + encryptedChar);
  }
  //convert encrypted text to base 64
  return btoa(encryptedText);
}

export function AutoKeyVigenereDecrypt(cipherText, key) {
  //convert encrypted text from base 64
  let encryptedText = atob(cipherText);
  //make sure the key and cipherText is in uppercase
  encryptedText = encryptedText.toUpperCase();
  key = key.toUpperCase();

  //decrypt the text
  let plainText = "";
  for (let i = 0; i < encryptedText.length; i++) {
    let encryptedChar = encryptedText.charCodeAt(i);
    let keyChar = key.charCodeAt(i);
    let plainTextChar = (encryptedChar - keyChar + 26) % 26;
    plainText += String.fromCharCode(65 + plainTextChar);
    key += String.fromCharCode(65 + plainTextChar);
  }
  return plainText;
}