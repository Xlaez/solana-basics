// import { createMint } from "@solana/spl-token";
// import "dotenv/config";
// import {
//   getKeypairFromEnvironment,
//   getExplorerLink,
// } from "@solana-developers/helpers";
// import { Connection, clusterApiUrl } from "@solana/web3.js";

// const connection = new Connection(clusterApiUrl("devnet"));

// const user = getKeypairFromEnvironment("SECRET_KEY");

// console.log(
//   `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
// );

// // SystemProgram.createAccount
// // token.createInitializeMintInstruction
// // See https://www.soldev.app/course/token-program
// const tokenMint = await createMint(connection, user, user.publicKey, null, 2);

// const link = getExplorerLink("address", tokenMint.toString(), "devnet");

// console.log(`✅ Finished! Created token mint: ${link}`);

import { createMint } from "@solana/spl-token";
import "dotenv/config";
import {
  getKeypairFromEnvironment,
  getExplorerLink,
} from "@solana-developers/helpers";
import {
  Connection,
  PublicKey,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

const connection = new Connection(clusterApiUrl("devnet"));

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
);

const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

const tokenMintAccount = new PublicKey(
  "91NZC24bkHYLnQaMVYoSfp28E5DRhagoZEwvmM1MDjyv"
);

const metaData = {
  name: "Ex Token",
  symbol: "TRAINING",
  uri: "https://arweave.net/1234",
  sellerFeeBasisPoints: 0,
  creators: null,
  collection: null,
  uses: null,
};

const metaDataPDDAAndBump = PublicKey.findProgramAddressSync(
  [
    Buffer.from("metadata"),
    TOKEN_METADATA_PROGRAM_ID.toBuffer(),
    tokenMintAccount.toBuffer(),
  ],
  TOKEN_METADATA_PROGRAM_ID
);

const metaDataPDA = metaDataPDDAAndBump[0];

const transaction = new Transaction();

const createMetaDataAccountInstruction =
  createCreateMetadataAccountV3Instruction(
    {
      metadata: metaDataPDA,
      mint: tokenMintAccount,
      mintAuthority: user.publicKey,
      payer: user.publicKey,
      updateAuthority: user.publicKey,
    },
    {
      createMetadataAccountArgsV3: {
        collectionDetails: null,
        data: metaData,
        isMutable: true,
      },
    }
  );

transaction.add(createMetaDataAccountInstruction);

const transactionSignature = await sendAndConfirmTransaction(
  connection,
  transaction,
  [user]
);

const transactionLink = getExplorerLink(
  "transaction",
  transactionSignature,
  "devnet"
);

console.log(`✅ Transaction confirmed, explorer link is: ${transactionLink}!`);

const tokenMintLink = getExplorerLink(
  "address",
  tokenMintAccount.toString(),
  "devnet"
);

console.log(`✅ Look at the token mint again: ${tokenMintLink}!`);
