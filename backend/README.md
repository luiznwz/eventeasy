# Backend

Este é o projeto backend desenvolvido com [NestJS](https://nestjs.com/), focado em escalabilidade, segurança e boas práticas. A aplicação integra funcionalidades essenciais para o gerenciamento de dados e autenticação de usuários, além de oferecer uma documentação interativa via Swagger.

Documentação da API  
A documentação interativa da API está disponível via Swagger:

- Localmente: http://localhost/api
- Hospedado: https://evento-facil.onrender.com/api

## Funcionalidades

- **API RESTful:** Estrutura modular para construção e manutenção de APIs.
- **Autenticação e Autorização:** Implementada com JWT e Passport para garantir a segurança.
- **Validação e Transformação de Dados:** Utiliza [class-validator](https://github.com/typestack/class-validator) e [class-transformer](https://github.com/typestack/class-transformer) para assegurar a integridade dos dados.
- **Documentação Interativa:** Rotas documentadas com [Swagger](https://swagger.io/).  
  Para acessar a documentação:
  - Localmente: `http://localhost/api`
  - Hospedado: [https://evento-facil.onrender.com/api](https://evento-facil.onrender.com/api)
- **Integração com Banco de Dados:** Configurado para utilizar PostgreSQL com [TypeORM](https://typeorm.io/).
- **Testes Automatizados:** Estrutura preparada para testes unitários e de integração com Jest.
- **Variáveis de Ambiente:** Configurações disponíveis em um arquivo `env.example`.
- **Docker:** Ambiente Docker já configurado para execução local, incluindo serviços para o banco de dados e a interface Adminer.

## Execução Local

### Com Docker

O projeto já vem com uma configuração Docker completa para facilitar a execução local. Basta:

1. Copiar o arquivo `env.example` para `.env` e preencher as variáveis necessárias.
2. Executar o comando:

   ```bash
   docker-compose up

O backend será iniciado na porta definida na variável de ambiente `PORT` (por padrão, acessível via http://localhost:<PORT>).

Sem Docker  
Para executar localmente sem Docker:

Instale as dependências:  
`npm install`

Inicie o servidor em modo de desenvolvimento:  
`npm run start:dev`

Configuração das Variáveis de Ambiente  
Certifique-se de configurar as seguintes variáveis no arquivo `.env`:

- DB_NAME
- DB_USER
- DB_PASSWORD
- DB_PORT
- ADMINER_PORT
- NODE_ENV
- PORT
- JWT_SECRET

## Banco de dados

# Resumo das Tabelas e Relacionamentos

## Tabela: `users`

- **Relacionamentos:**
  - **`events`**: A coluna `user_id` em `events` referencia `users.id` (on delete: CASCADE).
  - **`guests`**: A coluna `user_id` em `guests` referencia `users.id` (on delete: SET NULL).

## Tabela: `events`
- **Relacionamentos:**
  - **`users`**: Possui a coluna `user_id` que referencia `users.id`.
  - **`guests`**: A coluna `event_id` em `guests` referencia `events.id` (on delete: CASCADE).
  - **`wish_list`**: A coluna `event_id` em `wish_list` referencia `events.id` (on delete: CASCADE).

## Tabela: `guests`
- **Relacionamentos:**
  - **`events`**: A coluna `event_id` referencia `events.id` (on delete: CASCADE).
  - **`users`**: A coluna `user_id` referencia `users.id` (on delete: SET NULL).

## Tabela: `wish_list`
- **Relacionamentos:**
  - **`events`**: A coluna `event_id` referencia `events.id` (on delete: CASCADE).
  - **`catalogs`**: A coluna `catalog_id` referencia `catalogs.id` (on delete: CASCADE).
  - **`event_wish_list`**: Referenciada pela coluna `wish_list_id` na tabela `event_wish_list` (on delete: CASCADE).

## Tabela: `catalogs`
- **Relacionamentos:**
  - **`wish_list`**: A coluna `catalog_id` em `wish_list` referencia `catalogs.id` (on delete: CASCADE).

## Tabela: `event_wish_list`
- **Relacionamentos:**
  - **`wish_list`**: A coluna `wish_list_id` referencia `wish_list.id` (on delete: CASCADE).

![image](https://github.com/user-attachments/assets/079ff9d6-601d-441d-abfe-f8521ef862c2)
