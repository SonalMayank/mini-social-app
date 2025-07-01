import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Game.css';

export default function GameScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="game-container">
      <div className="game-card">
        <h2 className="game-heading">🎮 Game {id} is in progress...</h2>
        <button className="back-btn" onClick={() => navigate('/')}>
          ⬅️ Back to Lobby
        </button>
      </div>
    </div>
  );
}
