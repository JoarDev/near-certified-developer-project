import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useEffect } from 'react'
import wallet from '../lib/nearWallet'
import { AssetForm } from '../components/assetForm'
import { AssetList } from '../components/assetList'
import { assetContract } from '../lib/contract'

function App() {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userId, setUserId] = useState("")
  const [txResult, setTxResult] = useState(null)
  const [assetList, setAssetList] = useState([])

  useEffect(() => {
    startUp()
  }, [])

  useEffect(() => {
    let txHash
    try {
      const params = new URLSearchParams(window.location.href.match(/\?.*/)[0])
      txHash = params.get('transactionHashes')
    } catch (error) {
    }
    if (!loading) {
      if (txHash) {
        console.log("txHash", txHash)
        wallet.getTransactionResult(txHash)
        .then((result) => {
          console.log("result",result)
          setTxResult({result: result, txHash: txHash})
        })
      }
      assetContract.getAssets()
      .then((body) => {
        console.log("body",body)
        setAssetList(body)
      })
      .catch((error) => {
        console.log("error",error)
      })
    }
  }, [loading])

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
      </div>
      {
        txResult ? (
          <div className='transactionResult'>
            <h4>Transaction Result:{" "}{txResult.result.uuid ? "Successful" : "Failed"}</h4>
            <a target="_blank" href={`https://explorer.testnet.near.org/transactions/${txResult.txHash}`}>View transaction on Explorer</a>
          </div>
        ) : null
      }
      <h1>Assets Dapp</h1>
      <div className="card">
        {
          loading ? (
            <div>Loading ...</div>
          ) : isAuthenticated ? (
            <>
              <div>Hola <code>{userId}</code> crea tu asdasd</div>
              <AssetForm />
              <AssetList assetList={assetList} userId={userId}/>
              <div>owo</div>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button onClick={handleLogin}>
              Login with wallet
            </button>
          )
        }
      </div>
    </div>
  )
}

export default App
