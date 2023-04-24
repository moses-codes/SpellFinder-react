import React, { useState } from 'react'

import SpellStuff from './components/SpellStuff'
import TestComponent from './components/TestComponent'


import './App.css'

function App() {

  return (
    <div className="App text-center">
      {/* <TestComponent /> */}
      <div>
        <React.StrictMode>
          <SpellStuff
          />
        </React.StrictMode>
      </div>
    </div>
  )
}

export default App
