import { useState } from 'react'
import './App.css'
import {saveBinaryFile} from './utils/saveBinaryFile.js'
import axios from 'axios'

function App() {
  const [selectedOption, setSelectedOption] = useState('text')
  const [inputText, setInputText] = useState('')
  const [selectedChiper, setSelectedChiper] = useState('vignere')
  const [key, setKey] = useState('')
  const [keyM, setKeyM] = useState('')
  const [keyB, setKeyB] = useState('')
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
        });
        break
      case 'playfair-vignere':
        axios.post(`http://127.0.0.1:5000/playfair/encrypt`,{plain_text: inputText, key: key}).then((res) => {
          console.log(res.data)
          setOutputText(res.data.encrypted_text)
        });
        break
      case 'affine':
        axios.post(`http://127.0.0.1:5000/affine/encrypt`,{plain_text: inputText, m: parseInt(keyM), b:parseInt(keyB)}).then((res) => {
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
        axios.post(`http://127.0.0.1:5000/extended-vigenere/decrypt`,{cipher_text: inputText, key: key}).then((res) => {
          console.log(res.data)
          setOutputText(res.data.decrypted_text)
        });
        break
      case 'playfair-vignere':
        axios.post(`http://127.0.0.1:5000/playfair/decrypt`,{cipher_text: inputText, key: key}).then((res) => {
          console.log(res.data)
          setOutputText(res.data.decrypted_text)
        });
        break
      case 'affine':
        axios.post(`http://127.0.0.1:5000/affine/decrypt`,{cipher_text: inputText,  m: parseInt(keyM), b:parseInt(keyB)}).then((res) => {
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
      {selectedOption === 'text' ? (
        <div className='content'>
          <label className='input-text'>
            Text:
            <textarea value={inputText} onChange={handleInputChange}></textarea>
          </label>
          <label className='input-type'>
            Chiper Type : 
            <select value={selectedChiper} onChange={handleChiperChange}>
              <option value="vignere">Vigenere Chiper</option>
              <option value="auto-key-vignere">Auto-Key Vignere Chiper</option>
              <option value="extended-vignere">Extended Vignere Chiper</option>
              <option value="playfair">Playfair Chiper</option>
              <option value="affine">Affine Chiper</option>
              <option value="hill">Hill Chiper</option>
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
            <label className='input-key'>
              Key:
              <input type="text" value={key} onChange={handleKeyChange}/>
            </label>
          
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
          <div className='output'>
            <label>
              Input: {inputText}
            </label>
            <label>
              Output: {outputText}
            </label>
          </div>
          <div className='buttons'>
            <button onClick={handleSaveBinaryFile}>save as binary file</button>
          </div>
        </div>
      ) : (
        <div className='content'>
          <label>
            File:
            <input type="file" />
          </label>
          <label>
            Key:
            <input type="text" />
          </label>
          <button>Encrypt</button>
          <button>Decrypt</button>
        </div>
      )}
    </div>
    </>
  )
}

export default App
