"use client";


import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

// Replace with your deployed contract address
const contractAddress = '0xYourDeployedContractAddress';

// Replace with your contract ABI
const contractABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "player",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "won",
                "type": "bool"
            }
        ],
        "name": "CoinFlipped",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "bool",
                "name": "_guess",
                "type": "bool"
            }
        ],
        "name": "flipCoin",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdrawBalance",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

export default function Page() {
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
    const [signer, setSigner] = useState<ethers.Signer | null>(null);
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [amount, setAmount] = useState<string>('');
    const [status, setStatus] = useState<string>('');

    useEffect(() => {
        if (provider) {
            const newSigner = provider.getSigner();
            setSigner(newSigner);
            const newContract = new ethers.Contract(contractAddress, contractABI, newSigner);
            setContract(newContract);
        }
    }, [provider]);

    const connectWallet = async () => {
      try {
          const web3Modal = new Web3Modal();
          const connection = await web3Modal.connect();
  
          if (!connection) {
              throw new Error('Connection object is null or undefined');
          }
  
          const newProvider = new ethers.providers.Web3Provider(connection);
          setProvider(newProvider);
      } catch (error) {
          // Log the error details for debugging
          console.error('Error connecting to wallet:', error);
  
          // Check if the error is an instance of Error
          if (error instanceof Error) {
              console.error('Error message:', error.message);
              console.error('Error stack:', error.stack);
          } else {
              console.error('Unexpected error type:', typeof error);
          }
  
          // Provide a user-friendly message
          setStatus('Failed to connect wallet. Please try again.');
      }
  };
  
  

  



    const flipCoin = async (guess: boolean) => {
        if (!contract) return;
        try {
            const tx = await contract.flipCoin(guess, { value: ethers.utils.parseEther(amount) });
            await tx.wait();
            setStatus('Coin flipped!');
        } catch (error) {
            console.error(error);
            setStatus('Error flipping coin.');
        }
    };

    return (
        <div>
            <button onClick={connectWallet}>Connect Wallet</button>
            <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount in ETH"
            />
            <button onClick={() => flipCoin(true)}>Heads</button>
            <button onClick={() => flipCoin(false)}>Tails</button>
            <p>{status}</p>
        </div>
    );
}
