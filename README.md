# BioX Teste

Uma aplicação backend robusta desenvolvida com NestJS seguindo princípios de Clean Architecture e Domain-Driven Design (DDD) para gerenciamento de receitas.

## 🌐 Projeto em Produção

A aplicação está disponível em: **https://biox-teste.onrender.com**

## 🚀 Tecnologias

- **Node.js** - Ambiente de execução JavaScript
- **NestJS** - Framework progressivo para Node.js
- **TypeScript** - Superset tipado do JavaScript
- **Prisma** - ORM moderno para TypeScript e Node.js
- **Zod** - Biblioteca de validação de schemas TypeScript-first
- **Vitest** - Framework de testes rápido e moderno
- **Faker.js** - Geração de dados falsos para testes
- **Docker** - Containerização da aplicação

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Docker](https://www.docker.com/) e Docker Compose
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/itspaulin/biox-teste.git
cd biox-teste
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Inicie o banco de dados com Docker:

```bash
docker-compose up -d
```

5. Execute as migrações do Prisma:

```bash
npx prisma migrate dev
npx prisma generate
```

## ⚡ Execução

### Desenvolvimento

```bash
# Modo de desenvolvimento
npm run start

# Modo de desenvolvimento com watch (reinicia automaticamente)
npm run start:dev
```

### Produção

```bash
# Compilar e executar em modo de produção
npm run build
npm run start:prod
```

A aplicação estará rodando em `http://localhost:3000`

## 🧪 Testes

```bash
# Testes unitários com Vitest
npm run test

# Testes em modo watch
npm run test:watch

# Testes end-to-end
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## 📚 Estrutura do Projeto

```
src/
├── core/                          # Camada de domínio
│   ├── @types/                    # Definições de tipos
│   ├── entities/                  # Entidades do domínio
│   └── errors/                    # Erros customizados
├── domain/                        # Lógica de negócio
│   ├── recipe/                    # Domínio de receitas
│   │   ├── application/           # Casos de uso
│   │   │   ├── repositories/      # Interfaces dos repositórios
│   │   │   └── use-cases/         # Casos de uso implementados
│   │   └── enterprise/            # Entidades empresariais
│   │       └── entities/          # Entidades do domínio
└── infra/                         # Camada de infraestrutura
    ├── database/                  # Configuração do banco
    │   ├── prisma/                # Configurações do Prisma
    │   └── mappers/               # Mapeadores de dados
    ├── http/                      # Camada HTTP
    │   ├── controllers/           # Controllers da API
    │   ├── pipes/                 # Pipes de validação
    │   └── presenters/            # Apresentadores de dados
    └── test/                      # Configurações de teste
        ├── factories/             # Factories para testes
        └── in-memory/             # Repositórios em memória
```

## 🛠️ Scripts Disponíveis

- `npm run start` - Inicia a aplicação em modo de desenvolvimento
- `npm run start:dev` - Inicia com hot reload
- `npm run start:prod` - Inicia em modo de produção
- `npm run build` - Compila o projeto
- `npm run test` - Executa os testes com Vitest
- `npm run test:watch` - Executa testes em modo watch
- `npm run test:e2e` - Executa os testes end-to-end
- `npm run test:cov` - Gera relatório de cobertura

## 🏗️ Arquitetura

O projeto segue os princípios de **Clean Architecture** e **Domain-Driven Design (DDD)**:

- **Core**: Contém as entidades e regras de negócio fundamentais
- **Domain**: Implementa os casos de uso e lógica de aplicação
- **Infrastructure**: Gerencia detalhes técnicos como banco de dados e HTTP

### Padrões Utilizados

- **Repository Pattern**: Abstração do acesso a dados
- **Use Cases**: Encapsulamento da lógica de negócio
- **Dependency Injection**: Inversão de controle
- **Mapper Pattern**: Conversão entre camadas
- **Factory Pattern**: Criação de objetos para testes

## 🌐 Endpoints da API

### Receitas

- `POST /create-recipe` - Criar nova receita
- `GET /get-recipes` - Listar todas as receitas
- `GET /get-recipe/:id` - Buscar receita por ID
- `PUT /update-recipe/:id` - Atualizar receita
- `DELETE /delete-recipe/:id` - Deletar receita

### Validação

Todos os endpoints utilizam validação com **Zod** para garantir a integridade dos dados de entrada.

## 🗄️ Banco de Dados

O projeto utiliza **Prisma** como ORM com as seguintes funcionalidades:

- Migrações automáticas
- Type-safe database queries
- Schema declarativo
- Geração automática de tipos TypeScript

### Comandos Prisma

```bash
# Gerar o cliente Prisma
npx prisma generate

# Executar migrações
npx prisma migrate dev

# Visualizar o banco de dados
npx prisma studio

# Reset do banco de dados
npx prisma migrate reset
```

## 🐳 Docker

O projeto inclui configuração Docker para fácil desenvolvimento:

```bash
# Subir apenas o banco de dados
docker-compose up -d database

# Subir toda a aplicação
docker-compose up -d
```

## 🧪 Testes

O projeto utiliza **Vitest** para testes unitários e **Faker.js** para geração de dados de teste:

- **Testes Unitários**: Testam casos de uso isoladamente
- **Testes de Integração**: Testam controllers e repositórios
- **In-Memory Repositories**: Simulam o banco de dados em testes
- **Factories**: Geram dados consistentes para testes

## ✨ Autor

**Paulo** - [@itspaulin](https://github.com/itspaulin)
