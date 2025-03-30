const path = require('node:path');
const fs = require('node:fs');

const dbPath = path.join(__dirname, '..', 'data', 'db.json');

// Função de apoio - Ler DB
const readDB = () => {
  const rawData = fs.readFileSync(dbPath);
  return JSON.parse(rawData);
};

/**
 * Listar transações do usuário
 * GET /api/transactions
 */
const getTransactions = (req, res) => {
  const db = readDB();

  // Filtrar transações do usuário
  const transactions = db.transactions.filter(t => t.userId === req.userId);

  // Ordenar por data (mais recentes primeiro)
  transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json(transactions);
};

/**
 * Obter saldo de pontos do usuário
 * GET /api/users/points-balance
 * (Implementado no user.controller, mas também poderia ficar aqui)
 */

module.exports = {
  getTransactions,
};
