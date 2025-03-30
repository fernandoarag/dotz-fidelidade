// server/controllers/order.controller.js
const { v4: uuidv4 } = require('uuid');
const path = require('node:path');
const fs = require('node:fs');

const dbPath = path.join(__dirname, '..', 'data', 'db.json');

// Função de apoio - Ler DB
const readDB = () => {
  const rawData = fs.readFileSync(dbPath);
  return JSON.parse(rawData);
};

// Função de apoio - Salvar DB
const saveDB = db => {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
};

/**
 * Projeta apenas os campos necessários de um produto
 * Evita referências circulares e dados desnecessários
 */
const projectProduct = product => {
  if (!product) return null;

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    pointsPrice: product.pointsPrice,
    imageUrl: product.imageUrl,
    available: product.available,
  };
};

/**
 * Projeta apenas os campos necessários de um item de pedido
 */
const projectOrderItem = item => {
  return {
    productId: item.productId,
    quantity: item.quantity,
    pointsPrice: item.pointsPrice,
    product: item.product ? projectProduct(item.product) : null,
  };
};

/**
 * Projeta apenas os campos necessários de um pedido
 */
const projectOrder = order => {
  if (!order) return null;

  return {
    id: order.id,
    userId: order.userId,
    products: Array.isArray(order.products) ? order.products.map(projectOrderItem) : [],
    totalPoints: order.totalPoints,
    status: order.status,
    addressId: order.addressId,
    createdAt: order.createdAt,
  };
};

/**
 * Listar pedidos do usuário
 * GET /api/orders
 */
const getOrders = (req, res) => {
  try {
    console.info('Buscando todos os pedidos para usuário:', req.userId);

    const db = readDB();
    const orders = db.orders.filter(o => o.userId === req.userId);

    // Projetar apenas os campos necessários para evitar referências circulares
    const projectedOrders = orders.map(projectOrder);

    console.info(`Retornando ${projectedOrders.length} pedidos`);

    res.json(projectedOrders);
  } catch (error) {
    console.error('Erro ao listar pedidos:', error);
    res.status(500).json({ error: 'Erro interno ao processar pedidos' });
  }
};

/**
 * Obter pedido por ID
 * GET /api/orders/:id
 */
const getOrderById = (req, res) => {
  try {
    const { id } = req.params;

    console.info(`Buscando pedido com ID: ${id} para usuário: ${req.userId}`);

    const db = readDB();
    const order = db.orders.find(o => o.id === id && o.userId === req.userId);

    if (!order) {
      console.info('Pedido não encontrado');
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    // Projetar apenas os campos necessários
    const projectedOrder = projectOrder(order);

    console.info('Pedido encontrado e projetado com sucesso');

    res.json(projectedOrder);
  } catch (error) {
    console.error('Erro ao buscar pedido por ID:', error);
    res.status(500).json({ error: 'Erro interno ao buscar pedido' });
  }
};

/**
 * Criar pedido (resgatar produtos)
 * POST /api/orders
 */
const createOrder = (req, res) => {
  try {
    const { products, totalPoints, addressId } = req.body;

    // Validação de entrada
    if (!products || !products.length || !totalPoints || !addressId) {
      return res.status(400).json({ error: 'Dados incompletos para criar pedido' });
    }

    const db = readDB();

    // Verificar se o usuário tem pontos suficientes
    const user = db.users.find(u => u.id === req.userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (user.pointsBalance < totalPoints) {
      return res.status(400).json({ error: 'Saldo de pontos insuficiente' });
    }

    // Verificar se o endereço existe
    const address = db.addresses.find(a => a.id === addressId && a.userId === req.userId);

    if (!address) {
      return res.status(404).json({ error: 'Endereço não encontrado' });
    }

    // Verificar se os produtos existem e estão disponíveis
    for (const item of products) {
      const product = db.products.find(p => p.id === item.productId);
      if (!product || !product.available) {
        return res.status(400).json({
          error: `Produto ${item.productId} não está disponível`,
        });
      }
    }

    // Adicionar detalhes dos produtos (de forma simplificada)
    const productsWithDetails = products.map(p => {
      const product = db.products.find(prod => prod.id === p.productId);
      return {
        productId: p.productId,
        quantity: p.quantity,
        pointsPrice: p.pointsPrice,
        product: projectProduct(product), // Usar apenas campos necessários
      };
    });

    // Criar pedido
    const newOrder = {
      id: uuidv4(),
      userId: req.userId,
      products: productsWithDetails,
      totalPoints,
      status: 'PENDING',
      addressId,
      createdAt: new Date().toISOString(),
    };

    // Atualizar saldo de pontos do usuário
    user.pointsBalance -= totalPoints;

    // Adicionar transação
    const transaction = {
      id: uuidv4(),
      userId: req.userId,
      type: 'REDEEM',
      points: totalPoints,
      description: 'Resgate de produto(s)',
      createdAt: new Date().toISOString(),
    };

    db.orders.push(newOrder);
    db.transactions.push(transaction);

    // Atualizar o usuário no DB
    const userIndex = db.users.findIndex(u => u.id === req.userId);
    db.users[userIndex] = user;

    saveDB(db);

    // Retornar uma versão simplificada do pedido
    res.status(201).json(projectOrder(newOrder));
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ error: 'Erro interno ao criar pedido' });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
};
