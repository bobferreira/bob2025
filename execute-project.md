# Como Executar o Projeto Event Management System

Este documento contém instruções passo a passo para configurar e executar o projeto Event Management System com implementação de Clean Code.

## 🧹 Clean Code Implementado

O projeto foi refatorado seguindo princípios de Clean Code:

### Backend (Java/Spring Boot)
- ✅ **Dependency Injection**: Constructor injection em vez de field injection
- ✅ **DTO Pattern**: Separação entre API e modelos de domínio
- ✅ **Single Responsibility**: Métodos pequenos e focados
- ✅ **Error Handling**: Tratamento centralizado de exceções
- ✅ **Method Extraction**: Lógica complexa dividida em métodos menores

### Frontend (React)
- ✅ **Custom Hooks**: Lógica reutilizável extraída (`useEvent`)
- ✅ **Component Separation**: Responsabilidades bem definidas
- ✅ **Error Handling**: Tratamento centralizado de erros
- ✅ **Code Reusability**: Lógica compartilhada entre componentes

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Git** (para clonar o repositório)
- **Docker** e **Docker Compose** (recomendado)
- **Java 17** ou superior (se executar localmente)
- **Node.js 18** ou superior (se executar localmente)
- **Maven 3.6** ou superior (se executar localmente)

## 🚀 Passo a Passo para Executar o Projeto

### 1. Clonar o Repositório

```bash
# Clone o repositório do GitHub
git clone https://github.com/seu-usuario/fe2025.git

# Navegue para o diretório do projeto
cd fe2025
```

### 2. Verificar a Estrutura do Projeto

Após clonar, você deve ver a seguinte estrutura:

```
fe2025/
├── docker-compose.yml
├── README.md
├── execute-project.md
└── event-management-app/
    ├── backend/
    │   ├── Dockerfile
    │   ├── pom.xml
    │   └── src/
    │       └── main/java/com/eventmanagement/
    │           ├── controller/
    │           ├── dto/           # DTOs para separação de responsabilidades
    │           ├── exception/
    │           ├── model/
    │           ├── repository/
    │           └── service/
    └── frontend/
        ├── Dockerfile
        ├── package.json
        └── src/
            ├── components/
            ├── hooks/             # Custom hooks para reutilização
            └── services/
```

### 3. Executar com Docker (Recomendado)

#### Opção A: Execução Completa com Docker Compose

```bash
# Certifique-se de estar no diretório raiz do projeto
cd fe2025

# Construir e executar todos os serviços
docker-compose up --build
```

**O que acontece:**
- O Docker irá construir as imagens do backend e frontend
- O backend será executado na porta 8080
- O frontend será executado na porta 3000
- O banco H2 será inicializado automaticamente

#### Opção B: Execução em Background

```bash
# Executar em background (modo detached)
docker-compose up --build -d

# Para ver os logs
docker-compose logs -f

# Para parar os serviços
docker-compose down
```

### 4. Acessar a Aplicação

Após a execução bem-sucedida, você pode acessar:

- **Frontend (Interface do Usuário)**: http://localhost:3000
- **Backend (API)**: http://localhost:8080/api/events
- **Console do Banco H2**: http://localhost:8080/h2-console

### 5. Executar Localmente (Alternativa)

Se preferir não usar Docker, você pode executar localmente:

#### Backend (Java/Spring Boot)

```bash
# Navegar para o diretório do backend
cd event-management-app/backend

# Instalar dependências e compilar
mvn clean install

# Executar a aplicação
mvn spring-boot:run
```

#### Frontend (React)

```bash
# Navegar para o diretório do frontend
cd event-management-app/frontend

# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm start
```

## 🔧 Comandos Úteis do Docker

### Gerenciamento de Containers

```bash
# Ver containers em execução
docker ps

# Ver logs de um container específico
docker logs <container-name>

# Parar todos os containers
docker-compose down

# Reconstruir e executar
docker-compose up --build

# Executar apenas o backend
docker-compose up backend

# Executar apenas o frontend
docker-compose up frontend
```

### Limpeza e Manutenção

```bash
# Parar e remover containers, redes e volumes
docker-compose down -v

# Remover imagens não utilizadas
docker image prune

# Limpar tudo (cuidado!)
docker system prune -a
```

## 🐛 Solução de Problemas

### Problema: Porta já em uso

```bash
# Verificar o que está usando a porta
lsof -i :8080
lsof -i :3000

# Parar processos que estejam usando as portas
kill -9 <PID>
```

### Problema: Erro de permissão no Docker

```bash
# No macOS/Linux, pode ser necessário
sudo docker-compose up --build
```

### Problema: Erro de conexão entre frontend e backend

Verifique se:
1. O backend está rodando na porta 8080
2. O frontend está configurado para acessar `http://localhost:8080/api`
3. Não há firewall bloqueando as conexões

### Problema: Erro de dependências

```bash
# Limpar cache do Maven
cd event-management-app/backend
mvn clean

# Limpar cache do npm
cd event-management-app/frontend
rm -rf node_modules package-lock.json
npm install
```

