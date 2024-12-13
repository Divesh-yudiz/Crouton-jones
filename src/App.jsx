import { useState } from 'react'
import Scene from './components/three/scene'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Scene />
    </>
  )
}

export default App
