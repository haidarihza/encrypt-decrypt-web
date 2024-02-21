import { useState } from 'react'
import './App.css'

function App() {
  const [selectedOption, setSelectedOption] = useState('text')

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value)
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
            <textarea></textarea>
          </label>
          <label className='input-type'>
            Chiper Type : 
            <select>
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
            <input type="text" />
          </label>
          <div className='buttons'>
            <button>Encrypt</button>
            <button>Decrypt</button>
          </div>
          <div className='output'>
            <label>
              Output:
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
