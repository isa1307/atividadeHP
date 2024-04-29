# API de Gerenciamento de Usuários e Bruxos🧙‍♀️🧹

### Configuração do Ambiente

Antes de começar, certifique-se de ter o Node.js e o PostgreSQL instalados em sua máquina.

### Configuração do Projeto

1. **Clone o Repositório:**
   ``
https://github.com/isa1307/atividadeHP.git
   ``

2. **Instale as dependencias:**
   ```
   npm install
   ```
### Inicializando o Servidor

Para iniciar o servidor Express, execute o seguinte comando:
```
npm run dev
```

O servidor será iniciado na porta 5000.

## Rotas bruxos🧙‍♂️

- GET /bruxos: Retorna todos os bruxos cadastrados.
- GET /bruxos/:id: Retorna um bruxo específico com base no ID fornecido.
- POST /bruxos: Adiciona um novo bruxo.
- PUT /bruxos/:id: Atualiza as informações de um bruxo existente.
- DELETE /bruxos/:id: Exclui um bruxo com base no ID fornecido.
- GET /bruxos/nome/:nome Retorna o bruxo com o nome pesquisado.

## Rotas varinhas🔮
- **GET /varinhas:** Retorna todas as varinhas cadastradas.
- **GET /varinhas/:id:** Retorna uma varinha específica com base no ID fornecido.
- **POST /varinhas:** Adiciona uma nova varinha.
- **PUT /varinhas/:id:** Atualiza as informações de um varinha existente.
- **DELETE /varinhas/:id:** Exclui uma varinha com base no ID fornecido.
- **GET /varinhas/material/:material** Retorna o material pesquisado que a varinha é feita.


## Desafio de Desenvolvimento Backend - Mundo de Harry Potter

Como parte do desafio, você também pode explorar o mundo mágico de Harry Potter!

- **Propriedades do Bruxo:**
  - Nome
  - Idade
  - Casa em Hogwarts
  - Habilidade Especial
  - Status de Sangue (puro, mestiço, trouxa)
  - Patrono (opcional)

- **Propriedades da Varinha:** 

  - Material
  - Comprimento
  - Núcleo
  - Data de Fabricação

- **Rota Extra:**
  - Implementação de uma rota específica para bruxos, permitindo pesquisa pelo nome do bruxo.


Se precisar de ajuda adicional ou tiver alguma dúvida, não hesite em entrar em contato! 🚀🔮✨
