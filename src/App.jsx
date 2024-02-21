import { useState } from 'react'
import './App.css'
import {VigenereEncrypt, VigenereDecrypt} from './utils/VigenereChiper.js'
import {AutoKeyVigenereEncrypt, AutoKeyVigenereDecrypt} from './utils/AutoKeyVigenereChiper.js'
import {ExtendedVigenereEncrypt, ExtendedVigenereDecrypt} from './utils/ExtendedVigenereChiper.js'
import {PlayfairEncrypt, PlayfairDecrypt} from './utils/PlayfairChiper.js'

function App() {
  const [selectedOption, setSelectedOption] = useState('text')
  const [inputText, setInputText] = useState('')
  const [selectedChiper, setSelectedChiper] = useState('vignere')
  const [key, setKey] = useState('')
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

  const handleEncryptClick = () => {
    console.log("Encrypting", inputText, key)

    switch(selectedChiper) {
      case 'vignere':
        setOutputText(VigenereEncrypt(inputText, key))
        break
      case 'auto-key-vignere':
        setOutputText(AutoKeyVigenereEncrypt(inputText, key))
        break
      case 'extended-vignere':
        setOutputText(ExtendedVigenereEncrypt(inputText, key))
        break
      case 'playfair-vignere':
        setOutputText(PlayfairEncrypt(inputText, key))
        break
      default:
        setOutputText(VigenereEncrypt(inputText, key))
    }
    console.log("result : ", outputText)
  }

  const handleDecryptClick = () => {
    console.log("Decrypting", inputText, key)

    switch(selectedChiper) {
      case 'vignere':
        setOutputText(VigenereDecrypt(inputText, key))
        break
      case 'auto-key-vignere':
        setOutputText(AutoKeyVigenereDecrypt(inputText, key))
        break
      case 'extended-vignere':
        setOutputText(ExtendedVigenereDecrypt(inputText, key))
        break
      case 'playfair-vignere':
        setOutputText(PlayfairDecrypt(inputText, key))
        break
      default:
        setOutputText(VigenereDecrypt(inputText, key))
    }
    console.log("result : ", outputText)
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
              <option value="playfair-vignere">Playfair Chiper</option>
              <option value="affine-vignere">Affine Chiper</option>
              <option value="hill-vignere">Hill Chiper</option>
            </select>
          </label>
          <label className='input-key'>
            Key:
            <input type="text" value={key} onChange={handleKeyChange}/>
          </label>
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
