[🇧🇷Ler em Português-BR](./utils/README-EN.m)

---

- [API](#api)
  - [Routes](#routes)
    - [/login](#login)
    - [/sign-up](#sign-up)
    - [/authors](#authors)
    - [/categories](#categories)
    - [/articles](#articles)
    - [/admin/categories](#admincategories)
    - [/admin/authors](#adminauthors)
    - [/admin/articles](#adminarticles)
    - [/admin/users](#adminusers)
  - [Controller](#controller)
  - [Middlewares](#middlewares)
    - [UserAuthentication](#userauthentication)
      - [verifyAccessLevel](#verifyaccesslevel)
      - [ensureAuthentication](#ensureauthentication)
      - [ensureAdminLevel](#ensureadminlevel)
    - [ErrorHandler](#errorhandler)
  - [Service](#service)
      - [Encrypter](#encrypter)
      - [TokenHandler](#tokenhandler)
      - [ErrorInstances](#errorinstances)
  - [Model](#model)
      - [CRUDModel](#crudmodel)
      - [database](#database)
- [Containers](#containers)
- [Data Base](#data-base)
  - [Structure](#structure)
- [Testing locally](#testing-locally)
- [Libraries](#libraries)

---

<div id='api'/>

## API
The API was built using the MVC architecture. Its main layers are [Controller](#Controller), [Middlewares](#Middlewares), [Service](#Service) and [Model](#Model).

<div id='routes'/>

### Routes

For testing using [postman](https://www.postman.com/), available in the 'utils' folder the file with the tests performed on each route.  [postman_collection.json](./utils/).

<div id='/login'/>

#### /login

Accepted methods: Post

Example:

- Post localhost:8080/api/login

```json
{
    "login": "admin@admin",
    "password": "admin"
}
```

<div id='/sign-up'/>

---

#### /sign-up

Accepted methods: Post

Example:

- Post localhost:8080/api/sign-up

```json
{
    "name": "person",
    "login": "person@person",
    "password" : "personpassword"
}
```

<div id='/authors'/>

---

#### /authors

Accepted methods: Get

Example:

- Get localhost:8080/api/authors

<div id='/categories'/>

---

#### /categories

Accepted methods: Get

Example: 

- Get localhost:8080/api/categories

<div id='/articles'/>

---

#### /articles

Accepted methods: Get || Get:id || Get?category=categoryId&author=authorId

Examples:

- Get localhost:8080/api/articles
- Get:id localhost:8080/api/articles/1
- Get?categoryId localhost:8080/api/articles?category=1
- Get?author localhost:8080/api/articles?author=1

<div id='/admin/categories'/>

---

#### /admin/categories

Métodos Get || Post || Put:id || Delete:id

Examples:

-  Get localhost:8080/api/admin/categories
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

<div id='/admin/authors'/>

---

#### /admin/authors

Accepted methods: Get || Post || Put:id || Delete:id

Examples:

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

<div id='/admin/articles'/>

---

#### /admin/articles

Accepted methods: Get || Post || Get?category=categoryId&author=authorId || Put:id || Delete:id

Examples:

- Get  localhost:8080/api/admin/articles
- Get?categoryId localhost:8080/api/admin/articles?category=1
- Get?author localhost:8080/api/admin/articles?author=1
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

<div id='/admin/users'/>

---

#### /admin/users

Accepted methods: Get || Post || Put:id || Delete:id

Examples:

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

<div id='Controller'/>

---

### Controller

O controller está dividido entre as camadas de Admin, Articles, Authors, Categories e Users. Que recebem as requisições e chamam a camada service e o o método adequado para tratá-la. Após a requisição ser tratada pela camada de service, é devolvida para o controler e retornada a solicitação com o conteúdo solicitado e o status code adequado. No caso de erro, é passado para próxima camada a <u>[ErrorHandler](#ErrorHandler)</u>.

<div id='Middlewares'/>

---

### Middlewares

<div id='UserAuthentication'/>

#### UserAuthentication

Essa camada oferece os middlewares para controle de acesso do usuário. São 3 métodos:

<div id='verifyAccessLevel'/>

##### verifyAccessLevel

verifica o token salvando na request o nível de acesso e o id do usuário, para o caso de um usuário válido, caso contrário dá continuidade do processo passando o nível de acesso -1. . 

<div id='ensureAuthentication'/>

##### ensureAuthentication

Garante que só irá passar para a próxima camada se for um usuário válido.

<div id='ensureAdminLevel'/>

##### ensureAdminLevel

Garante que só irá para a próxima camada um usuário com nível de acesso de 'admin'.

<div id='ErrorHandler'/>

----

#### ErrorHandler

Funciona em conjunto com a bibliotéca [express-rescue](https://www.npmjs.com/package/express-rescue), garantindo que os erros asynchronos sejam direcionados para a camada de erros.  E quando o erro chega ao ErrorHandler ele responde com o status code adequado e a mensagem contida na classe de erro levantada. 



<div id='Service'/>

---

### Service

Para cada controller existe um service, onde são tratadas as regras de negócio, como verificar ser a senha é válida, encriptar a senha ao cadastrar, verificar se todos os campos necessários estão presentes, etc.

Também onde fica o Encrypter e o TokenHandler.

<div id='Encrypter'/>

##### Encrypter

Utiliza a biblioteca [bcryptjs](https://www.npmjs.com/package/bcryptjs) para transformar uma string em uma hash ou comprar uma string não hasheada com alguma hash.

<div id='TokenHandler'/>

##### TokenHandler

Gera, verifica e decodifica um token passado. Utiliza a biblioteca [jsonwebtoken](https://jwt.io/).

<div id='ErrorInstances'/>

##### ErrorInstances

Retorna um objeto com instâncias de erro. Essas instâncias são extensões da classe de Error.



<div id='Model'/>

---

### Model

Nela ficam todos os models, aonde ficam as lógicas das querys para o banco de dados. Para cada service existe um model com os métodos adequados para acessar o banco.

<div id='CRUDModel'/>

##### CRUDModel

Essa teoricamente é uma classe abstrata com os comportamentos padrões de CRUD. Da qual as implementações herdam e especializam seus comportamentos.

<div id='database'/>

##### database

Nessa pasta fica a pasta do <u>knex</u> com suas configurações, migrations e seeds. E a pasta <u>objectRelationalMapper</u> que possui as configurações do [objection](https://vincit.github.io/objection.js/) ORM  e seus models, dos quais são geradas as querys.

<div id='Containers'/>

---

## Containers

Foi criado um dockerfile para montar um container com a api e instalar as dependências. E configurado o arquivo docker-compose para montar, além do banco de dados, a api.

Após o  serviço do banco de dados for iniciado, é feito o teste com healthcheck para garantir que está  no ar, sendo possível adicionar a condição à api. Garantindo que ela só seja iniciada quando o banco de dados estiver rodando como o esperado. Isso foi necessário pois para garantir a praticidade nos testes, foram criadas migrations e seeds. Eles só pode ser executados quando o banco de dados já tiver subido e em uma ordem conforme as relações das tabelas.

<div id='data-base'/>

---

## Data Base

Foi utilizado um container, com o Postgres que já veio configurado no projeto.  Nessas configurações só foi necessário adicionar a propriedade healthcheck, para ter controle da hora que o banco terminava de subir e garantir que as migarions e os seeder sejam executados no momento certo.

<div id='structure'/>

### Structure

Foi criada a "articles" que possui todos os dados dos artigos, o id da categoria e o id do author. A ideia inicial era criar uma relação de 1:n categorias, mas como o enunciado solicitou uma categoria para cada arquivo foi respeitado.

E foi criado a tabela "users" que possui os dados do usuário e o id do nível de acesso, que é uma foreign key da tabela access_levels, a qual contém os níveis de acesso.

![](/home/rodolfo/Documentos/Projetos/node-challenge-001/utils/readme/retationalBD.png)


<div id='testing-locally'/>

---

## Testing locally

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

   - Para parar precione ctrl + c .

   - Se quiser que rode em segundo plano, acrescente -d ao comando.

4. Pronto, a api já está rodando.

5.  Para desmontar as imagens.

   ```bash
   docker-compose down
   ```

6. Se for utilizar o postman. Disponibilizei o arquivo [postman_collection](./utils/postman_collection.json) a coleção que utilizei para testar as rotas.

<div id='libraries'/>

---

## Libraries

- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [express](expressjs.com)
- [jsonwebtoken](https://jwt.io/)
- [knex](https://knexjs.org/) + [objection](https://vincit.github.io/objection.js/) (ORM)
- [Docker Postgres Image](https://hub.docker.com/_/postgres)  (SGBD)
-  [express-rescue](https://www.npmjs.com/package/express-rescue)