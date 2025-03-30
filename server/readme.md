# API Express para o Sistema Dotz

Esta API fornece todos os endpoints necessários para o funcionamento do sistema de fidelidade Dotz.

## Estrutura do Projeto

```
server/
├── controllers/         # Controladores para cada recurso
├── middleware/          # Middlewares (autenticação, etc.)
├── routes/              # Definição de rotas
├── data/                # Dados persistidos (db.json)
├── server.js            # Arquivo principal
└── package.json         # Dependências
```

## Instalação

```bash
# Instalar dependências
npm install

# Ou se estiver usando a pasta server
cd server
npm install
```

## Uso

```bash
# Iniciar o servidor
npm start

# Iniciar com nodemon para desenvolvimento
npm run dev

# Iniciar servidor React e API simultaneamente
npm run dev:full
```

## Endpoints da API

### Autenticação

- **POST /api/auth/login** - Login de usuário

  - Corpo: `{ "email": "string", "password": "string" }`
  - Resposta: `{ "user": {...}, "token": "string" }`

- **POST /api/auth/register** - Registro de usuário
  - Corpo: `{ "name": "string", "email": "string", "password": "string", "phone": "string" }`
  - Resposta: `{ "user": {...}, "token": "string" }`

### Usuário

- **GET /api/users/profile** - Obter perfil do usuário

  - Cabeçalho: `Authorization: Bearer {token}`
  - Resposta: `{ "id": "string", "name": "string", ... }`

- **PUT /api/users/profile** - Atualizar perfil do usuário

  - Cabeçalho: `Authorization: Bearer {token}`
  - Corpo: `{ "name": "string", "phone": "string" }`
  - Resposta: `{ "id": "string", "name": "string", ... }`

- **GET /api/users/points-balance** - Obter saldo de pontos
  - Cabeçalho: `Authorization: Bearer {token}`
  - Resposta: `{ "balance": number }`

### Endereços

- **GET /api/users/addresses** - Listar endereços

  - Cabeçalho: `Authorization: Bearer {token}`
  - Resposta: `[{ "id": "string", "street": "string", ... }]`

- **POST /api/users/addresses** - Adicionar endereço

  - Cabeçalho: `Authorization: Bearer {token}`
  - Corpo: `{ "street": "string", "number": "string", ... }`
  - Resposta: `{ "id": "string", "street": "string", ... }`

- **PUT /api/users/addresses/:id** - Atualizar endereço

  - Cabeçalho: `Authorization: Bearer {token}`
  - Corpo: `{ "street": "string", "number": "string", ... }`
  - Resposta: `{ "id": "string", "street": "string", ... }`

- **DELETE /api/users/addresses/:id** - Excluir endereço
  - Cabeçalho: `Authorization: Bearer {token}`
  - Resposta: `204 No Content`

### Produtos

- **GET /api/products** - Listar produtos

  - Parâmetros de consulta: `categoryId`, `search`, `minPoints`, `maxPoints`
  - Resposta: `[{ "id": "string", "name": "string", ... }]`

- **GET /api/products/:id** - Obter produto por ID

  - Resposta: `{ "id": "string", "name": "string", ... }`

- **GET /api/categories** - Listar categorias
  - Resposta: `[{ "id": "string", "name": "string", ... }]`

### Pedidos

- **GET /api/orders** - Listar pedidos

  - Cabeçalho: `Authorization: Bearer {token}`
  - Resposta: `[{ "id": "string", "status": "string", ... }]`

- **GET /api/orders/:id** - Obter pedido por ID

  - Cabeçalho: `Authorization: Bearer {token}`
  - Resposta: `{ "id": "string", "status": "string", ... }`

- **POST /api/orders** - Criar pedido
  - Cabeçalho: `Authorization: Bearer {token}`
  - Corpo:
    ```json
    {
      "products": [
        {
          "productId": "string",
          "quantity": number,
          "pointsPrice": number
        }
      ],
      "totalPoints": number,
      "addressId": "string"
    }
    ```
  - Resposta: `{ "id": "string", "status": "string", ... }`

### Transações

- **GET /api/transactions** - Listar transações
  - Cabeçalho: `Authorization: Bearer {token}`
  - Resposta: `[{ "id": "string", "type": "string", "points": number, ... }]`

## Autenticação

A API utiliza autenticação baseada em token JWT:

1. O cliente obtém um token através do login ou registro
2. O token deve ser incluído no cabeçalho `Authorization` como `Bearer {token}`
3. Todas as rotas protegidas verificam este token

## Persistência de Dados

Os dados são persistidos em um arquivo `db.json` na pasta `data`.

## Desenvolvimento

Para desenvolvimento, é recomendado usar o script `npm run dev` que utiliza o nodemon para reiniciar automaticamente o servidor quando há mudanças no código.

## Integração com Frontend

Esta API foi projetada para trabalhar com a aplicação frontend Dotz. Para executar ambos juntos, use o script `npm run dev:full`.
