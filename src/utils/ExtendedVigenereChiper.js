export function ExtendedVigenereEncrypt(plainText, key) {
  //encrypt the text
  let encryptedText = "";
  for (let i = 0; i < plainText.length; i++) {
    let plainTextChar = plainText.charCodeAt(i);
    let keyChar = key.charCodeAt(i % key.length);
    let encryptedChar = (plainTextChar + keyChar) % 256;
    encryptedText += String.fromCharCode(encryptedChar);
  }
  //convert encrypted text to base 64
  return btoa(encryptedText);
}

export function ExtendedVigenereDecrypt(chiperText, key) {
  //convert encrypted text from base 64
  let encryptedText = atob(chiperText);

  //decrypt the text
  let plainText = "";
  for (let i = 0; i < encryptedText.length; i++) {
    let encryptedChar = encryptedText.charCodeAt(i);
    let keyChar = key.charCodeAt(i % key.length);
    let plainTextChar = (encryptedChar - keyChar + 256) % 256;
    plainText += String.fromCharCode(plainTextChar);
  }
  return plainText;
}