// Import
import '@allfeat/types/src/interfaces/augment-api';
import '@allfeat/types/src/interfaces/augment-types';

import { ApiPromise, WsProvider, Keyring  } from '@polkadot/api';

const wsProvider = new WsProvider("wss://harmonie-endpoint-02.allfeat.io");

console.log("Provider")
async function query_artist_data() {
    // Construct
    try{
    const api = await ApiPromise.create({ provider: wsProvider });
    console.log(await api.rpc.system.chain());
    console.log(await api.rpc.system.name());
    console.log(await api.rpc.system.version());
//   const artist_data = await api.query.artists.artistOf("0xB358CfAf4b2ad1CfeCC75791845EFA73af94812b");

    // Créez un keyring pour gérer les clés
    const index = 0;
    const derivationPath = "m/44'/60'/0'/0/" + index;
    const mnemonic = "YOUR_PRIVATE_KEY";
    const keyring = new Keyring({ type: 'ethereum' });
    const sender = keyring.addFromUri(`${mnemonic}/${derivationPath}`);
    console.log(sender);

    // Vérifiez la longueur de la clé
    console.log('Public Key:', sender.publicKey);
    console.log('Public Key Length:', sender.publicKey.length);

   const artist_data = api.tx.artists.update({ maintype: 'Singer'});
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
//            unsub();
        }
    });

//console.log('Transaction hash:', hash.toHex());

// Retrieve the chain & node information via rpc calls
//  const [chain, nodeName, nodeVersion] = await Promise.all([
//    api.rpc.system.chain(),
//    api.rpc.system.name(),
//    api.rpc.system.version()
//  ]);

//  console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);


} catch (error) {
    console.error(error) // from creation or business logic
}
}

query_artist_data().catch();
