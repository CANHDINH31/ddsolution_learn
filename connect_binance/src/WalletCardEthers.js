import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./WalletCard.css";

const WalletCardEthers = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const [provider, setProvider] = useState(null);

  const connectWalletHandler = () => {
    if (window.BinanceChain && defaultAccount == null) {
      // set ethers provider
      setProvider(new ethers.providers.Web3Provider(window.BinanceChain));

      // connect to metamask
      window.BinanceChain.request({ method: "eth_requestAccounts" })
        .then((result) => {
          setConnButtonText("Wallet Connected");
          setDefaultAccount(result[0]);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else if (!window.BinanceChain) {
      console.log("Need to install Binance");
      setErrorMessage("Please install Binance browser extension to interact");
    }
  };

  useEffect(() => {
    if (defaultAccount) {
      provider.getBalance(defaultAccount).then((balanceResult) => {
        setUserBalance(ethers.utils.formatEther(balanceResult));
      });
    }
  }, [defaultAccount]);

  return (
    <div className="walletCard">
      <h4> Connection to Binance using ethers.js </h4>
      <button onClick={connectWalletHandler}>{connButtonText}</button>
      <div className="accountDisplay">
        <h3>Address: {defaultAccount}</h3>
      </div>
      <div className="balanceDisplay">
        <h3>Balance: {userBalance}</h3>
      </div>
      {errorMessage}
    </div>
  );
};

export default WalletCardEthers;
