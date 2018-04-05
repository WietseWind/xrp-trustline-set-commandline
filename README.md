# Set XRP Trustlines

**Using just nodejs on your own computer**

Using:

 - [rippled-ws-client](https://www.npmjs.com/package/rippled-ws-client)
 - [rippled-ws-client-sign](https://www.npmjs.com/package/rippled-ws-client-sign)
 - [ripple-keypairs](https://www.npmjs.com/package/ripple-keypairs)

## Howto

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

####NOW EDIT THE SCRIPT YOU WOULD LIKE TO USE (*1) AND RUN IT:

```
node online-with-family-seed.js
```

or

```
node online-with-mnemonic.js
```

The script will connect to `s1.ripple.com`, sign and submit your transaction.

## *1 Edit the scripts

You should enter your `family seed` (sXXXXX...) aka your "secret" + your account address, or your mnemonic words in the file you want to use.

Edit **online-with-family-seed.js** on:

 - line 4 (family seed, sXXX..)
 - line 9 (wallet address, rXXX..)
 - line 10-13 to specify the trust to set

Or:


Edit **online-with-mnemonic.js.js** on:

 - line 11 (mnemonic words)
 - line 10-13 to specify the trust to set
 
## Remove a trust
 
To remove a trust line, send the same transactioon again but with the value `0`

---

By [@WietseWind](https://twitter.com/wietsewind) 
