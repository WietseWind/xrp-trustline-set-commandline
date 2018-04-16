const RippledWsClient = require('rippled-ws-client')
const RippledWsClientSign = require('rippled-ws-client-sign')

const bip39 = require("bip39");
const bip32 = require("ripple-bip32");
const ripple = require('ripple-keypairs')

/**
 * SET THE MNEMONIC
 */
let mnemonic = 'novel matter final only nice cheese address cradle civil crash great flame struggle consider crowd surface purpose saddle mango endless mixed trial tape wrap'

const seed = bip39.mnemonicToSeed(mnemonic) // Note: change the line above to: const seed = bip39.mnemonicToSeed(mnemonic, 'MyPassphrase') ... if you have a BIP39 passphrase.
const m = bip32.fromSeedBuffer(seed)
const SeedOrKeypair = m.derivePath("m/44'/144'/0'/0/0").keyPair.getKeyPairs()
const WalletAddress = ripple.deriveAddress(SeedOrKeypair.publicKey)

const Transaction = {
  TransactionType: 'TrustSet',
  Flags: 131072, // tfSetNoRipple
  Account: WalletAddress,
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
