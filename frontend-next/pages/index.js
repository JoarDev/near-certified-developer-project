import { useState } from 'react'
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
  const [showMessage, setShowMessage] = useState(true)

  useEffect(() => {
    startUp()
  }, [])

  useEffect(() => {
    let txHash
    try {
      const params = new URLSearchParams(window.location.href.match(/\?.*/)[0])
      txHash = params.get('transactionHashes')
    } catch (error) {
      //console.error(error)
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
        setAssetList(body.filter((value) => value.uuid))
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
      {
        txResult && showMessage? (
          <div className='transactionResult'>
            <h4>Transaction Result:{" "}{txResult.result.uuid ? "Successful" : "Failed"}</h4>
            <a target="_blank" href={`https://explorer.testnet.near.org/transactions/${txResult.txHash}`}>View transaction on Explorer</a>
            <p onClick={() => setShowMessage(false)}>Close</p>
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
              <div>Hola <code>{userId}</code> crea tu activo</div>
              <AssetForm />
              <AssetList assetList={assetList}/>
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