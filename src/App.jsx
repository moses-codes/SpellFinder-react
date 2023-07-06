import { useState } from 'react'

import SpellStuff from './components/SpellStuff'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App text-center">
      <h1 className="text-5xl mb-5 text-center md:text-left"> <img className='h-20 inline' src='/spellfinderLogo.png' /> Spellfinder </h1>
      <div>

        <SpellStuff
        />

      </div>
    </div>
  )
}

export default App
