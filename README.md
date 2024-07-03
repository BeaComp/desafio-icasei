# Teste FrontEnd 2024

## Instruções para Compilar, Testar e Rodar o Projeto

### Pré-requisitos
- Docker
- Node.js

### Passos para Rodar o Projeto


1. **Clone o Repositório**:
   ```sh
   git clone https://github.com/BeaComp/desafio-icasei.git
   cd my-project

   -- Instale as dependências:
   npm install

2. Navegue até o diretório `bff` e instale as dependências:
   ```sh
   cd backend
   npm install
   cd ..

3. Dentro do diretório `my_project` inicie o docker:
   ```sh
   docker-compose up --build

4. Para visualizar os micro fronts e a aplicação main esses são os caminhos:
   principal: http://localhost:8080/
   mf_drawer: http://localhost:8081/
   mf_videos: http://localhost:8082/

5. Para executar os testes unitários execute: (é necessário que o servidor esteja ativo para os tests)
   npm test


   
