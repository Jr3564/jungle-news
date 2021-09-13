[🇺🇸 Read in English](./README.en.md)(under review..)

---

###  Sumário

- [API](#API)
    - [Rotas disponíveis](#rotas-disponiveis)
        - [/login](#/login)
        - [/sign-up](#/sign-up)
        - [/authors](#/authors)
        - [/categories](#/categories)
        - [/articles](#/articles)
        - [/admin/categories](#/admin/categories)
        - [/admin/authors](#/admin/authors)
        - [/admin/articles](#/admin/articles)
        - [/admin/users](#/admin/users)
  - [Camadas](#Camadas)
    - [Routes](#Routes)
    - [Controller](#Controller)
    - [Middlewares](#Middlewares)
      - [UserAuthentication](#UserAuthentication)
          - [verifyAccessLevel](#verifyAccessLevel)
          - [ensureAuthentication](#ensureAuthentication)
          - [ensureAdminLevel](#ensureAdminLevel)
       - [ErrorHandler](#ErrorHandler)
    - [Service](#Service)
      - [Encrypter](#Encrypter)
      - [TokenHandler](#TokenHandler)
      - [ErrorInstances](#ErrorInstances)
    - [Model](#Model)
      - [CRUDModel](#CRUDModel)
      - [database](#database)
- [Containers](#Containers)
- [Banco de dados](#Banco-de-dados)
    - [Estrutura](#Estrutura)
- [Testando localmente a aplicação](#Testando-localmentea-a-aplicação)
- [Libraries](#Libraries)

---

<div id='API'/>

## API

  A api foi construída utilizando a arquitetura MVC, utilizando as camadas model, controller, service e a camada de middlewares.

  <div id='rotas-disponiveis'/>

  - ### Rotas disponiveis

    Para testes utilizando postman, disponibilizei na pasta utils a [postman_collection.json](./utils/) com os testes feitos nas rotas.

    <div id='/login'/>

    - #### /login
      - Método: Post
      - Exemplo:
        - Post localhost:8080/api/login
          ```json
          {
              "login": "admin@admin",
              "password": "admin"
          }
          ```
      ---

    <div id='/sign-up'/>

    - #### /sign-up
      - Método: Post
      - Exemplo:
        - Post localhost:8080/api/sign-up
          ```json
          {
              "name": "person",
              "login": "person@person",
              "password" : "personpassword"
          }
          ```
      ---

    <div id='/authors'/>

    - #### /authors
      - Método: Get
      - Exemplo:
        - Get localhost:8080/api/authors
      ---

    <div id='/categories'/>

    - #### /categories
      - Método: Get
      - Exemplo:
        - Get localhost:8080/api/categories
      ---

    <div id='/articles'/>

    - #### /articles
      - Método: Get || Get:id || Get?category=categoryId&author=authorId
      - Exemplos:
        - Get localhost:8080/api/articles
        - Get:id localhost:8080/api/articles/1
        - Get?categoryId localhost:8080/api/articles?categoryId=1
        - Get?authorId localhost:8080/api/articles?authorId=1
        - Get?author localhost:8080/api/articles?author=Rodolfo
        - Get?category localhost:8080/api/articles?category=software
      ---

    <div id='/admin/categories'/>

    - #### /admin/categories
      - Método: Get || Post || Put:id || Delete:id
      - Exemplos:
        - Get localhost:8080/api/admin/categories
        - Delete:id localhost:8080/api/admin/categories/1
        - Post  localhost:8080/api/admin/categories
          ```json
          {
              "name": "newCategory"
          }
          ```
        - Put localhost:8080/api/admin/categories/1
          ```json
          {
              "name": "new name"
          }
          ```
      ---

    <div id='/admin/authors'/>

    - #### /admin/authors
      - Método: Get || Post || Put:id || Delete:id
      - Exemplos:
        - Get localhost:8080/api/admin/authors
        - Delete:id localhost:8080/api/admin/authors/1
        - Post localhost:8080/api/admin/authors
          ```json
          {
              "name": "person",
              "imagePath": "./dist/2"
          }
          ```
        - Put localhost:8080/api/admin/authors/1
          ```json
          {
              "name": "new name"
          }
          ```
      ---

    <div id='/admin/articles'/>

    - #### /admin/articles
      - Método: Get || Post || Put:id || Delete:id
      - Exemplos:
        - Get localhost:8080/api/admin/articles
        - Get?author localhost:8080/api/admin/articles?author=Rodolfo
        - Get?category localhost:8080/api/admin/articles?category=software
        - Get?categoryId localhost:8080/api/admin/articles?categoryId=1
        - Get?authorId localhost:8080/api/admin/articles?authorId=1
        - Delete:id  localhost:8080/api/admin/articles/1
        - Post  localhost:8080/api/admin/articles
          ```json
          {
              "title": "title",
              "summary": "this is certainly a summary",
              "firstParagraph": "Paragraph 1",
              "body": "body",
              "categoryId": 1,
              "authorId": 1
          }
          ```
        - Put localhost:8080/api/admin/articles/1
          ```json
          {
              "title": "new title"
          }
          ```
      ---

    <div id='/admin/users'/>

    - #### /admin/users
      - Método: Get || Post || Put:id || Delete:id
      - Exemplos:
        - Get localhost:8080/api/admin/users
        - Delete:id localhost:8080/api/admin/users/2
        - Post localhost:8080/api/admin/users
          ```json
          {
              "name": "person",
              "login": "person@person.com",
              "password": "personpassword",
              "accessLevelId": 2
          }
          ```
        - Put localhost:8080/api/admin/users/1
          ```json
          {
              "name": "new name",
              "accessLevelId": 1
          }
          ```
      ---

  <div id='Camadas'/>

  - ### Camadas

    <div id='Routes'/>

    - #### Routes

      Contém as abstrações de cada rota. Aplica as camadas adequadas de [middlewares](#Middlewares) e de [controller](#Controller). 

    ---
    
    
    
    <div id='Controller'/>
    
    - #### Controller
    
      Quando a API recebe uma requisição, é chamado o controller adequado para tratá-la conforme configurado na camada [routes](#Routes).
    
      Nela também tem a abstração de cada rota e ao chegar uma requisição, ela chama os métodos adequados do [service](#Service), que irão garantir as regras de negócio e retornarão o que foi solicitado, ou levantarão o erro adequado que será tratado pela próxima camada. 
      
      Por fim, o controller responde com status code adequado e o que foi solicitado. Caso contrário, é passado para próxima camada a [ErrorHandler](#ErrorHandler).
    ---
    
    <div id='Middlewares'/>
    
    - #### Middlewares
    
      <div id='UserAuthentication'/>
    
      - ##### UserAuthentication
      
        Essa camada oferece os middlewares para controle de acesso do usuário.
    
        <div id='verifyAccessLevel'/>
        
        - ###### verifyAccessLevel
    
          verifica o token salvando na request o nível de acesso e o id do usuário, para o caso de um usuário válido, caso contrário dá continuidade do processo passando o nível de acesso -1. . 
    
        <div id='ensureAuthentication'/>
    
        - ###### ensureAuthentication
    
          Garante que só irá passar para a próxima camada se for um usuário válido.
    
        <div id='ensureAdminLevel'/>
    
        - ###### ensureAdminLevel

          Garante que só irá para a próxima camada um usuário com nível de acesso de 'admin'.
      ---
    
      <div id='ErrorHandler'/>
    
      - ##### ErrorHandler
      
        Funciona em conjunto com a biblioteca [express-rescue](https://www.npmjs.com/package/express-rescue), que garante que os erros asynchronos sejam corretamente direcionados para esta camada. E o service [ErrorInstances](#ErrorInstances), o qual contém todas as classes de erro.
        
        Quando um erro é levantado, é direcionado para esta camada. É esperado que a classe levantada  contenha os atributos <u>statusCode</u> e <u>message</u>, para que o erro seja respondido de forma adequada. Caso não contenha algum desses atributos, será respondida com status code 500 e a mensagem "Internal Server Error".
      ---

  <div id='Service'/>

  - #### Service

    Camada responsável por tratar as regras de negócios, como encriptação, geração de token, verificações e validações. Também contém as abstrações utilizadas para conexão com o [model](#Model). A ArticlesService, AuthorsService, CategoriesService, e UsersService . 

    <div id='Encrypter'/>

    - ##### Encrypter

      Utiliza a biblioteca [bcryptjs](https://www.npmjs.com/package/bcryptjs) para transformar uma string em uma hash ou comprar uma string não hasheada com alguma hash.
    ---
    
    <div id='TokenHandler'/>

    - ##### TokenHandler

      Gera, verifica e decodifica um token passado. Utiliza a biblioteca [jsonwebtoken](https://jwt.io/).
    ---
    
    <div id='ErrorInstances'/>

    - ##### ErrorInstances

      Retorna um objeto com instâncias de erro. As quais, quando levantadas, são direcionadas para o middleware [errorHandler](#ErrorHandler).
      
      Cada instância precisa ter os atributos <u>statusCode</u> e <u>message</u>, utilizados para o tratamento adequado do erro.
    ---

    <div id='ArticlesService'/>

    - ##### AuthenticationService

      É a classe que lida com as regras de negócio de acesso e autenticação.
    ---

    <div id='statusCodes'/>

    - ##### statusCodes

      Ela abstrai todos os status codes para respostas utilizados na API.
    ---

  <div id='Model'/>

  - #### Model

    Contém as lógicas de acesso ao banco de dados e as implementações do CRUDModel utilizados para uma conexão adequada com o banco de dados.

    <div id='CRUDModel'/>

    - ##### CRUDModel
    
      Essa é uma classe abstrata teoricamente, com os comportamentos padrões de CRUD. Da qual as implementações herdam e especializam seus comportamentos.
      
       As classes ArticlesModel, AuthorsModel, CategoriesModel, e AccessLevelsModel são extensões que especializam seus comportamentos.
    ---

    <div id='database'/>

    - ##### database
    
      Nessa pasta fica a pasta do <u>knex</u> com suas configurações, migrations e seeds. E a pasta <u>objectRelationalMapper</u> que possui as configurações do [objection](https://vincit.github.io/objection.js/) ORM  e seus models, dos quais são geradas as querys.
    ---

<div id='Containers'/>

## Containers

  Foi criado um dockerfile para montar um container com a api e instalar as dependências. E configurado o arquivo docker-compose para montar, além do banco de dados, a api.

  Após o  serviço do banco de dados for iniciado, é feito o teste com healthcheck para garantir que está  no ar, sendo possível adicionar a condição à api. Garantindo que ela só seja iniciada quando o banco de dados estiver rodando como o esperado. Isso foi necessário pois para garantir a praticidade nos testes, foram criadas migrations e seeds. Eles só pode ser executados quando o banco de dados já tiver subido e em uma ordem conforme as relações das tabelas.

---

<div id='Banco-de-dados'/>

## Banco de dados

  Foi utilizado um container, com o Postgres que já veio configurado no projeto.  Nessas configurações só foi necessário adicionar a propriedade healthcheck, para ter controle da hora que o banco terminava de subir e garantir que as migarions e os seeder sejam executados no momento certo.

  <div id='Estrutura'/>

  - ### Estrutura

    Foi criada a "articles" que possui todos os dados dos artigos, o id da categoria e o id do author. A ideia inicial era criar uma relação de 1:N categorias, mas como o enunciado solicitou uma categoria para cada arquivo foi respeitado.

    E foi criado a tabela "users" que possui os dados do usuário e o id do nível de acesso, que é uma foreign key da tabela access_levels, a qual contém os níveis de acesso.

    ![](/home/rodolfo/Documentos/Projetos/node-challenge-001/utils/readme/retationalBD.png)
---

<div id='Testando-localmentea-a-aplicação'/>

## Testando localmente a aplicação

  1. Clone o repositório
     - ssh:
       ```bash
       git clone git@github.com:Jr3564/jungle-news.git
       ```
     - http:

       ```bash
       git clone https://github.com/Jr3564/jungle-news.git
       ```
  2.  Navegue até a pasta
     ```bash
     cd ./jungle-news/
     ```
  3. E subir os containers
     ```bash
     docker-compose up
     ```
     - Ao fazer isso, será montado o container do banco de dados e da API. Será execultado as migrations e seeders.
     - Para parar precione ctrl + c .
     - Se quiser que rode em segundo plano, acrescente -d ao comando.
  4. Pronto, a api já está rodando.   
  5.  Para desmontar as imagens.
     ```bash
     docker-compose down
     ```
  6. Se for utilizar o postman. Disponibilizei o arquivo [postman_collection](./utils/postman_collection.json) a coleção que utilizei para testar as rotas.
---

<div id='Libraries'/>

## Libraries

- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [express](expressjs.com)
- [jsonwebtoken](https://jwt.io/)
- [knex](https://knexjs.org/) + [objection](https://vincit.github.io/objection.js/) (ORM)
- [Docker Postgres Image](https://hub.docker.com/_/postgres)  (SGBD)
- [express-rescue](https://www.npmjs.com/package/express-rescue)
