const { ethers } = require("ethers");

const INFURA_ID = "498da44948b644678855d3207cdb0e99";
const provider = new ethers.providers.JsonRpcProvider(
  `https://kovan.infura.io/v3/${INFURA_ID}`
);

const account1 = "0x799274Aa57975cD2F8c69Fdc54131A53B487b6b8";
const account2 = "0x2E9c6E9330FB173186D88AC419212aE748a6b943";

const privateKey1 =
  "255838c5ea8d4f000d8790f35ee28b801e1413ba3b73a120322907932ca76ad0";
const wallet = new ethers.Wallet(privateKey1, provider);

const main = async () => {
  const senderBalanceBefore = await provider.getBalance(account1);
  const recieverBalanceBefore = await provider.getBalance(account2);

  console.log(
    `\nSender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`
  );
  console.log(
    `reciever balance before: ${ethers.utils.formatEther(
      recieverBalanceBefore
    )}\n`
  );

  const tx = await wallet.sendTransaction({
    to: account2,
    value: ethers.utils.parseEther("0.025"),
  });

  await tx.wait();
  console.log(tx);

  const senderBalanceAfter = await provider.getBalance(account1);
  const recieverBalanceAfter = await provider.getBalance(account2);

  console.log(
    `\nSender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`
  );
  console.log(
    `reciever balance after: ${ethers.utils.formatEther(
      recieverBalanceAfter
    )}\n`
  );
};

main();
