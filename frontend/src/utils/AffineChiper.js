export function AffineEncrypt(plainText, m, b) {
  //make sure m is relatively prime to 26
  if (m % 2 === 0 || m % 13 === 0) return "m must be relatively prime to 26";
  //clear non-Alphabets characters and remove spaces and make to Uppercase
  plainText = plainText.toUpperCase().replace(/[^A-Z]/g, "");

  //encrypt the text
  let encryptedText = "";
  for (let i = 0; i < plainText.length; i++) {
    let char = plainText.charAt(i);
    let charPos = char.charCodeAt(0) - 65;
    let encryptedChar = String.fromCharCode(((m * charPos + b) % 26) + 65);
    encryptedText += encryptedChar;
  }
  //convert encrypted text to base 64
  return btoa(encryptedText);
}

export function AffineDecrypt(cipherText, m, b) {
  //convert encrypted text from base 64
  let encryptedText = atob(cipherText);
  //make sure cipherText is in uppercase
  encryptedText = encryptedText.toUpperCase();
  //make sure m is relatively prime to 26
  if (m % 2 === 0 || m % 13 === 0) return "m must be relatively prime to 26";
  //decrypt the text
  let plainText = "";
  for (let i = 0; i < encryptedText.length; i++) {
    let char = encryptedText.charAt(i);
    let charPos = char.charCodeAt(0) - 65;
    let decryptedChar = String.fromCharCode(((m * (charPos - b + 26)) % 26) + 65);
    plainText += decryptedChar;
  }
  return plainText;
}