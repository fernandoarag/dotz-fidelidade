const express = require('express');
const cors = require('cors');
const path = require('node:path');
const fs = require('node:fs');

// Importar rotas
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');
const orderRoutes = require('./routes/order.routes');
const transactionRoutes = require('./routes/transaction.routes');

// Inicializar express
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Simulação de delay para requisições (API real)
// CORREÇÃO: Adicionados os parâmetros req e res que estavam faltando
app.use((req, res, next) => {
  setTimeout(next, 300);
});

// Middleware para verificar se res.json está disponível
app.use((req, res, next) => {
  // Verificar se res.json existe
  if (typeof res.json !== 'function') {
    console.error('AVISO: res.json não é uma função!');
    // Recriar a função json se necessário
    res.json = obj => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(obj));
    };
  }
  next();
});

// Verificar se o diretório data existe
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Verificar se o arquivo db.json existe
const dbPath = path.join(dataDir, 'db.json');
if (!fs.existsSync(dbPath)) {
  // Dados iniciais
  const initialData = {
    users: [],
    addresses: [],
    categories: [],
    products: [],
    transactions: [],
    orders: [],
  };
  // Salvar dados iniciais
  fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
}

// Rotas públicas (sem autenticação)
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// Rotas protegidas (com autenticação)
// Adicionar middleware de autenticação apenas para estas rotas
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/transactions', transactionRoutes);

// Middleware para tratar erros
// CORREÇÃO: Adicionado o parâmetro req que estava faltando
app.use((err, res) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.info(`Servidor Express rodando na porta ${PORT}`);
  console.info(`API disponível em http://localhost:${PORT}/api/`);
});
