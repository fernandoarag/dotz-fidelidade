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
 * Obter perfil do usuário
 * GET /api/users/profile
 */
const getProfile = (req, res) => {
  const db = readDB();
  const user = db.users.find(u => u.id === req.userId);

  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  res.json(user);
};

/**
 * Atualizar perfil do usuário
 * PUT /api/users/profile
 */
const updateProfile = (req, res) => {
  const { name, phone } = req.body;

  const db = readDB();
  const userIndex = db.users.findIndex(u => u.id === req.userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  // Atualizar apenas os campos permitidos
  db.users[userIndex] = {
    ...db.users[userIndex],
    name: name || db.users[userIndex].name,
    phone: phone || db.users[userIndex].phone,
  };

  saveDB(db);

  res.json(db.users[userIndex]);
};

/**
 * Obter saldo de pontos
 * GET /api/users/points-balance
 */
const getPointsBalance = (req, res) => {
  const db = readDB();
  const user = db.users.find(u => u.id === req.userId);

  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  res.json({ balance: user.pointsBalance });
};

/**
 * Listar endereços do usuário
 * GET /api/users/addresses
 */
const getAddresses = (req, res) => {
  const db = readDB();
  const addresses = db.addresses.filter(addr => addr.userId === req.userId);
  res.json(addresses);
};

/**
 * Adicionar endereço
 * POST /api/users/addresses
 */
const addAddress = (req, res) => {
  const { street, number, complement, neighborhood, city, state, zipCode, isDefault } = req.body;

  // Validação de entrada
  if (!street || !number || !neighborhood || !city || !state || !zipCode) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
  }

  const db = readDB();

  // Se o novo endereço for padrão, remover o padrão de outros endereços
  if (isDefault) {
    for (const addr of db.addresses) {
      if (addr.userId === req.userId && addr.isDefault) {
        addr.isDefault = false;
      }
    }
  }

  const newAddress = {
    id: uuidv4(),
    userId: req.userId,
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
    zipCode,
    isDefault: isDefault || false,
  };

  db.addresses.push(newAddress);
  saveDB(db);

  res.status(201).json(newAddress);
};

/**
 * Atualizar endereço
 * PUT /api/users/addresses/:id
 */
const updateAddress = (req, res) => {
  const { id } = req.params;
  const { street, number, complement, neighborhood, city, state, zipCode, isDefault } = req.body;

  const db = readDB();
  const addressIndex = db.addresses.findIndex(addr => addr.id === id && addr.userId === req.userId);

  if (addressIndex === -1) {
    return res.status(404).json({ error: 'Endereço não encontrado' });
  }

  // Se definindo como padrão, remover o padrão de outros endereços
  if (isDefault && !db.addresses[addressIndex].isDefault) {
    for (const addr of db.addresses) {
      if (addr.userId === req.userId && addr.isDefault) {
        addr.isDefault = false;
      }
    }
  }

  // Atualizar endereço
  db.addresses[addressIndex] = {
    ...db.addresses[addressIndex],
    street: street || db.addresses[addressIndex].street,
    number: number || db.addresses[addressIndex].number,
    complement: complement !== undefined ? complement : db.addresses[addressIndex].complement,
    neighborhood: neighborhood || db.addresses[addressIndex].neighborhood,
    city: city || db.addresses[addressIndex].city,
    state: state || db.addresses[addressIndex].state,
    zipCode: zipCode || db.addresses[addressIndex].zipCode,
    isDefault: isDefault !== undefined ? isDefault : db.addresses[addressIndex].isDefault,
  };

  saveDB(db);

  res.json(db.addresses[addressIndex]);
};

/**
 * Excluir endereço
 * DELETE /api/users/addresses/:id
 */
const deleteAddress = (req, res) => {
  const { id } = req.params;

  const db = readDB();
  const addressIndex = db.addresses.findIndex(addr => addr.id === id && addr.userId === req.userId);

  if (addressIndex === -1) {
    return res.status(404).json({ error: 'Endereço não encontrado' });
  }

  // Não permitir exclusão de endereço padrão
  if (db.addresses[addressIndex].isDefault) {
    return res.status(400).json({ error: 'Não é possível excluir o endereço padrão' });
  }

  db.addresses.splice(addressIndex, 1);
  saveDB(db);

  res.status(204).send();
};

module.exports = {
  getProfile,
  updateProfile,
  getPointsBalance,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
};
