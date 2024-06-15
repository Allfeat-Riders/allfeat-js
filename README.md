
```
bun install
```

#### Adapt walletAddress to your address
And run:
```
bun run getArtist.ts
```

#### Adapt this line with your private key in updateArtist.ts
```
const mnemonic = "YOUR_PRIVATE_KEY";
```

#### Change data you would like update line 31:
```
const artist_data = api.tx.artists.update({ maintype: 'Singer'});
```

And run:

```
bun run updateArtist.ts
```
