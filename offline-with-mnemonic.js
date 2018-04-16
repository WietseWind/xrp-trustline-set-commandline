const RippledWsClientSign = require('rippled-ws-client-sign')

const bip39 = require("bip39");
const bip32 = require("ripple-bip32");
const ripple = require('ripple-keypairs')

/**
 * SET THE MNEMONIC
 */
let mnemonic = 'novel matter final only nice cheese address cradle civil crash great flame struggle consider crowd surface purpose saddle mango endless mixed trial tape wrap'

/**
 * SET YOUR ACCOUNT SEQUENCE
 * You can check your current sequence at
 * any XRP ledger explorer, like:
 *   https://bithomp.com/explorer/
 * Bithomp shows:
 *   "Transactions: 1234"
 * In this case your AccountSequence is 1235 (+1).
 */
let AccountSequence = 123

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
  Sequence: AccountSequence
}

new RippledWsClientSign(Transaction, SeedOrKeypair).then((Transaction) => {
  console.log(`\n\nTransaction signed, and only valid for the specified Sequence

Your (signed) TRANSACTION BLOB is:

${Transaction.tx_blob}

You can now copy-paste this value (the signed transaction) to 
your online computer to submit the transaction.

Visit:
  https://kyteapp.co/ 

... and click "Send air gapped transaction". Paste the TRANSACTION BLOB there.

This is 100% safe, since your private key is NOT stored in the transaction blob,
your private key is used to SIGN the transaction.\n\n`)
}).catch((SignError) => {
  /**
   * We end up over here if the transaction couldn't be processed
   * (error) or wasn't processed and the current Ledger Index is past
   * the LastLedgerSequence.
   */
  console.log(`SignError\n\n`, SignError.details)
})
