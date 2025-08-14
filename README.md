# Projeto CRUD de Usuários com Node.js, TypeScript e Clean Architecture

## 📌 Visão Geral
Este projeto foi **inteiramente criado utilizando o MCP (Model Context Protocol)** conectado ao **MongoDB** para análise da base de dados.  
Através do MCP, foi identificado que havia uma coleção `users` no banco de dados, e a partir dessa estrutura foi gerado automaticamente um CRUD completo, tipado e seguindo boas práticas.  

O **ChatGPT GPT-4.1** foi utilizado como agente de desenvolvimento, responsável por interpretar o schema do banco e gerar toda a base do código com **Node.js, TypeScript, Express e Clean Architecture**, além de aplicar **design patterns** e criar testes unitários.

---

## ⚙️ Configuração do MCP

Configuração utilizada para conectar ao MongoDB local e permitir que o agente MCP extraísse a estrutura da coleção `users`:

```json
{
  "servers": {
    "MongoDB": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "mongodb-mcp-server",
        "--connectionString",
        "mongodb://127.0.0.1:27017/minhaBase"
      ]
    }
  },
  "inputs": []
}
```

---

## 🛠 Tecnologias Utilizadas
- **Node.js** (v20+)
- **TypeScript**
- **Express**
- **Clean Architecture**
- **MongoDB**
- **Vitest/Jest** (testes unitários)
- **Zod** (validação de dados)
- **ESLint + Prettier** (padronização de código)

---

## 📝 Task Utilizada para Gerar o Projeto (versão curta)

**Título:** Criar primeiro recurso `User` (Node + TS + Express + Clean Architecture)  
**Contexto:** Vamos iniciar um projeto Node com TypeScript e Express, aplicando Clean Architecture e alguns design patterns. O agente MCP deve inspecionar o banco via MCP para entender a estrutura do recurso `User` e, a partir disso, gerar o CRUD.  
**Objetivo:** Disponibilizar CRUD completo de `User` (create/list/getById/update/delete) com tipagem 100%, testes unitários e projeto compilando sem erros.

### Requisitos
- **Stack:** Node 20+, TypeScript, Express, ESLint + Prettier, Vitest (ou Jest), ts-node/tsx.
- **Arquitetura:** camadas `domain` (entities/use-cases), `application` (DTOs/ports), `infrastructure` (db/repository), `interface` (http/controllers/routes), `config` (env/di).
- **Banco (via MCP):** usar MCP para consultar o schema/estrutura de `User` (campos, tipos e restrições).
- **Endpoints REST:**  
  - `POST /users` (criar)  
  - `GET /users` (listar paginado + filtros básicos)  
  - `GET /users/:id` (buscar por id)  
  - `PUT /users/:id` (editar)  
  - `DELETE /users/:id` (deletar lógico ou físico – documentar escolha)
- **Boas práticas:** validação com Zod/Yup/Valibot; erros tipados, middlewares de error handling e logging; DTOs explícitos.
- **Testes:** unitários para use-cases e controllers.
- **Qualidade:** TypeScript sem erros (strict), ESLint/Prettier sem pendências, build OK.

### Critérios de Aceite
- Projeto compila sem erros (`tsc --noEmit` limpo).  
- Lint/format OK.  
- Testes unitários rodando (≥80% nas camadas de domínio/use-cases).  
- Endpoints funcionam (criar, listar, buscar por id, editar, deletar).  
- Erros e retornos **tipados** (nada de `any` solto).  
- CRUD baseado **na estrutura real** do `User` obtida via MCP.

---

## 🚀 Como Executar
```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Rodar testes
npm run test

# Checar tipos
npm run type-check

# Lint
npm run lint
```

---

## 📂 Estrutura de Pastas
```
src/
  config/
  domain/
    entities/
    use-cases/
  application/
    dtos/
    ports/
  infrastructure/
    db/
    repositories/
  interface/
    http/
      controllers/
      routes/
      middlewares/
tests/
```
