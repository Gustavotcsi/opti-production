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

### 1. Clonar o Repositório 
git clone https://github.com/Gustavotcsi/opti-production.git
cd opti-production

### 2. Subir o Banco de Dados
Certifique-se de que o Docker está rodando e execute na raiz do projeto:
docker-compose up -d

### 3. Iniciar o Back End (API)
Ainda na raiz do projeto, execute:
./mvnw quarkus:dev

### 4. Iniciar o Front-end
Abra um novo terminal, entre na pasta do front-end e inicie o servidor:
cd frontend
npm install
npm run dev

O sistema estará acessível em: http://localhost:5173

## 🧪 Roteiro de Teste (Como validar a lógica)
Para ver o algoritmo de otimização em ação, siga estes passos no sistema:

## Acesse o menu Raw Materials e cadastre:

- **Madeira (Estoque: 10)

- **Parafuso (Estoque: 50)

- **Acesse o menu Products e crie um novo produto:

- **Nome: Mesa de Jantar

- **Preço: R$ 200,00

- **Na mesma tela de criação (ou editando depois), adicione a Receita:

- **Selecione Madeira e Quantidade 4 -> Clique em Add.

- **Selecione Parafuso e Quantidade 8 -> Clique em Add.

- **Salve o produto.

- **Vá para a Home (Dashboard).

##O sistema deve calcular que é possível produzir 2 Mesas (limitado pela Madeira, pois 2 mesas usam 8 madeiras, sobrando 2. Não há madeira suficiente para uma 3ª mesa).

Desenvolvido por Gustavo Távora.




