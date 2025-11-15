"use client";

import { useEffect, useState } from "react";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import TriviaWeb3 from "../components/Game/TriviaWeb3";
import styles from "../pages/page.module.css";
import { ethers } from "ethers";

export default function Home() {
  const { isFrameReady, setFrameReady, context } = useMiniKit();
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    if (!isFrameReady) setFrameReady();
  }, [isFrameReady, setFrameReady]);

  const connectWallet = async () => {
    try {
      if (!(window as any).ethereum) return alert("Please install MetaMask/Base Wallet!");
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []);
      setWalletConnected(true);
      alert("Wallet connected!");
    } catch (err) {
      console.error(err);
      alert("Failed to connect wallet");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Web3 Trivia</h1>
        {context?.user?.displayName && <p>Welcome, {context.user.displayName}!</p>}
      </div>

      <div className={styles.mainContent}>
        <div className={styles.gameContainer}>
          <TriviaWeb3 />
        </div>

        <button
          onClick={connectWallet}
          className={`${styles.joinButton} mt-4`}
        >
          {walletConnected ? "Wallet Connected" : "Connect Base Wallet"}
        </button>
      </div>
    </div>
  );
}