## 📝 Verificação de Funcionamento

### 1. Testar o Backend

```bash
# Verificar se a API está respondendo
curl http://localhost:8080/api/events
```

Resposta esperada: `[]` (array vazio se não houver eventos)

### 2. Testar as Melhorias de Clean Code

#### Backend - DTOs e Constructor Injection
```bash
# Testar criação de evento com DTOs
curl -X POST http://localhost:8080/api/events \
  -H "Content-Type: application/json" \
  -d '{"title":"Evento Teste","startDate":"2024-01-15T10:00:00","endDate":"2024-01-15T12:00:00","price":0.0,"status":"STARTED"}'

# Verificar resposta com EventResponse DTO
curl http://localhost:8080/api/events/1
```

#### Frontend - Custom Hooks
- ✅ **useEvent Hook**: Gerencia loading, error e operações CRUD
- ✅ **Error Handling**: Centralizado no custom hook
- ✅ **Component Separation**: EventForm mais limpo e focado

### 3. Testar o Frontend

1. Abra http://localhost:3000 no navegador
2. Você deve ver a interface do Event Management System
3. Teste criar um novo evento com preço 0 (funcionalidade corrigida)
4. Teste editar e deletar eventos
5. Verifique que não há warnings de ESLint (Clean Code aplicado)

### 4. Testar o Banco de Dados

1. Acesse http://localhost:8080/h2-console
2. Use as configurações:
   - **JDBC URL**: `jdbc:h2:mem:eventdb`
   - **Username**: `sa`
   - **Password**: `password`
3. Verifique que os eventos criados estão sendo persistidos corretamente

## 🔄 Comandos Git Úteis

### Atualizar o Projeto

```bash
# Verificar status
git status

# Verificar branch atual
git branch

# Atualizar com as últimas mudanças
git pull origin main

# Ver histórico de commits
git log --oneline
```

### Criar Nova Branch para Desenvolvimento

```bash
# Criar e mudar para nova branch
git checkout -b feature/nova-funcionalidade

# Fazer alterações e commitar
git add .
git commit -m "Adiciona nova funcionalidade"

# Enviar para o repositório remoto
git push origin feature/nova-funcionalidade
```

## 📊 Monitoramento

### Verificar Logs

```bash
# Logs do backend
docker-compose logs backend

# Logs do frontend
docker-compose logs frontend

# Logs em tempo real
docker-compose logs -f
```

### Verificar Recursos

```bash
# Uso de CPU e memória
docker stats

# Espaço em disco
docker system df
```

## ✅ Checklist de Verificação

- [ ] Repositório clonado com sucesso
- [ ] Docker instalado e funcionando
- [ ] `docker-compose up --build` executado sem erros
- [ ] Frontend acessível em http://localhost:3000
- [ ] Backend acessível em http://localhost:8080/api/events
- [ ] Banco H2 acessível em http://localhost:8080/h2-console
- [ ] Interface do usuário carregando corretamente
- [ ] Funcionalidade de criar evento funcionando
- [ ] Funcionalidade de listar eventos funcionando
- [ ] **Clean Code**: DTOs implementados no backend
- [ ] **Clean Code**: Constructor injection funcionando
- [ ] **Clean Code**: Custom hooks funcionando no frontend
- [ ] **Clean Code**: Tratamento de erros centralizado
- [ ] **Clean Code**: Preço 0 permitido (bug corrigido)
- [ ] **Clean Code**: Sem warnings de ESLint

## 🆘 Suporte

Se encontrar problemas:

1. Verifique se todos os pré-requisitos estão instalados
2. Execute `docker-compose down` e depois `docker-compose up --build`
3. Verifique os logs com `docker-compose logs`
4. Consulte a documentação no `README.md`
5. Abra uma issue no repositório do GitHub

### Problemas Específicos de Clean Code

#### Backend
- **Erro de compilação**: Verifique se os DTOs estão no pacote correto
- **Erro de injeção**: Verifique se está usando constructor injection
- **Erro de validação**: Verifique se o `GlobalExceptionHandler` está configurado

#### Frontend
- **Erro de hook**: Verifique se o `useEvent` está importado corretamente
- **Warning de ESLint**: Execute `npm run lint` para verificar
- **Erro de API**: Verifique se o custom hook está tratando erros

---

**Nota**: Este projeto usa H2 Database em memória para desenvolvimento. Para produção, considere usar PostgreSQL ou MySQL.

## 🧹 Benefícios do Clean Code Implementado

### Para Desenvolvedores
- ✅ **Código mais legível** e fácil de entender
- ✅ **Manutenibilidade melhorada** com responsabilidades separadas
- ✅ **Testabilidade aumentada** com dependency injection
- ✅ **Reutilização de código** com custom hooks

### Para o Projeto
- ✅ **Escalabilidade** com arquitetura bem definida
- ✅ **Robustez** com tratamento centralizado de erros
- ✅ **Consistência** com padrões estabelecidos
- ✅ **Performance** com componentes otimizados 
