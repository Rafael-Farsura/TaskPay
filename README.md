
# 🧑‍💻 TaskPay [--building--]

**Trabalhe com confiança. Pague com segurança.**

---

## 🔍 O que é o TaskPay?

O **TaskPay** é uma plataforma **descentralizada** que conecta **freelancers** e **contratantes**, permitindo que pagamentos sejam realizados automaticamente através de **smart contracts**.
Cada etapa (milestone) de um projeto é liberada somente após aprovação, garantindo **transparência**, **segurança** e **previsibilidade** para ambas as partes — **sem intermediários** e **sem taxas abusivas**.

---

## 🚀 Tecnologias

# Back-end
- Node.js
- NestJS
- REST Client / Postman

# Database
- TypeORM
- PostgreSQL

# Auth
- OAuth2
- JWT (JSON Web Token)

# Messageria
- RabbitMQ

# Web3 / Blockchain
- Ethers.js
- Solidity

# Front-End
- NextJS
- shadcn/ui

---

## 📦 Instalação

```bash
git clone https://github.com/seu-usuario/TaskPay.git
cd TaskPay
npm install
```

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=porta do database
NODE_ENV=ambiente de produçao

DB_TYPE=tipo
DB_HOST=host
DB_PORT=port
DB_USERNAME=usuario
DB_PASSWORD=senha
DB_DATABASE=task-pay
DB_SYNCHRONIZE=false

JWT_SECRET=seu token jwt
JWT_TOKEN_AUDIENCE=link audience jwt
JWT_TOKEN_ISSUER=link issuer jwt
JWT_TTL=tempo de expiraçao do token JWT
```

Execute as migrações e inicie o servidor:

```bash
npm run typeorm migration:run
npm run start:dev
```

---

## 🔐 Autenticação

A autenticação é feita via JWT. Para obter o token, use a rota de login:

```
POST /auth/login
```

Body:

```json
{
  "email": "seu@email.com",
  "password": "suasenha"
}
```

Use o token retornado nas demais requisições como:

```
Authorization: Bearer <token>
```

---

## 📚 Endpoints

| Método | Rota                            | Descrição                         | Autenticado? |
|--------|----------------------------------|-----------------------------------|--------------|
| POST   | `/auth/login`                   | Login do usuário                  | ❌           |
| GET    | `/users/find`                   | Listar todos os usuários          | ✅           |
| GET    | `/users/find/id/:id`            | Buscar usuário por ID             | ✅           |
| GET    | `/users/find/email/:email`      | Buscar usuário por email          | ✅           |
| POST   | `/users/create`                 | Criar um novo usuário             | ✅           |
| PATCH  | `/users/update/:id`             | Atualizar dados de um usuário     | ✅           |
| DELETE | `/users/delete/:id`             | Deletar um usuário                | ✅           |

---

## 🛠 Testes com REST Client

Você pode usar a extensão [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) no VS Code.

Crie um arquivo `client.rest` com este conteúdo:

```http
@url = http://localhost:3001
@authToken = {{authenticate.response.body.access_token}}

### LOGIN
# @name authenticate
POST {{url}}/auth/login
Content-Type: application/json

{
  "email": "email@example.com",
  "password": "senha123"
}

### LISTAR TODOS OS USUÁRIOS
GET {{url}}/users/find
Authorization: Bearer {{authToken}}
Accept: application/json

### BUSCAR USUÁRIO POR ID
GET {{url}}/users/find/id/<USER_ID_HERE>
Authorization: Bearer {{authToken}}
Accept: application/json

### BUSCAR USUÁRIO POR EMAIL
GET {{url}}/users/find/email/<USER_EMAIL_HERE>
Authorization: Bearer {{authToken}}
Accept: application/json

### CRIAR NOVO USUÁRIO
POST {{url}}/users/create
Authorization: Bearer {{authToken}}
Content-Type: application/json
Accept: application/json

{
  "email": "novo@email.com",
  "password": "senha123",
  "name": "Novo Usuário"
}

### ATUALIZAR USUÁRIO
PATCH {{url}}/users/update/<USER_ID_HERE>
Authorization: Bearer {{authToken}}
Content-Type: application/json

{
  "email": "atualizado@email.com",
  "password": "novaSenha",
  "name": "Nome Atualizado"
}

### DELETAR USUÁRIO
DELETE {{url}}/users/delete/<USER_ID_HERE>
Authorization: Bearer {{authToken}}
```

---

## 📄 Licença

Este projeto está sob a licença MIT.
