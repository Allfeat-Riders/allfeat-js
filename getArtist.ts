// Import
import '@allfeat/types/src/interfaces/augment-api';
import '@allfeat/types/src/interfaces/augment-types';
import { ApiPromise, WsProvider } from '@polkadot/api';

const walletAddress="0xB358CfAf4b2ad1CfeCC75791845EFA73af94812b";

const wsProvider = new WsProvider("wss://harmonie-endpoint-02.allfeat.io");
console.log("Provider")
async function query_artist_data() {
    // Construct
    try{
        const api = await ApiPromise.create({ provider: wsProvider });
        const artist_data = await api.query.artists.artistOf(walletAddress);
        console.log("la");
        console.log(artist_data.toHuman())
        // business logic goes here
    } catch (error) {
        console.error(error) // from creation or business logic
    }
}

query_artist_data().catch();
