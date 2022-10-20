import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useEffect } from 'react'
import wallet from '../lib/nearWallet'

function App() {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userId, setUserId] = useState("")

  useEffect(() => {
    startUp()
  }, [])

  const startUp = async () => {
    const isSignedIn = await wallet.startUp()
    setLoading(false)
    setIsAuthenticated(isSignedIn)
    if(isSignedIn) {
      setUserId( wallet.getUserId() )
    }
  }

  const handleLogin = () => {
    wallet.signIn()
  }

  const handleLogout = () => {
    wallet.signOut()
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Assets Dapp</h1>
      <div className="card">
        {
          loading ? (
            <div>Loading ...</div>
          ) : isAuthenticated ? (
            <>
              <div>Hola {userId}</div>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button onClick={handleLogin}>
              Login with wallet
            </button>
          )
        }
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
