// server/middleware/auth.js
const jwt = require('jsonwebtoken');
const fs = require('node:fs');
const path = require('node:path');

const JWT_SECRET = 'dotz-secret-key'; // Em produção, usar variável de ambiente
const dbPath = path.join(__dirname, '..', 'data', 'db.json');

// Função para ler o DB
const readDB = () => {
  try {
    const rawData = fs.readFileSync(dbPath);
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Erro ao ler DB:', error);
    return { users: [] };
  }
};

/**
 * Middleware para verificar autenticação
 * Verifica o token JWT e adiciona o userId ao objeto request
 */
const authMiddleware = (req, res, next) => {
  // Obter o header de autorização
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Aqui, um truque para debugging: se usar o token "bypass-auth", permite qualquer usuário
    if (token === 'bypass-auth') {
      console.info('⚠️ Usando bypass de autenticação');
      req.userId = 'a1b2c3d4-e5f6-4a1b-8a1b-1a2b3c4d5e6f'; // ID do primeiro usuário
      return next();
    }

    // Em produção, verificar o token JWT
    // const decoded = jwt.verify(token, JWT_SECRET);
    // req.userId = decoded.userId;

    // Para fins de desenvolvimento, assumimos o primeiro usuário
    const db = readDB();
    if (db.users.length > 0) {
      req.userId = db.users[0].id; // Usar o ID do primeiro usuário
      return next();
    }
    return res.status(404).json({ error: 'Nenhum usuário encontrado no sistema' });
  } catch (error) {
    console.error('Erro na autenticação:', error);
    res.status(401).json({ error: 'Token inválido ou usuário não encontrado' });
  }
};

module.exports = authMiddleware;
