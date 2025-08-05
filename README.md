# Event Management System

A fullstack application for managing events, built with Java Spring Boot backend and React frontend.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete events
- **Event Attributes**:
  - ID (auto-generated)
  - Title
  - Start Date & Time
  - End Date & Time
  - Price
  - Status (Started, Completed, Paused)
- **Validation**: Events cannot be created with end date before start date
- **Modern UI**: Built with Material-UI components
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

### Backend
- **Java 17** with Spring Boot 3.2.0
- **Spring Data JPA** for database operations
- **PostgreSQL** (production) / **H2** (development)
- **Hibernate** as ORM
- **Spring Validation** for input validation
- **CORS** configured for frontend communication

### Frontend
- **React 18** with functional components and hooks
- **Material-UI** for modern UI components
- **React Router** for navigation
- **Axios** for API communication
- **Day.js** for date handling
- **React Hook Form** for form management

### Database
- **PostgreSQL 15** (production)
  - Robust, scalable database
  - ACID compliance
  - Advanced features for production use
- **H2 Database** (development)
  - Fast startup for development
  - Console available at `http://localhost:8080/h2-console`

## Project Structure

```
event-management-app/
├── backend/
│   ├── src/main/java/com/eventmanagement/
│   │   ├── controller/
│   │   ├── model/
│   │   ├── repository/
│   │   ├── service/
│   │   └── exception/
│   ├── src/main/resources/
│   │   ├── application.properties  # (Cópia do profile de dev, usado apenas como fallback. Recomenda-se sempre rodar com profiles explícitos.)
│   │   ├── application-dev.properties
│   │   └── application-prod.properties
│   ├── pom.xml
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── services/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites

#### For macOS
- macOS Ventura or newer recommended
- Homebrew installed ([brew.sh](https://brew.sh))
- Java 17+ (`brew install openjdk@17`)
- Maven (`brew install maven`)
- Node.js 18+ ([nvm recommended](https://github.com/nvm-sh/nvm))
- Git (`brew install git`)
- PostgreSQL 15 (`brew install postgresql@15`)
- H2 (no installation needed, embedded)

#### For Windows 11 (WSL)
- Windows 11 with [WSL 2](https://learn.microsoft.com/en-us/windows/wsl/install)
- Ubuntu 22.04 (recommended) installed via WSL
- Java 17+ (`sudo apt install openjdk-17-jdk`)
- Maven (`sudo apt install maven`)
- Node.js 18+ ([nvm recommended](https://github.com/nvm-sh/nvm))
- Git (`sudo apt install git`)
- PostgreSQL 15 (`sudo apt install postgresql postgresql-contrib`)
- H2 (no installation needed, embedded)

### Environment Validation (WSL/macOS)

Run these commands in your terminal to check if all dependencies are installed:

```bash
# Java
java -version
# Maven
mvn -version
# Node.js
node -v
npm -v
# Git
git --version
# PostgreSQL (optional, for production profile)
psql --version
```

If any command fails, install the missing dependency using the instructions above.

### Project Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd event-management-app
   ```

### Running Backend

#### Option 1: Development with H2 (Quick Start)

1. **Go to backend directory**
   ```bash
   cd backend
   ```

2. **Run with development profile**
   ```bash
   mvn spring-boot:run -Dspring-boot.run.profiles=dev
   ```

Backend will start at `http://localhost:8080` using H2 in-memory database.

#### Option 2: Production with PostgreSQL

1. **Start PostgreSQL service**
   - **macOS:**
     ```bash
     brew services start postgresql@15
     createdb eventdb
     ```
   - **WSL:**
     ```bash
     sudo service postgresql start
     createdb eventdb
     ```

2. **Go to backend directory**
   ```bash
   cd backend
   ```

3. **Run with production profile**
   ```bash
   export DATABASE_URL=jdbc:postgresql://localhost:5432/eventdb
   export DATABASE_USERNAME=postgres
   export DATABASE_PASSWORD=password
   mvn spring-boot:run -Dspring-boot.run.profiles=prod
   ```

### Running Frontend

1. **Go to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

Frontend will be available at `http://localhost:3000`

### Notes for WSL

- Work inside your Ubuntu/WSL terminal for best compatibility and performance.
- You do not need Docker Desktop; all commands run natively in WSL.
- PostgreSQL can be installed and run inside WSL.
- For VSCode users, install the [Remote - WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) extension for seamless editing.

## Perfis de Execução

O backend pode ser executado em diferentes perfis, cada um com configurações específicas de banco de dados:

### Desenvolvimento (H2)
- **Banco:** H2 em memória
- **Usuário:** sa
- **Senha:** password
- **Console:** http://localhost:8080/h2-console
- **Schema:** schema-h2.sql
- **Comando:**
  ```bash
  mvn spring-boot:run -Dspring-boot.run.profiles=dev
  ```

### Produção (PostgreSQL)
- **Banco:** PostgreSQL
- **Usuário padrão:** postgres
- **Senha padrão:** password
- **Schema:** schema-postgres.sql
- **Comando:**
  ```bash
  export DATABASE_URL=jdbc:postgresql://localhost:5432/eventdb
  export DATABASE_USERNAME=postgres
  export DATABASE_PASSWORD=password
  mvn spring-boot:run -Dspring-boot.run.profiles=prod
  ```
- **Observação:** As variáveis de ambiente podem ser customizadas conforme o ambiente de produção.

### Docker
- O perfil `docker` é utilizado automaticamente ao rodar via Docker Compose, utilizando PostgreSQL containerizado.

## Configuração dos Arquivos de Propriedades

