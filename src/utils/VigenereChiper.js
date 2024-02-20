export function VigenereEncrypt(plainText, key) {
  //clear non-Alphabets characters and remove spaces and make to Uppercase
  plainText = plainText.toUpperCase().replace(/[^A-Z]/g, "");
  key = key.toUpperCase().replace(/[^A-Z]/g, "");

  //encrypt the text
  let encryptedText = "";
  for (let i = 0; i < plainText.length; i++) {
    let plainTextChar = plainText.charCodeAt(i);
    let keyChar = key.charCodeAt(i % key.length);
    let encryptedChar = (plainTextChar + keyChar) % 26;
    encryptedText += String.fromCharCode(65 + encryptedChar);
  }
  //convert encrypted text to base 64
  return btoa(encryptedText);
}

export function VigenereDecrypt(chiperText, key) {
  //convert encrypted text from base 64
  let encryptedText = atob(chiperText);
  //make sure the key and chipertext is in uppercase
  encryptedText = encryptedText.toUpperCase();
  key = key.toUpperCase();

  //decrypt the text
  let plainText = "";
  for (let i = 0; i < encryptedText.length; i++) {
    let encryptedChar = encryptedText.charCodeAt(i);
    let keyChar = key.charCodeAt(i % key.length);
    let plainTextChar = (encryptedChar - keyChar + 26) % 26;
    plainText += String.fromCharCode(65 + plainTextChar);
  }
  return plainText;
}