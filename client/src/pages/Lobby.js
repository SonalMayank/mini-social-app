import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Lobby.css';

export default function Lobby() {
  const [games, setGames] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/games')
      .then(res => setGames(res.data));
  }, []);

  const handleJoin = (game) => {
    axios.post('http://localhost:4000/wallet/join', { gameId: game.id })
      .then(() => navigate(`/game/${game.id}`))
      .catch(err => setError(err.response.data.error));
  };

  return (
    <div className="lobby-container">
      <h1 className="title">🎮 Game Lobby</h1>
      {error && <p className="error-msg">{error}</p>}
      
      <div className="game-grid">
        {games.map(game => (
          <div key={game.id} className="game-card">
            <h2>{game.name}</h2>
            <p>🎯 Entry Fee: <strong>{game.entryCoins}</strong> coins</p>
            <p>👥 Players: <strong>{game.players}</strong></p>
            <button className="join-btn" onClick={() => handleJoin(game)}>Join Game</button>
          </div>
        ))}
      </div>

      <button className="wallet-btn" onClick={() => navigate('/wallet')}>💰 Go to Wallet</button>
    </div>
  );
}