- `application-dev.properties`: configurações para desenvolvimento local com H2.
- `application-prod.properties`: configurações para produção com PostgreSQL, usando variáveis de ambiente para URL, usuário e senha.

## Exemplos de Execução

#### Backend (Desenvolvimento)
```bash
cd event-management-app/backend
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

#### Backend (Produção)
```bash
cd event-management-app/backend
export DATABASE_URL=jdbc:postgresql://localhost:5432/eventdb
export DATABASE_USERNAME=postgres
export DATABASE_PASSWORD=password
mvn spring-boot:run -Dspring-boot.run.profiles=prod
```

#### Backend (Docker)
```bash
cd fe2025
docker-compose up --build
```

## API Endpoints

### Events
- `GET /api/events` - Get all events
- `GET /api/events/{id}` - Get event by ID
- `POST /api/events` - Create new event
- `PUT /api/events/{id}` - Update event
- `DELETE /api/events/{id}` - Delete event

### Request/Response Format

#### Create/Update Event
```json
{
  "title": "Event Title",
  "startDate": "2024-01-15T10:00:00",
  "endDate": "2024-01-15T12:00:00",
  "price": 50.00,
  "status": "STARTED"
}
```

#### Event Response
```json
{
  "id": 1,
  "title": "Event Title",
  "startDate": "2024-01-15T10:00:00",
  "endDate": "2024-01-15T12:00:00",
  "price": 50.00,
  "status": "STARTED"
}
```

## Features and Functionality

### Event Management
- **Create Events**: Add new events with title, dates, price, and status
- **View Events**: Browse all events in a card-based layout
- **Edit Events**: Modify existing event details
- **Delete Events**: Remove events with confirmation
- **Event Details**: View comprehensive event information

### Validation
- **Date Validation**: End date cannot be before start date
- **Required Fields**: All fields are mandatory
- **Price Validation**: Price must be greater than 0
- **Status Options**: Only "STARTED", "COMPLETED", or "PAUSED" allowed

### User Interface
- **Responsive Design**: Works on all screen sizes
- **Material Design**: Modern, clean interface
- **Loading States**: Visual feedback during operations
- **Error Handling**: Clear error messages
- **Navigation**: Intuitive routing between pages

## Technical Decisions

### Database Choice: PostgreSQL
- **Production-ready** database with ACID compliance
- **Scalable** for growing applications
- **Advanced features** like JSON support, full-text search
- **Connection pooling** with HikariCP
- **Easy migration** from H2 to PostgreSQL

### Styling: Material-UI
- **Consistent design** across components
- **Built-in responsive** design
- **Accessibility** features included
- **Theme customization** available

### State Management: React Hooks
- **useState** for local component state
- **useEffect** for side effects
- **Custom hooks** for reusable logic
- **Context API** ready for global state if needed

### Clean Code Principles Applied

#### Backend (Java/Spring)
- **Dependency Injection**: Constructor injection instead of field injection
- **DTO Pattern**: Separation of concerns between API and domain models
- **Single Responsibility**: Each method has one clear purpose
- **Method Extraction**: Complex logic broken into smaller, focused methods
- **Error Handling**: Centralized exception handling with GlobalExceptionHandler
- **Naming Conventions**: Descriptive method and variable names

#### Frontend (React)
- **Custom Hooks**: Reusable logic extracted into `useEvent` hook
- **Component Separation**: Single responsibility for each component
- **Error Handling**: Centralized error handling in custom hooks
- **Code Reusability**: Shared logic across components
- **Readable Code**: Clear variable names and function purposes

## Development

### Running Tests
```bash
# Backend tests
cd backend
mvn test

# Frontend tests
cd frontend
npm test
```

### Code Quality
- **ESLint** for JavaScript/React code
- **Prettier** for code formatting
- **Maven** for Java build and dependency management

## Deployment

### Production Considerations
- Use PostgreSQL with proper connection pooling
- Configure environment variables for database credentials
- Set up proper CORS settings
- Enable HTTPS
- Configure logging and monitoring
- Use `application-prod.properties` profile

### Docker Production
```bash
# Build production images
docker-compose -f docker-compose.prod.yml up --build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## WSL Troubleshooting

If you get "Network is unreachable" or cannot run `sudo apt-get update` in WSL:

1. Disable IPv6 in `/etc/sysctl.conf`:
   ```
   net.ipv6.conf.all.disable_ipv6 = 1
   net.ipv6.conf.default.disable_ipv6 = 1
   net.ipv6.conf.lo.disable_ipv6 = 1
   ```
   Then run:
   ```bash
   sudo sysctl -p
   wsl --shutdown
   # Restart Ubuntu terminal
   sudo apt-get update
   ```

2. Optionally, set DNS to Google:
   ```bash
   echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf
   ```

3. Remove unused Docker repo if not using Docker in WSL:
   ```bash
   sudo rm /etc/apt/sources.list.d/docker.list
   sudo apt-get update
   ```

## Frontend Troubleshooting

If you see the error:

```
'react-scripts' is not recognized as an internal or external command,
operable program or batch file.
```

Try the following steps:

1. Make sure you are in the `frontend` directory.
2. Delete `node_modules` and `package-lock.json`:
   ```bash
   rm -rf node_modules package-lock.json
   ```
3. Reinstall dependencies:
   ```bash
   npm install
   ```
4. Start the development server again:
   ```bash
   npm start
   ```
5. If the error persists, check that `react-scripts` is listed in your `package.json` dependencies. If not, install it manually:
   ```bash
   npm install react-scripts --save
   ```