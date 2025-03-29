// express-server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Simular delay
app.use((req, res, next) => {
  setTimeout(next, 800);
});

// Carregar dados do db.json
let dbData = {};
try {
  const dbPath = path.join(__dirname, 'db.json');
  if (fs.existsSync(dbPath)) {
    const rawData = fs.readFileSync(dbPath);
    dbData = JSON.parse(rawData);
  } else {
    // Criar estrutura inicial do banco se não existir
    dbData = {
      users: [],
      products: [],
      orders: [],
      transactions: [],
    };
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
  }
} catch (error) {
  console.error('Erro ao carregar banco de dados:', error);
}

// Função para salvar dados no db.json
const saveData = () => {
  try {
    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(dbData, null, 2));
  } catch (error) {
    console.error('Erro ao salvar banco de dados:', error);
  }
};

// Rota de login - suporta ambos os caminhos
app.post(['/auth/login', '/api/auth/login'], (req, res) => {
  const { email } = req.body;
  const user = dbData.users.find(u => u.email === email);

  if (user) {
    res.json({
      user,
      token: 'fake-jwt-token',
    });
  } else {
    res.status(400).json({
      error: 'Usuário ou senha inválidos',
    });
  }
});

// Middleware para autenticação
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Não autorizado',
    });
  }

  next();
};

// Rotas para usuários
app.get(['/users', '/api/users'], authMiddleware, (req, res) => {
  res.json(dbData.users);
});

app.post(['/users', '/api/users'], (req, res) => {
  const { email } = req.body;
  const existingUser = dbData.users.find(u => u.email === email);

  if (existingUser) {
    return res.status(400).json({
      error: 'Email já cadastrado',
    });
  }

  const newUser = {
    ...req.body,
    id: Date.now().toString(),
    pointsBalance: 5000,
    createdAt: new Date().toISOString(),
  };

  dbData.users.push(newUser);
  saveData();

  res.status(201).json(newUser);
});

app.get(['/users/points-balance', '/api/users/points-balance'], (req, res) => {
  console.log(req.body);
  const userId = req.body.userId;
  const user = dbData.users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({
      error: 'Usuário não encontrado',
    });
  }

  const pointsBalance = user.pointsBalance;

  res.json(pointsBalance);
});

// Rotas para produtos
app.get(['/products', '/api/products'], (req, res) => {
  res.json(dbData.products);
});

// Rotas para pedidos
app.get(['/orders', '/api/orders'], authMiddleware, (req, res) => {
  res.json(dbData.orders);
});

app.post(['/orders', '/api/orders'], authMiddleware, (req, res) => {
  const userId = req.body.userId;
  const user = dbData.users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({
      error: 'Usuário não encontrado',
    });
  }

  // Processar produtos
  const orderProducts = req.body.products.map(item => {
    const productDetails = dbData.products.find(p => p.id === item.productId);
    return {
      ...item,
      product: productDetails,
    };
  });

  // Verificar saldo
  const totalPoints = req.body.totalPoints;
  const newBalance = user.pointsBalance - totalPoints;

  if (newBalance < 0) {
    return res.status(400).json({
      error: 'Saldo de pontos insuficiente',
    });
  }

  // Criar pedido
  const newOrder = {
    ...req.body,
    id: Date.now().toString(),
    status: 'PENDING',
    createdAt: new Date().toISOString(),
    products: orderProducts,
  };

  // Atualizar saldo do usuário
  user.pointsBalance = newBalance;

  // Adicionar transação
  const transaction = {
    id: Date.now().toString(),
    userId,
    type: 'REDEEM',
    points: totalPoints,
    description: 'Resgate de produto(s)',
    createdAt: new Date().toISOString(),
  };

  // Atualizar db
  dbData.orders.push(newOrder);
  dbData.transactions.push(transaction);
  saveData();

  res.status(201).json(newOrder);
});

// Rotas para transações
app.get(['/transactions', '/api/transactions'], authMiddleware, (req, res) => {
  res.json(dbData.transactions);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});
