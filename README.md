# 📚 Readify Plus

O **Readify Plus** é uma plataforma **mobile de incentivo à leitura**, desenvolvida com foco em **personalização, acessibilidade** e **engajamento**. A aplicação utiliza tecnologias modernas como **React Native**, **Node.js**, **TypeScript** e **PostgreSQL**, integrando também funcionalidades com **Inteligência Artificial (IA)** para oferecer uma experiência de leitura personalizada e inclusiva.

---

## 🚀 Ideia do Projeto

O Readify Plus surgiu para transformar a forma como as pessoas interagem com a leitura digital. Através de uma abordagem centrada no usuário, a plataforma oferece:

- Recomendação de livros com base no comportamento de leitura, avaliações e comentários.
- Verificação automática de progresso de leitura.

---

## 🎯 Objetivos

### 🎯 Objetivos da IA

A Inteligência Artificial no Readify Plus visa:

- **Recomendações Personalizadas:** Sugestões com base em preferências, interações e histórico do usuário.
- **Monitoramento de Progresso:** Verificação automática do progresso de leitura para adaptar novas recomendações.

### 🔍 Problemas Resolvidos com IA

- **Falta de Personalização:** A IA entrega sugestões realmente relevantes para cada usuário.
- **Acessibilidade:** Funcionalidades voltadas para usuários com deficiência visual.
- **Engajamento:** A experiência adaptativa mantém os leitores motivados a continuar.
- **Eficiência na Curadoria:** Automatização das sugestões e exibição de livros conforme a base de usuários e conteúdo cresce.

---

## 🧪 Tecnologias Utilizadas

### 📱 Mobile

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)

### 🖥️ Backend

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)

---

## 📌 Funcionalidades Principais

- 🔍 Recomendação de livros personalizada via IA
- ⏱️ Verificação automática de progresso
- 📝 Avaliação e comentários de livros
- 📚 Curadoria automatizada de conteúdos

---

## 🧠 Futuras Melhorias

- Sistema de gamificação para motivar leitura contínua
- Suporte a múltiplos idiomas
- Chat com IA para discutir livros
- Integração com bibliotecas públicas e acervos gratuitos
- Leitura sicronizada dos livros (acessibilidade)

---

## 🛠️ Como Executar o Projeto

### Requisitos

- Node.js
- npm
- Docker
- Expo CLI

### 🖥️ Backend

```bash
- git clone https://github.com/joaovictorsalotialves/api-readify-plus.git
- npm i
- cp .env.example .env
- docker-compose up
- npm run seed (GERAR DADOS DOS LIVROS NO BANCO DE DADOS)
- npm run start:dev
```

### 📱 Mobile

```
- git clone https://github.com/joaovictorsalotialves/readify-plus.git
- npm i
- npx expo prebuild
- npx expo start:android ou npx expo start:ios
```

OBS: Alterar a constante `urlApi` no arquivo `src/lib/axios/index.ts`. Utilize o comando `ipconfig` para obter o ip da sua máquina ou o local que estiver rodando a api
