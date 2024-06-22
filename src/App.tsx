import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Oauth2, redirect_mode_hook } from '..'

function App() {
  const [count, setCount] = useState(0)
  const [ name, setName] = useState('')

  useEffect(() => {
    let callbackCode = window.location.search.split("code=")[1];
  
    if (callbackCode) {
    redirect_mode_hook({
      client_name: 'Kalicloud',
      success_callback: (data: any) => {
        setName(data.decodedToken.email)          
      },
      error_callback: (error: any) => {
        window.alert("callback error, check console")
        console.log(error)
      }
    })
    }
  }, [])

  return (
    <>
      <div>
        <p>You are now: {name}</p>
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
         mode={"redirect"}
         className='test'
         provider="Kalicloud"
         redirectUri={"http://localhost:5173/oauth2/callback"}
         state={"4"}
         responseType={"code"}
         apiKey="$d1e2f3g4-5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z4"         
         clientId="1" 
         client_secret='a'
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
