import React, { useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS";
const CONTRACT_ABI = [
  {
    inputs: [],
    name: "buyWithNative",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "buyWithUSDT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const DApp = () => {
  const [account, setAccount] = useState(null);
  const [signer, setSigner] = useState(null);
  const [amount, setAmount] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const signer = provider.getSigner();
    setSigner(signer);
    setAccount(await signer.getAddress());
  };

  const buyWithNative = async () => {
    if (!signer) return alert("Connect wallet first!");
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    const tx = await contract.buyWithNative({
      value: ethers.utils.parseEther(amount),
    });
    await tx.wait();
    alert("Transaction successful!");
  };

  return (
    <div>
      <h1>BSC DApp</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>Connected: {account}</p>
      )}
      <input
        type="text"
        placeholder="Amount (BNB)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={buyWithNative}>Buy with BNB</button>
    </div>
  );
};

export default DApp;
