import { useState } from 'react'
import './App.css'
import {saveBinaryFile, saveTextFile, saveEncryptedFile} from './utils/saveFile.js'
import axios from 'axios'

function App() {
  const [selectedOption, setSelectedOption] = useState('text')
  const [inputText, setInputText] = useState('')
  const [selectedChiper, setSelectedChiper] = useState('vignere')
  
  const [key, setKey] = useState('')
  const [keyM, setKeyM] = useState('')
  const [keyB, setKeyB] = useState('')
  const [keyMatrixSize, setKeyMatrixSize] = useState(0)
  const [keyMatrix, setKeyMatrix] = useState([[]])

  const [filename, setFilename] = useState('')
  const [outputText, setOutputText] = useState('')

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value)
  }

  const handleInputChange = (e) => {
    setInputText(e.target.value)
  }

  const handleChiperChange = (e) => {
    setSelectedChiper(e.target.value)
  }

  const handleKeyChange = (e) => {
    setKey(e.target.value)
  }

  const handleKeyMChange = (e) => {
    setKeyM(e.target.value)
  }

  const handleKeyBChange = (e) => {
    setKeyB(e.target.value)
  } 

  const handleKeyMatrixSizeChange = (e) => {
    setKeyMatrixSize(e.target.value)

    // Initialize key matrix
    const matrix = Array.from({length: e.target.value}, () => Array.from({length: e.target.value}, () => 0))
    setKeyMatrix(matrix)
  }

  const handleKeyMatrixChange = (e, rowIndex, colIndex) => {
    const value = parseInt(e.target.value);
    const matrix = [...keyMatrix];
    matrix[rowIndex][colIndex] = isNaN(value) ? 0 : value;
    setKeyMatrix(matrix);
  }

  const handleEncryptClick = () => {
    console.log("Encrypting", inputText, key)

    switch(selectedChiper) {
      case 'vignere':
        axios.post(`http://127.0.0.1:5000/vigenere/encrypt`,{plain_text: inputText, key: key}).then((res) => {
          console.log(res.data)
          setOutputText(res.data.encrypted_text)
        });
        break
      case 'auto-key-vignere':
        axios.post(`http://127.0.0.1:5000/auto-key-vigenere/encrypt`,{plain_text: inputText, key: key}).then((res) => {
          console.log(res.data)
          setOutputText(res.data.encrypted_text)
        });
        break
      case 'extended-vignere':
        axios.post(`http://127.0.0.1:5000/extended-vigenere/encrypt`,{plain_text: inputText, key: key}).then((res) => {
          console.log(res.data)
          setOutputText(res.data.encrypted_text)
          if (selectedOption === 'file') {
            saveEncryptedFile(res.data.encrypted_text, filename)
          }
        });
        break
      case 'playfair':
        axios.post(`http://127.0.0.1:5000/playfair/encrypt`,{plain_text: inputText, key: key}).then((res) => {
          console.log(res.data)
          setOutputText(res.data.encrypted_text)
        });
        break
      case 'affine':
        //check if m not relative prime with 26
        if (parseInt(keyM) % 2 === 0 || parseInt(keyM) % 13 === 0) {
          alert("m must be relative prime with 26")
          return
        }
        axios.post(`http://127.0.0.1:5000/affine/encrypt`,{plain_text: inputText, m: parseInt(keyM), b:parseInt(keyB)}).then((res) => {
          console.log(res.data)
          setOutputText(res.data.encrypted_text)
        });
        break
      case 'hill':
        axios.post(`http://127.0.0.1:5000/hill/encrypt`,{plain_text: inputText, key: keyMatrix}).then((res) => {
          console.log(res.data)
          setOutputText(res.data.encrypted_text)
        });
        break
      case 'super-encryption':
        axios.post(`http://127.0.0.1:5000/super/encrypt`,{plain_text: inputText, key: key}).then((res) => {
          console.log(res.data)
          setOutputText(res.data.encrypted_text)
        });
        break
    }
    console.log("result : ", outputText)
  }

  const handleDecryptClick = () => {
    console.log("Decrypting", inputText, key)

    switch(selectedChiper) {
      case 'vignere':
        axios.post(`http://127.0.0.1:5000/vigenere/decrypt`,{cipher_text: inputText, key: key}).then((res) => {
          console.log(res.data)
          setOutputText(res.data.decrypted_text)
        });
        break
      case 'auto-key-vignere':
        axios.post(`http://127.0.0.1:5000/auto-key-vigenere/decrypt`,{cipher_text: inputText, key: key}).then((res) => {
          console.log(res.data)
          setOutputText(res.data.decrypted_text)
        });
        break
      case 'extended-vignere':
        if (selectedOption === 'file') {
          axios.post(`http://127.0.0.1:5000/extended-vigenere/decrypt`,{cipher_text: inputText, key: key}).then((res) => {
            console.log(res.data)
            setOutputText(res.data.decrypted_text)
              saveEncryptedFile(res.data.decrypted_text, filename)
          });
        } else {
          axios.post(`http://127.0.0.1:5000/extended-vigenere/decrypt`,{cipher_text: inputText, key: key}).then((res) => {
            console.log(res.data)
            setOutputText(res.data.decrypted_text)
          });
        }
        break
      case 'playfair':
        axios.post(`http://127.0.0.1:5000/playfair/decrypt`,{cipher_text: inputText, key: key}).then((res) => {
          console.log(res.data)
          setOutputText(res.data.decrypted_text)
        });
        break
      case 'affine':
        //check if m not relative prime with 26
        if (parseInt(keyM) % 2 === 0 || parseInt(keyM) % 13 === 0) {
          alert("m must be relative prime with 26")
          return
        }        
        axios.post(`http://127.0.0.1:5000/affine/decrypt`,{cipher_text: inputText,  m: parseInt(keyM), b:parseInt(keyB)}).then((res) => {
          console.log(res.data)
          setOutputText(res.data.decrypted_text)
        });
        break
      case 'hill':
        axios.post(`http://127.0.0.1:5000/hill/decrypt`,{cipher_text: inputText,  key: keyMatrix}).then((res) => {
          console.log(res.data)
          setOutputText(res.data.decrypted_text)
        });
        break
      case 'super-encryption':
        axios.post(`http://127.0.0.1:5000/super/decrypt`,{cipher_text: inputText, key: key}).then((res) => {
          console.log(res.data)
          setOutputText(res.data.decrypted_text)
        });
        break
    }
    console.log("result : ", outputText)
  }

  const handleSaveBinaryFile = () => {
    console.log("Save as binary file", outputText)
    saveBinaryFile(outputText, "output.bin")
  }

  const handleFileChange = (e) => {
    console.log("File changed", e.target.files[0])
    const file = e.target.files[0];

    setFilename(file.name);
    
    if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        console.log ("text1", text)
        setInputText(text);
      };
      reader.readAsText(file);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target.result;
    
        const byteArray = new Uint8Array(arrayBuffer);

        console.log("byteArray", byteArray)

        const base64String = btoa(String.fromCharCode.apply(null, byteArray));
        console.log("Base64 string:", base64String);

        setInputText(base64String);
      };
      reader.readAsArrayBuffer(file);
    }
  }

  const handleDownloadFile = () => {
    if (selectedChiper === 'extended-vignere' || selectedChiper === 'super-encryption') {
      saveEncryptedFile(outputText, filename)
    } else {
      saveTextFile(outputText, filename)
    }
  }

  return (
    <>
    <div className='title'>
      <h1>Encrypt-Decrypt Website</h1>
    </div>
    <div className='content'>
      <label className='input-type'>
        Input Type : 
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="text">Text</option>
          <option value="file">File</option>
        </select>
      </label>
      {selectedOption === 'text' && (
        <div className='content'>
          <label className='input-text'>
            Text:
            <textarea value={inputText} onChange={handleInputChange}></textarea>
          </label>
        </div>
      )}
      {selectedOption === 'file' && (
        <div className='content'>
          <label className='input-type'>
            File:
            <input type="file" onChange={handleFileChange}/>
          </label>
        </div>
      )}
        <label className='input-type'>
            Chiper Type : 
            <select value={selectedChiper} onChange={handleChiperChange}>
              <option value="vignere">Vigenere Chiper</option>
              <option value="auto-key-vignere">Auto-Key Vignere Chiper</option>
              <option value="extended-vignere">Extended Vignere Chiper</option>
              <option value="playfair">Playfair Chiper</option>
              <option value="affine">Affine Chiper</option>
              <option value="hill">Hill Chiper</option>
              <option value="super-encryption">Super Encryption</option>
            </select>
          </label>
          {selectedChiper === 'affine' && (
            <label className='input-key'>
              Key m:
              <input type="text" value={keyM} onChange={handleKeyMChange}/>
              Key b:
              <input type="text" value={keyB} onChange={handleKeyBChange}/>
            </label>
          )}
          {selectedChiper === 'hill' && (
            <div className='input-key'>
            <label>
              Key Matrix size:<br/>
              <input type="text" value={keyMatrixSize} onChange={handleKeyMatrixSizeChange}/>
              <br/>Matrix :
            </label>
            <div className='matrix-hill'>
              {keyMatrix.map((row, rowIndex) => (
                <div key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <input
                      key={colIndex}
                      type="text"
                      value={cell}
                      onChange={(e) => handleKeyMatrixChange(e, rowIndex, colIndex)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          )}
          {selectedChiper !== 'affine' && selectedChiper !== 'hill' && (
            <label className='input-key'>
              Key:
              <input type="text" value={key} onChange={handleKeyChange}/>
            </label>
          )}
          <div className='buttons'>
            <button onClick={handleEncryptClick}>Encrypt</button>
            <button onClick={handleDecryptClick}>Decrypt</button>
          </div>

        {selectedOption === 'text' && (
          <div>
            <div className='output' style={{ whiteSpace: 'pre-wrap' }}>
            <div className='input-label' style={{ display: 'block' }}>
              Input:
                <span>{inputText}</span>
              </div>
              <label>
                Input base64: {btoa(inputText)}
              </label>
              <label>
                Output: {outputText}
              </label>
              <label>
                Output base64: {btoa(outputText)}
              </label>
            </div>
            <div className='buttons'>
              <button onClick={handleSaveBinaryFile}>save as binary file</button>
            </div>
          </div>
        )}
        {selectedOption === 'file' && (
          <div className='content'>
          <div className='output'>
            <label>
              Input: {inputText}
            </label>
            <label>
                Input base64: {btoa(inputText)}
              </label>
            <label>
              Output: {outputText}
            </label>
            <label>
                Output base64: {btoa(outputText)}
              </label>
          </div>
          <div className='buttons'>
            <button onClick={handleDownloadFile}>Download File</button>
          </div>
        </div>
        )}
    </div>
    </>
  )
}

export default App
