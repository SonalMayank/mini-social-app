import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Wallet.css';

export default function Wallet() {
  const [wallet, setWallet] = useState(null);
  const navigate = useNavigate();

  const fetchWallet = () => {
    axios.get('http://localhost:4000/wallet').then(res => setWallet(res.data));
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  const addCoins = (amount) => {
    axios.post('http://localhost:4000/wallet/recharge', { amount })
      .then(() => fetchWallet());
  };

  if (!wallet) return <p style={{ color: 'white', textAlign: 'center' }}>Loading...</p>;

  return (
    <div className="wallet-container">
      <div className="wallet-card">
        <div className="wallet-title">
          <span role="img" aria-label="wallet">💰</span> Wallet
        </div>

        <div className="coins">Total Coins: {wallet.totalCoins}</div>

        <div className="recharge-section">
          <div className="recharge-title">
            <span role="img" aria-label="plus">➕</span> Recharge:
          </div>
          <button className="recharge-btn" onClick={() => addCoins(50)}>+50 Coins</button>
          <button className="recharge-btn" onClick={() => addCoins(100)}>+100 Coins</button>
        </div>

        <div className="transaction-title">
          <span role="img" aria-label="scroll">📜</span> Transactions:
        </div>
        <ul className="transactions">
          {wallet.transactions.map(tx => (
            <li key={tx.id}>
              {tx.description} - {tx.type === 'credit' ? '+' : '-'}{tx.amount}
            </li>
          ))}
        </ul>

        {/* 🎮 Go to Lobby Button */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <button className="recharge-btn" onClick={() => navigate('/')}>
            🎮 Go to Lobby
          </button>
        </div>
      </div>
    </div>
  );
}
