"use client";

import { useState, useEffect } from "react";
import { useQuickAuth, useMiniKit } from "@coinbase/onchainkit/minikit";
import { useRouter } from "next/navigation";
import { minikitConfig } from "../minikit.config";
import TriviaWeb3 from "@/components/Game/TriviaWeb3";
import styles from "./page.module.css";
import { ethers } from "ethers";

interface AuthResponse {
  success: boolean;
  user?: {
    fid: number;
    issuedAt?: number;
    expiresAt?: number;
    displayName?: string;
  };
  message?: string;
}

export default function Home() {
  const { isFrameReady, setFrameReady, context } = useMiniKit();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const router = useRouter();

  // Initialize the miniapp
  useEffect(() => {
    if (!isFrameReady) setFrameReady();
  }, [isFrameReady, setFrameReady]);

  const { data: authData, isLoading: isAuthLoading, error: authError } = useQuickAuth<AuthResponse>(
    "/api/auth",
    { method: "GET" }
  );

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isAuthLoading) return setError("Please wait while we verify your identity...");
    if (authError || !authData?.success) return setError("Please authenticate to join the waitlist");
    if (!email) return setError("Please enter your email address");
    if (!validateEmail(email)) return setError("Please enter a valid email address");

    console.log("Valid email submitted:", email);
    console.log("User authenticated:", authData.user);

    router.push("/success");
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask!");
      const provider = new ethers.BrowserProvider(window.ethereum);
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
        <h1>{minikitConfig.miniapp.name}</h1>
        {context?.user?.displayName && <p>Welcome, {context.user.displayName}!</p>}
      </div>

      <div className={styles.mainContent}>
        {/* Waitlist Form */}
        <div className={styles.waitlistForm}>
          <h2>Join Early Access</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.emailInput}
            />
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.joinButton}>
              JOIN WAITLIST
            </button>
          </form>

          {/* Wallet Connect */}
          <button
            onClick={connectWallet}
            className={`${styles.joinButton} mt-4`}
          >
            {walletConnected ? "Wallet Connected" : "Connect Base Wallet"}
          </button>
        </div>

        {/* Trivia Game */}
        <div className={styles.gameContainer}>
          <TriviaWeb3 />
        </div>
      </div>
    </div>
  );
}
