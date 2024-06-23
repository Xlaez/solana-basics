import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
  Connection,
  PublicKey,
  sendAndConfirmTransaction,
  SystemInstruction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

const suppliedToPubKey = process.argv[2] || null;

if (!suppliedToPubKey) {
  console.log("Please provide a public key to send to");
  process.exit(1);
}

const senderKeyPair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`supplied to public key: ${suppliedToPubKey}`);

const toPublicKey = new PublicKey(suppliedToPubKey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const transaction = new Transaction();

const LAMPORTS_TO_SEND = 5000;

const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: senderKeyPair.publicKey,
  toPubkey: toPublicKey,
  lamports: LAMPORTS_TO_SEND,
});

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  senderKeyPair,
]);

console.log(`Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPublicKey}`);

console.log(`Transaction signature is ${signature}`);
