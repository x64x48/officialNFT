# nft

edit
`
test/env.json
` -> for test case
```
vi test/env.json
```

`
.secret
` -> mnemonic for truffle
```
echo "your_mnemonic" > .secret
```

```
npm install
npm install -g truffle
truffle deploy --network testnet --reset
```

# test case

1. mint erc721 token (onlyOwner)

2. approve erc20 token to erc721

3. buy erc721 token

4. withdrew erc20 from erc721 (onlyOwner)
