const createKeyTable = (key) => {
  let keyTable = [];
  let keyStr = key + "ABCDEFGHIKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < keyStr.length; i++) {
    //pass all J
    if (keyStr.charAt(i) === "J") continue;
    // if the character is not in the key table, add it
    if (keyTable.indexOf(keyStr.charAt(i)) === -1) keyTable.push(keyStr.charAt(i));
  }
  //result in 1 array dimension
  return keyTable;
}

const getPosition = (keyTable, char) => {
  let position = [];
  //get the row position of the character in the key table
  let row = Math.floor(keyTable.indexOf(char) / 5);
  position.push(row);
  //get the column position of the character in the key table
  let column = keyTable.indexOf(char) % 5;
  position.push(column);
  return position;
}

export function PlayfairEncrypt(plainText, key) {
  //clear non-Alphabets characters and remove spaces and make to Uppercase
  plainText = plainText.toUpperCase().replace(/[^A-Z]/g, "");
  key = key.toUpperCase().replace(/[^A-Z]/g, "");

  //create the key table
  let keyTable = createKeyTable(key);

  //if the plainText length is odd, add X at the end
  if (plainText.length % 2 !== 0) plainText += "X";
  //encrypt the text
  let encryptedText = "";
  for (let i = 0; i < plainText.length; i += 2) {
    let char1 = plainText.charAt(i);
    let char2 = plainText.charAt(i + 1);
    //check if the characters are the same then replace the second character with X
    if (char1 === char2) char2 = "X";
    let char1Pos = getPosition(keyTable, char1);
    let char2Pos = getPosition(keyTable, char2);
    let encryptedChar1, encryptedChar2;
    if (char1Pos[0] === char2Pos[0]) {
      //keyTable is 1 array dimension
      encryptedChar1 = keyTable[char1Pos[0] * 5 + (char1Pos[1] + 1) % 5];
      encryptedChar2 = keyTable[char2Pos[0] * 5 + (char2Pos[1] + 1) % 5];
    } else if (char1Pos[1] === char2Pos[1]) {
      //keyTable is 1 array dimension
      encryptedChar1 = keyTable[((char1Pos[0] + 1) % 5) * 5 + char1Pos[1]];
      encryptedChar2 = keyTable[((char2Pos[0] + 1) % 5) * 5 + char2Pos[1]];
    } else {
      //keyTable is 1 array dimension
      encryptedChar1 = keyTable[char1Pos[0] * 5 + char2Pos[1]];
      encryptedChar2 = keyTable[char2Pos[0] * 5 + char1Pos[1]];
    }
    encryptedText += encryptedChar1 + encryptedChar2;
  }
  //convert encrypted text to base 64
  return btoa(encryptedText);
}

export function PlayfairDecrypt(cipherText, key) {
  //convert encrypted text from base 64
  let encryptedText = atob(cipherText);
  //make sure the key and cipherText is in uppercase
  encryptedText = encryptedText.toUpperCase();
  key = key.toUpperCase();

  //create the key table
  let keyTable = createKeyTable(key);

  //decrypt the text
  let plainText = "";
  for (let i = 0; i < encryptedText.length; i += 2) {
    let char1 = encryptedText.charAt(i);
    let char2 = encryptedText.charAt(i + 1);
    let char1Pos = getPosition(keyTable, char1);
    let char2Pos = getPosition(keyTable, char2);
    let decryptedChar1, decryptedChar2;
    if (char1Pos[0] === char2Pos[0]) {
      //keyTable is 1 array dimension
      decryptedChar1 = keyTable[char1Pos[0] * 5 + (char1Pos[1] + 4) % 5];
      decryptedChar2 = keyTable[char2Pos[0] * 5 + (char2Pos[1] + 4) % 5];
    } else if (char1Pos[1] === char2Pos[1]) {
      //keyTable is 1 array dimension
      decryptedChar1 = keyTable[((char1Pos[0] + 4) % 5) * 5 + char1Pos[1]];
      decryptedChar2 = keyTable[((char2Pos[0] + 4) % 5) * 5 + char2Pos[1]];
    } else {
      //keyTable is 1 array dimension
      decryptedChar1 = keyTable[char1Pos[0] * 5 + char2Pos[1]];
      decryptedChar2 = keyTable[char2Pos[0] * 5 + char1Pos[1]];
    }
    if (i + 1 !== encryptedText.length - 1 && decryptedChar2 === "X") decryptedChar2 = decryptedChar1;
    plainText += decryptedChar1 + decryptedChar2;
  }
  return plainText;
}


