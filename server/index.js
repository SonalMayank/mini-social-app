const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let wallet = {
  totalCoins: 100,
  transactions: [
    { id: 1, type: 'credit', amount: 100, description: 'Initial Coins' }
  ]
};

const games = [
  { id: 1, name: 'Challenge & Connect', entryCoins: 10, players: 5 },
  { id: 2, name: 'Snake & Ladder', entryCoins: 20, players: 3 }
];

// Routes
app.get('/games', (req, res) => res.json(games));

app.get('/wallet', (req, res) => res.json(wallet));

app.post('/wallet/recharge', (req, res) => {
  const { amount } = req.body;
  wallet.totalCoins += amount;
  wallet.transactions.push({ id: Date.now(), type: 'credit', amount, description: 'Recharge' });
  res.json(wallet);
});

app.post('/wallet/join', (req, res) => {
  const { gameId } = req.body;
  const game = games.find(g => g.id === gameId);
  if (!game) return res.status(404).json({ error: 'Game not found' });

  if (wallet.totalCoins < game.entryCoins)
    return res.status(400).json({ error: 'Insufficient coins' });

  wallet.totalCoins -= game.entryCoins;
  wallet.transactions.push({
    id: Date.now(),
    type: 'debit',
    amount: game.entryCoins,
    description: `Joined ${game.name}`
  });

  res.json(wallet);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
