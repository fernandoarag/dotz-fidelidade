const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Adiciona um delay para simular uma API real
server.use(next => {
  setTimeout(next, 800);
});

// Middleware para autenticação simulada
server.use((req, res, next) => {
  if (req.method === 'POST' && req.path === '/auth/login') {
    const { email } = req.body;

    const users = router.db.get('users').value();
    const user = users.find(u => u.email === email);

    if (user) {
      // Em uma aplicação real, verificaríamos a senha com hash
      res.jsonp({
        user,
        token: 'fake-jwt-token',
      });
    } else {
      res.status(400).jsonp({
        error: 'Usuário ou senha inválidos',
      });
    }

    return;
  }

  // Verificar token para rotas protegidas
  if (
    req.path.startsWith('/users') ||
    req.path.startsWith('/orders') ||
    req.path.startsWith('/transactions')
  ) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).jsonp({
        error: 'Não autorizado',
      });
      return;
    }
  }

  next();
});

// Middleware para registro de usuários
server.use((req, res, next) => {
  if (req.method === 'POST' && req.path === '/users') {
    const { email } = req.body;

    const users = router.db.get('users').value();
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      res.status(400).jsonp({
        error: 'Email já cadastrado',
      });
      return;
    }

    // Adicionar campos extras
    req.body.id = Date.now().toString();
    req.body.pointsBalance = 5000; // Saldo inicial
    req.body.createdAt = new Date().toISOString();

    next();
  } else {
    next();
  }
});

// Middleware para criar pedidos
server.use((req, res, next) => {
  if (req.method === 'POST' && req.path === '/orders') {
    // Adicionar campos extras
    req.body.id = Date.now().toString();
    req.body.status = 'PENDING';
    req.body.createdAt = new Date().toISOString();

    // Buscar os produtos para incluir informações completas
    const products = router.db.get('products').value();

    req.body.products = req.body.products.map(item => {
      const productDetails = products.find(p => p.id === item.productId);
      return {
        ...item,
        product: productDetails,
      };
    });

    // Atualizar o saldo de pontos do usuário
    const userId = req.body.userId;
    const user = router.db.get('users').find({ id: userId }).value();

    if (user) {
      const newBalance = user.pointsBalance - req.body.totalPoints;

      if (newBalance < 0) {
        res.status(400).jsonp({
          error: 'Saldo de pontos insuficiente',
        });
        return;
      }

      router.db.get('users').find({ id: userId }).assign({ pointsBalance: newBalance }).write();

      // Adicionar transação de resgate
      const transaction = {
        id: Date.now().toString(),
        userId,
        type: 'REDEEM',
        points: req.body.totalPoints,
        description: 'Resgate de produto(s)',
        createdAt: new Date().toISOString(),
      };

      router.db.get('transactions').push(transaction).write();
    }

    next();
  } else {
    next();
  }
});

// Usar arquivos de rotas customizadas
server.use(jsonServer.rewriter(router));

// Usar o router padrão do json-server
server.use(router);

server.listen(3001, () => {
  console.info('JSON Server está rodando na porta 3001');
});
