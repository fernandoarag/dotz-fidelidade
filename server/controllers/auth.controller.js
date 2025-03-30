// server/controllers/auth.controller.js
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const path = require('node:path');
const fs = require('node:fs');

const JWT_SECRET = 'dotz-secret-key'; // Em produção, usar variável de ambiente
const dbPath = path.join(__dirname, '..', 'data', 'db.json');

// Função de apoio - Ler DB
const readDB = () => {
  try {
    const rawData = fs.readFileSync(dbPath);
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Erro ao ler DB:', error);
    return { users: [] };
  }
};

// Função de apoio - Salvar DB
const saveDB = db => {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
};

// Gerar token JWT
const generateToken = userId => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

/**
 * Login de usuário
 * POST /api/auth/login
 */
const login = (req, res) => {
  const { email, password } = req.body;

  // Validação de entrada
  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  // Buscar usuário
  const db = readDB();
  const user = db.users.find(u => u.email === email);

  if (!user) {
    return res.status(400).json({ error: 'Usuário ou senha inválidos' });
  }

  // Verificar senha (em produção, usaríamos bcrypt)
  if (password !== user.password) {
    return res.status(400).json({ error: 'Usuário ou senha inválidos' });
  }

  // Gerar token JWT
  const token = generateToken(user.id);

  // Remover senha da resposta
  const { password: _, ...userWithoutPassword } = user;

  res.json({
    user: userWithoutPassword,
    token,
  });
};

/**
 * Registro de usuário
 * POST /api/auth/register
 */
const register = (req, res) => {
  const { name, email, password, phone } = req.body;

  // Validação de entrada
  if (!name || !email || !password || !phone) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  const db = readDB();

  // Verificar se o email já existe
  if (db.users.some(u => u.email === email)) {
    return res.status(400).json({ error: 'Email já cadastrado' });
  }

  // Criar novo usuário
  const newUser = {
    id: uuidv4(), // Gerar UUID único
    name,
    email,
    password, // Em produção, hashear esta senha
    phone,
    pointsBalance: 5000, // Saldo inicial
    createdAt: new Date().toISOString(),
  };

  // Salvar no DB
  db.users.push(newUser);
  saveDB(db);

  // Gerar token
  const token = generateToken(newUser.id);

  // Remover senha da resposta
  const { password: _, ...userWithoutPassword } = newUser;

  res.status(201).json({
    user: userWithoutPassword,
    token,
  });
};

module.exports = {
  login,
  register,
};
