# Dotz - Sistema de Fidelidade

Este projeto implementa um sistema de fidelidade para a DOTZ, permitindo que clientes se cadastrem, consultem saldo de pontos, visualizem extrato de transações, resgatem produtos e acompanhem pedidos.

## Tecnologias Utilizadas

- **ReactJS (v18.0+)**: Framework para desenvolvimento do front-end
- **TypeScript**: Para tipagem estática e maior robustez no código
- **Styled-Components**: Para estilização dos componentes
- **React Router**: Para gerenciamento de rotas da aplicação
- **React Hook Form**: Para gerenciamento de formulários
- **Yup**: Para validação de dados de formulários
- **Axios**: Para requisições HTTP à API
- **JSON Server**: Para simular a API REST

## Arquitetura

O projeto foi estruturado seguindo os princípios de **Clean Architecture** e **Clean Code**, organizando o código em camadas bem definidas:

- **Core**: Contém as entidades de domínio e interfaces de repositórios
- **Application**: Implementa os casos de uso da aplicação
- **Infrastructure**: Contém as implementações concretas dos repositórios e serviços
- **Presentation**: Responsável pela interface do usuário, incluindo componentes React, páginas e hooks

Esta estrutura proporciona maior modularidade, testabilidade e manutenibilidade ao código.

## Funcionalidades

- **Cadastro de usuário**: Registro com validação de dados
- **Autenticação**: Login com armazenamento de token JWT
- **Dashboard**: Visualização de saldo de pontos e últimas transações
- **Gerenciamento de endereços**: Cadastro, edição e exclusão de endereços de entrega
- **Catálogo de produtos**: Listagem com filtros por categoria, preço e busca textual
- **Detalhe de produto**: Visualização e resgate de produtos
- **Pedidos**: Listagem de pedidos com status de entrega
- **Detalhe de pedido**: Acompanhamento de status de entrega e informações do pedido

## Como Executar o Projeto

### Pré-requisitos

- Node.js (v16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/dotz-fidelidade.git
cd dotz-fidelidade
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Inicie o servidor mock (JSON Server):

```bash
cd server
npm install -g json-server
node server.js
```

4. Em outro terminal, inicie a aplicação React:

```bash
npm start
# ou
yarn start
```

5. Acesse a aplicação no navegador:

```
http://localhost:3000
```

### Usuário de teste

Para testar a aplicação, você pode usar as seguintes credenciais:

- **Email**: joao@example.com
- **Senha**: qualquer senha funcionará no ambiente de desenvolvimento

## Estrutura de Diretórios

```
src/
├── core/                     # Camada de domínio
│   ├── domain/               # Entidades e regras de negócio
│   │   ├── entities/         # Entidades de domínio
│   │   ├── repositories/     # Interfaces de repositórios
│   │   └── services/         # Interfaces de serviços
├── application/              # Casos de uso da aplicação
│   ├── useCases/             # Casos de uso específicos
│   │   ├── auth/             # Autenticação
│   │   ├── user/             # Gerenciamento de usuário
│   │   ├── product/          # Produtos
│   │   └── order/            # Pedidos
├── infrastructure/           # Implementações concretas
│   ├── http/                 # Cliente HTTP (Axios)
│   ├── repositories/         # Implementações dos repositórios
│   ├── services/             # Implementações dos serviços
│   ├── storage/              # Serviço de armazenamento local
│   └── api/                  # Endpoints e métodos da API
├── presentation/             # Interface do usuário
│   ├── components/           # Componentes React
│   │   ├── common/           # Componentes reutilizáveis
│   │   ├── layout/           # Componentes de layout
│   │   └── features/         # Componentes específicos de funcionalidade
│   ├── hooks/                # Hooks customizados
│   ├── pages/                # Páginas da aplicação
│   ├── routes/               # Configuração de rotas
│   ├── contexts/             # Contextos React
│   └── theme/                # Tema do Styled-Components
├── config/                   # Configurações da aplicação
├── types/                    # Definições de tipos TypeScript
├── utils/                    # Utilitários compartilhados
├── App.tsx                   # Componente principal
└── index.tsx                 # Ponto de entrada
```

## Sobre a API Mock

A API mock simula o backend do sistema de fidelidade. Ela foi implementada usando JSON Server e fornece os seguintes endpoints:

- `/api/auth/login`: Autenticação de usuários
- `/api/users`: Gerenciamento de usuários
- `/api/users/profile`: Perfil do usuário logado
- `/api/users/addresses`: Endereços do usuário
- `/api/products`: Catálogo de produtos
- `/api/categories`: Categorias de produtos
- `/api/orders`: Pedidos do usuário
- `/api/transactions`: Transações de pontos

Os dados são persistidos no arquivo `server/db.json` e resetados a cada reinicialização do servidor.

## Design Responsivo

A aplicação implementa design responsivo utilizando Styled Components e media queries, garantindo uma boa experiência em dispositivos móveis, tablets e desktops.

## Melhorias Futuras

- Implementação de testes unitários com Jest e React Testing Library
- Implementação de filtros mais avançados e ordenação na listagem de produtos
- Paginação nas listagens de produtos, pedidos e transações
- Implementação de um sistema de notificações
- Otimização de performance com React.memo e useMemo

## Licença

MIT
