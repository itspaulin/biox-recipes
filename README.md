# Biox Recipes

A recipe management system built with NestJS following Domain-Driven Design (DDD) principles. This application provides a comprehensive solution for managing recipes, ingredients, and cooking instructions.

## 🍳 About the Project

**Biox Recipes** is a robust and scalable backend application developed with the NestJS framework. The system implements DDD architecture to provide a clean separation of concerns and maintainable codebase for recipe management operations.

## 🛠️ Technologies Used

- **Framework:** [NestJS](https://nestjs.com/) - A progressive Node.js framework
- **Language:** TypeScript
- **Runtime:** Node.js
- **Architecture:** Domain-Driven Design (DDD) + Clean Architecture
- **Testing:** Unit and Integration testing

## 📋 Prerequisites

Before getting started, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## 🚀 Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/itspaulin/biox-recipes.git
   cd biox-recipes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit the .env file with your configurations
   ```

4. **Start the application**
   ```bash
   npm run start:dev
   ```

## 📁 Project Structure

This project follows **Domain-Driven Design (DDD)** architecture principles:

```
biox-recipes/
├── src/
│   ├── core/                  # Core domain layer
│   │   ├── entities/          # Base entities and domain objects
│   │   ├── errors/            # Domain-specific errors
│   │   └── utils/             # Core utilities
│   ├── domain/
│   │   └── recipe/            # Recipe domain
│   │       ├── application/   # Application layer
│   │       │   ├── repositories/    # Repository contracts
│   │       │   └── use-cases/       # Business use cases
│   │       │       ├── errors/      # Use case specific errors
│   │       │       ├── create-recipe.specs.ts
│   │       │       ├── create-recipe.usecase.ts
│   │       │       ├── delete-recipe.usecase.spec.ts
│   │       │       ├── delete-recipe.usecase.ts
│   │       │       ├── get-all-recipes.spec.ts
│   │       │       ├── get-all-recipes.usecase.ts
│   │       │       ├── get-recipe-by-id.usecase.ts
│   │       │       ├── get-recipe-by-id.spec.ts
│   │       │       ├── get-recipe-by-title.spec.ts
│   │       │       ├── get-recipe-by-title.usecase.ts
│   │       │       ├── update-recipe.spec.ts
│   │       │       └── update-recipe.usecase.ts
│   │       └── enterprise/    # Enterprise business rules
│   │           └── entities/  # Domain entities
│   │               └── recipe.ts
│   ├── infra/                 # Infrastructure layer
│   │   ├── database/          # Database implementations
│   │   └── http/              # HTTP controllers and routes
│   ├── app.module.ts          # Main application module
│   └── main.ts                # Application entry point
├── test/                      # Test files
├── dist/                      # Compiled output
├── .gitignore                 # Git ignore rules
├── nest-cli.json              # NestJS CLI configuration
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md
```

## 🏗️ Architecture Overview

This project implements **Domain-Driven Design (DDD)** with **Clean Architecture** principles:

### **Core Layer** 
- **Entities**: Base domain entities and shared domain objects
- **Errors**: Core domain error handling
- **Utils**: Core utility functions

### **Domain Layer**
- **Recipe Domain**: Complete recipe management domain
  - **Application Layer**:
    - **Repositories**: Repository contracts and interfaces
    - **Use Cases**: Business logic implementation
      - Create Recipe
      - Delete Recipe  
      - Get All Recipes
      - Get Recipe by ID
      - Get Recipe by Title
      - Update Recipe
  - **Enterprise Layer**:
    - **Entities**: Recipe domain entity with business rules

### **Infrastructure Layer**
- **Database**: Database access and implementations
- **HTTP**: Controllers, routes, and HTTP-related infrastructure

## 🔧 Available Scripts

### Development
```bash
# Development mode
npm run start

# Development mode with hot reload
npm run start:dev

# Production mode
npm run start:prod
```

### Testing
```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode for tests
npm run test:watch
```

### Build
```bash
# Build for production
npm run build
```

## 🔌 API Endpoints

The API provides comprehensive endpoints for recipe management:

### Recipes
- **GET** `/recipes` - Get all recipes
- **GET** `/recipes/:id` - Get recipe by ID
- **GET** `/recipes/title/:title` - Get recipe by title
- **POST** `/recipes` - Create a new recipe
- **PUT** `/recipes/:id` - Update an existing recipe
- **DELETE** `/recipes/:id` - Delete a recipe

*Detailed API documentation can be found at `/api/docs` when the server is running.*

## 🧪 Testing Strategy

The project includes comprehensive testing following DDD principles:

- **Unit Tests**: Testing individual use cases and domain entities
- **Integration Tests**: Testing the interaction between layers
- **Domain Tests**: Ensuring business rules are properly implemented

Each use case includes corresponding test files (`.spec.ts`) to ensure reliability and maintainability.

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start:prod
```

### Docker (if applicable)
```bash
docker build -t biox-recipes .
docker run -p 3000:3000 biox-recipes
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Paulin** - [@itspaulin](https://github.com/itspaulin)

Project Link: [https://github.com/itspaulin/biox-recipes](https://github.com/itspaulin/biox-recipes)

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) for the amazing framework
- [TypeScript](https://www.typescriptlang.org/) for type safety
- DDD Community for architectural guidance
- All contributors who helped make this project better

---

⭐ If you found this project helpful, please give it a star!
