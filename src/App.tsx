import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Oauth2 } from '../'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <Oauth2
         id='test'
         className='test'
         provider="Kalicloud"
         apiKey="$d1e2f3g4-5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z4" 
         clientId="$c1a2b3e4-5d6e-7f8g-9h0i-j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z" 
         scope="openid" 
         onSuccess={(data: any) => console.log(data)} 
         onError={(error: any) => console.log(error)}
         />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
