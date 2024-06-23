import { initializeKeypair } from "@solana-developers/helpers";
import { clusterApiUrl, Connection, Signer } from "@solana/web3.js";

interface NftData {
  name: string;
  symbol: string;
  description: string;
  sellerFeeBasisPoints: number;
  imageFile: string;
}

interface CollectionNftData {
  name: string;
  symbol: string;
  description: string;
  sellerFeeBasisPoints: number;
  imageFile: string;
  isCollection: boolean;
  collectionAuthority: Signer;
}

const nftData = {
  name: "Name",
  symbol: "SYMBOL",
  description: "Description",
  sellerFeeBasisPoints: 0,
  imageFile: "success.png",
};

const updateNftData = {
  name: "Update",
  symbol: "UPDATE",
  description: "Update Description",
  sellerFeeBasisPoints: 100,
  imageFile: "nft.png",
};

async function main() {
  const connection = new Connection(clusterApiUrl("devnet"));

  const user = await initializeKeypair(connection);

  console.log("PublicKey:", user.publicKey.toBase58());
}
