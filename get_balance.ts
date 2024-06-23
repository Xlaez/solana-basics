// 97qVru9PiWpTVZ5UuPSNRHPPDJQZN5AmpbjcoQvw4Etk

import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const publicKey = new PublicKey("97qVru9PiWpTVZ5UuPSNRHPPDJQZN5AmpbjcoQvw4Etk");

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
  `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
);
