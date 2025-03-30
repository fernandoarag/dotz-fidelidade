const path = require('node:path');
const fs = require('node:fs');

const dbPath = path.join(__dirname, '..', 'data', 'db.json');

// Função de apoio - Ler DB
const readDB = () => {
  try {
    const rawData = fs.readFileSync(dbPath);
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Erro ao ler DB:', error);
    return { products: [], categories: [] };
  }
};

/**
 * Listar produtos
 * GET /api/products
 */
const getProducts = (req, res) => {
  try {
    const { categoryId, search, minPoints, maxPoints } = req.query;

    console.info('Buscando produtos com filtros:', { categoryId, search, minPoints, maxPoints });

    const db = readDB();
    let filteredProducts = [...db.products];

    // Aplicar filtros
    if (categoryId) {
      filteredProducts = filteredProducts.filter(p => p.categoryId === categoryId);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        p =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower),
      );
    }

    if (minPoints) {
      filteredProducts = filteredProducts.filter(
        p => p.pointsPrice >= Number.parseInt(minPoints, 10),
      );
    }

    if (maxPoints) {
      filteredProducts = filteredProducts.filter(
        p => p.pointsPrice <= Number.parseInt(maxPoints, 10),
      );
    }

    console.info(`Retornando ${filteredProducts.length} produtos`);
    return res.json(filteredProducts);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return res.status(500).json({ error: 'Erro interno ao buscar produtos' });
  }
};

/**
 * Obter produto por ID
 * GET /api/products/:id
 */
const getProductById = (req, res) => {
  try {
    const { id } = req.params;

    console.info(`Buscando produto com ID: ${id}`);

    const db = readDB();
    const product = db.products.find(p => p.id === id);

    if (!product) {
      console.info('Produto não encontrado');
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    return res.json(product);
  } catch (error) {
    console.error('Erro ao buscar produto por ID:', error);
    return res.status(500).json({ error: 'Erro interno ao buscar produto' });
  }
};

/**
 * Listar categorias
 * GET /api/categories
 */
const getCategories = (req, res) => {
  try {
    console.info('Buscando categorias');

    const db = readDB();

    if (!db || !db.categories) {
      console.error('Categorias não encontradas no DB');
      return res.status(500).json({ error: 'Erro ao buscar categorias' });
    }

    console.info(`Retornando ${db.categories.length} categorias`);
    return res.json(db.categories);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return res.status(500).json({ error: 'Erro interno ao buscar categorias' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getCategories,
};
