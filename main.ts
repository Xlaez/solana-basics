import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));

const address = new PublicKey("CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN");

let balance: number = 0;

const func = async () => {
  balance = await connection.getBalance(address);
};

func()
  .then((_) => {
    console.log(`Balance: ${balance}`);
  })
  .catch((e) => {
    console.error(e);
  });
