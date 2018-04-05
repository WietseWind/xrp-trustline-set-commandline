const RippledWsClientSign = require('rippled-ws-client-sign')

/**
 * SET THE ACCOUNT DETAILS
 */
let WalletAddress = 'rXXXXXXX'
let Secret = 'sYYYYYY'

/**
 * SET YOUR ACCOUNT SEQUENCE
 * You can check your current sequence at
 * any XRP ledger explorer, like:
 *   https://bithomp.com/explorer/
 * Bithomp shows:
 *   "Transactions: 1234"
 * In this case your AccountSequence is 1235 (1234 + 1).
 * 
 * If you use the Ripple RPC Info Tool:
 *   https://ripple.com/build/ripple-info-tool/
 * You enter your account address, and expand
 * the "account_data" (under account_info)
 *   Use the Sequence number over there
 * (So if your Sequence number is 123, enter 123)
 */
let AccountSequence = 123

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

new RippledWsClientSign(Transaction, Secret).then((Transaction) => {
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
