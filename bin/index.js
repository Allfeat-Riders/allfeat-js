"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import
require("@allfeat/types/src/interfaces/augment-api");
require("@allfeat/types/src/interfaces/augment-types");
const api_1 = require("@polkadot/api");
const wsProvider = new api_1.WsProvider();
async function query_artist_data() {
    // Construct
    const api = await api_1.ApiPromise.create({ provider: wsProvider });
    const artist_data = await api.query.artists.artistOf("0xf24FF3a9CF04c71Dbc94D0b566f7A27B94566cac");
    console.log(artist_data.toHuman());
}
query_artist_data().catch();
