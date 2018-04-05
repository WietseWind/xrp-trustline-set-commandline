const RippledWsClient = require('rippled-ws-client')
const RippledWsClientSign = require('rippled-ws-client-sign')

let SeedOrKeypair = 'sXXXXXXXXXXXXXXXXXXXXX'

const Transaction = {
  TransactionType: 'TrustSet',
  Flags: 131072, // tfSetNoRipple
  Account: 'rMYWALLET',
  LimitAmount: {
    currency : "USD",
    issuer : "rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq",
    value : "1000000000"
  },
  Fee: 15,
  LastLedgerSequence: null
}

new RippledWsClient('wss://s1.ripple.com').then((Connection) => {
  new RippledWsClientSign(Transaction, SeedOrKeypair, Connection).then((TransactionSuccess) => {
    console.log(`TransactionSuccess\n\n`, TransactionSuccess)
    console.log(`\n\nClosing connection...`)
    Connection.close()
    console.log(`\nClosed\n`)
  }).catch((SignError) => {
    /**
     * We end up over here if the transaction couldn't be processed
     * (error) or wasn't processed and the current Ledger Index is past
     * the LastLedgerSequence.
     */
    console.log(`SignError\n\n`, SignError.details)
    Connection.close()
  })
}).catch((ConnectionError) => {
  console.log(`ConnectionError\n\n`, ConnectionError)
})
