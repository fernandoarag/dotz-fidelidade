// server/routes/category.routes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Rota para obter todas as categorias
router.get('/', (req, res) => {
  // Verificar se res.json existe antes de chamar o controlador
  if (typeof res.json !== 'function') {
    console.error('res.json não é uma função!');
    res.status(500).send('Erro interno do servidor');
    return;
  }

  // Chamar o controlador
  productController.getCategories(req, res);
});

module.exports = router;
