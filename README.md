# 🚀 Opti-Production

Sistema de Planejamento e Controle de Produção (PCP) desenvolvido como Desafio Técnico.
O objetivo é gerenciar produtos e matérias-primas, calculando automaticamente a melhor combinação de produção baseada no estoque disponível para maximizar o lucro.

## 🛠 Tecnologias Utilizadas

### Back-end
- **Java 21**
- **Quarkus Framework** (Supersonic Subatomic Java)
- **Hibernate ORM / Panache**
- **PostgreSQL** (via Docker)
- **JUnit 5** (Testes)

### Front-end
- **React.js** (Vite)
- **Tailwind CSS** (Estilização)
- **React Router** (Navegação)
- **Lucide React** (Ícones)
- **Axios** (Integração API)

## ⚙️ Funcionalidades

- ✅ **CRUD de Produtos:** Cadastro, listagem, edição e exclusão.
- ✅ **Composição de Produtos:** Definição de "receitas" (ex: 1 Mesa = 4 Pernas + 1 Tampo).
- ✅ **CRUD de Matérias-Primas:** Controle de estoque.
- ✅ **Algoritmo de Otimização:** Cálculo automático de produção baseado no gargalo de estoque e valor de venda.
- ✅ **Dashboard:** Visualização clara do plano de produção sugerido.

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Java 21+
- Node.js 18+
- Docker (para o banco de dados)

### 1. Subir o Banco de Dados
Na raiz do projeto:
```bash
docker-compose up -d
