// Import
import '@allfeat/types/src/interfaces/augment-api';
import '@allfeat/types/src/interfaces/augment-types';

import { ApiPromise, WsProvider, Keyring  } from '@polkadot/api';

//let wsProvider = "ws://127.0.0.1:9944"
// Create the instance
//const api = new ApiPromise({ provider: wsProvider });

// Wait until we are ready and connected
//await api.isReady;

// Do something
//console.log(api.genesisHash.toHex());


//const wsProvider = new WsProvider("ws://harmonie-endpoint-02.allfeat.io:9944");
const wsProvider = new WsProvider("wss://harmonie-endpoint-02.allfeat.io");
//const wsProvider = new WsProvider("http://harmonie-endpoint-02.allfeat.io");
console.log("Provider")
async function query_artist_data() {
    // Construct
try{
    const api = await ApiPromise.create({ provider: wsProvider });
console.log(await api.rpc.system.chain());
console.log(await api.rpc.system.name());
console.log(await api.rpc.system.version());
//   const artist_data = await api.query.artists.artistOf("0xB358CfAf4b2ad1CfeCC75791845EFA73af94812b");

// Some mnemonic phrase
//const PHRASE = 'entire material egg meadow latin bargain dutch coral blood melt acoustic thought';
const PHRASE = 'sleep spend soap range machine interest sheriff nasty such autumn kitchen scale';

// Créez un keyring pour gérer les clés
//const keyring = new Keyring({ type: 'sr25519' });
//const keyring = new Keyring({ type: 'ecdsa' });


const index = 0;
const derivationPath = "m/44'/60'/0'/0/" + index;
const mnemonic = "0xa0da98fe09594087c5559b25244ee20a2e66eab66b3fe5263be7de47caed7847";
const keyring = new Keyring({ type: 'ethereum' });
const sender = keyring.addFromUri(`${mnemonic}/${derivationPath}`);

// Add an account, straight mnemonic
//const sender = keyring.addFromUri(PHRASE);
//const sender = keyring.addFromUri('//ETHTAL');
console.log(sender);

    // Vérifiez la longueur de la clé
    console.log('Public Key:', sender.publicKey);
    console.log('Public Key Length:', sender.publicKey.length);


//   const artist_data = await api.tx.artists.update({ maintype: 'Producer' });
   const artist_data = api.tx.artists.update({ maintype: 'Producer'});
console.log("la");
//    console.log(artist_data.toHuman())
    console.log(artist_data.toHuman())
    // business logic goes here
const hash = await artist_data.signAndSend(sender, ({ status, events }) => {
        console.log(`Statut de la transaction : ${status}`);

        if (status.isInBlock) {
            console.log(`Inclus dans le bloc: ${status.asInBlock}`);

            events.forEach(({ event: { method, section } }) => {
                console.log(`\t${section}.${method}`);
            });
        }

        if (status.isFinalized) {
            console.log(`Finalisé dans le bloc: ${status.asFinalized}`);
            unsub();
        }
    });

console.log('Transaction hash:', hash.toHex());

  // Retrieve the chain & node information via rpc calls
  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version()
  ]);

  console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);


} catch (error) {
    console.error(error) // from creation or business logic
}
}

query_artist_data().catch();
