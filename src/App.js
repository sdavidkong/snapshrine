import "./App.css";
import { useState, useEffect } from "react";
import Dropzone from "./components/Dropzone.js";
import Gallery from "./components/Gallery";

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const permissions = [
    "ACCESS_ADDRESS",
    "SIGN_TRANSACTION",
    "SIGNATURE",
    "ACCESS_PUBLIC_KEY",
    "ACCESS_ALL_ADDRESSES",
  ];

  async function connect() {
    await window.arweaveWallet.connect(permissions);
    setWalletConnected(true);
    return;
  }

  async function getWalletAddress() {
    return await window.arweaveWallet.getActiveAddress();
  }

  useEffect(() => {
    if (walletConnected) {
      getWalletAddress().then((address) => {
        setWalletAddress(address);
      });
    }
  }, [walletConnected]);

  return (
    <div className="container">
      <h3>Your Permaweb Photo Album, Powered by Arweave</h3>
      {walletConnected ? (
        <div className="connectedButton">
          Connected to {walletAddress.substring(0, 6)}...
        </div>
      ) : (
        <button className="button" onClick={connect}>
          Use Arconnect Wallet
        </button>
      )}
      <Dropzone />
      <Gallery walletAddress={walletAddress} />
      <h2>
        Note: In order to use this app, you must have{" "}
        <a href="https://www.arconnect.io/" target="_blank">
          Arconnect Wallet
        </a>{" "}
        installed and funded with some{" "}
        <a href="https://faucet.arweave.net/" target="_blank">
          AR token
        </a>
        .{" "}
      </h2>
      <h2>
        Created by{" "}
        <a href="https://twitter.com/ShuaiDavidKong" target="_blank">
          davidkong.eth
        </a>
      </h2>
    </div>
  );
}

export default App;
