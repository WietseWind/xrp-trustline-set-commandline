# Set XRP Trustlines

**Using just nodejs on your own computer**

Using:

 - [rippled-ws-client](https://www.npmjs.com/package/rippled-ws-client)
 - [rippled-ws-client-sign](https://www.npmjs.com/package/rippled-ws-client-sign)
 - [ripple-keypairs](https://www.npmjs.com/package/ripple-keypairs)

## First (install node and packages)

Make sure you have nodejs installed on your PC. This is required to run the Javascript-files containing the magic ;)

Here are installers:
[https://nodejs.org/en/download/](https://nodejs.org/en/download/)

When you have nodejs installed, you can run this command on your commandline to check the version:

```
node --version
```

You should see `v8.x.x` if nodejs is installed.

Now open the folder containing this repository on your commandline.

First, install the required packages:

```
npm install
```

# Sign and submit (on your own PC)

Select the script you want to use:

 - `online-with-family-seed.js` if you have a `sXXXXX..` secret
 - `online-with-mnemonic.js` if you have 24 words

The script will connect to `s1.ripple.com`, sign and submit your transaction.

## 1. Edit the script

You should enter your `family seed` (sXXXXX...) aka your "secret" + your account address, or your mnemonic words in the file you want to use.

Note: When you are using Windows, Notepad won't show newlines. Use [Notepad++](https://notepad-plus-plus.org/download/v7.5.6.html)

Edit **online-with-family-seed.js** on:

 - line 4 (family seed, sXXX..)
 - line 9 (wallet address, rXXX..)
 - line 10-13 to specify the trust to set

or:

Edit **online-with-mnemonic.js.js** on:

 - line 11 (mnemonic words)
 - line 10-13 to specify the trust to set

## 2. Run the script

```
node online-with-family-seed.js
```

or

```
node online-with-mnemonic.js
```

# Sign offline

If you don't want to sign and submit online, you can use the **offline** scripts, and copy-paste the raw signed transaction to an online environment.

Select the script you want to use:

 - `offline-with-family-seed.js` if you have a `sXXXXX..` secret
 - `offline-with-mnemonic.js` if you have 24 words

The script will just sign your transaction and show you the Transaction Blob. You can copy this hexadecimal value to an online environment to submit the transaction, eg. the "Send air gapped transaction" function at [https://kyteapp.co](https://kyteapp.co)

## 1. Edit the script

You should enter your `family seed` (sXXXXX...) aka your "secret" + your account address, or your mnemonic words in the file you want to use.

Note: When you are using Windows, Notepad won't show newlines. Use [Notepad++](https://notepad-plus-plus.org/download/v7.5.6.html)

Edit **offline-with-family-seed.js** on:

 - line 6 (wallet address, rXXX..)
 - line 7 (family seed, sXXX..)
 - line 25 (account sequence)
 - line 32-34 to specify the trust to set

or:

Edit **offline-with-mnemonic.js.js** on:

 - line 10 (mnemonic words)
 - line 21 (account sequence)
 - line 33-34 to specify the trust to set

## 2. Run the script

```
node offline-with-family-seed.js
```

or

```
node offline-with-mnemonic.js
```

## 3. Submit the transaction

Your signed transaction will be displayed in your terminal. You can copy this hexadecimal value to an online environment to submit the transaction, eg. the "Send air gapped transaction" function at [https://kyteapp.co](https://kyteapp.co)
 
## Remove a trust
 
To remove a trust line, send the same transactioon again but with the value `0`

---

By [@WietseWind](https://twitter.com/wietsewind) 
