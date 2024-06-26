import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Oauth2, redirect_mode_hook, user_hook } from '..'

function App() {
  const [count, setCount] = useState(0)
  const [ name, setName] = useState('')

  useEffect(() => {
    let callbackCode = window.location.search.split("code=")[1];
  
    if (callbackCode) {
    redirect_mode_hook({
      success_callback: (data: any) => {
        const user = new user_hook()

        const user_email = data.email // The user's email address from the provider.
        const oauth_provider = user.checkProvider()

        if (oauth_provider.id) {
          alert(`Successfully authenticated with ${oauth_provider.id}`)
        }
      },
      error_callback: (error: any) => {
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
         provider="Google"
         redirectUri={"http://localhost:5173/google/callback"}
        //  state={"4"}
         responseType={"code"}
         apiKey="0"         
         clientId="933403983824-jj2u5kedlapktv4kni2l1vavtkkd9sd1.apps.googleusercontent.com" 
         client_secret="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"
         scope="email" 
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
