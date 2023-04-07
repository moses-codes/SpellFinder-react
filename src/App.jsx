import { useState } from 'react'

import SpellStuff from './components/SpellStuff'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App text-center">

      <div>

        <SpellStuff
        />

      </div>
    </div>
  )
}

export default App
