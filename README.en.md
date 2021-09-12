[🇧🇷 Ler em Português-BR](./README.md)

---

###  Summary

- [API](#API)
    - [Access routes](#access-routes)
        - [/login](#/login)
        - [/sign-up](#/sign-up)
        - [/authors](#/authors)
        - [/categories](#/categories)
        - [/articles](#/articles)
        - [/admin/categories](#/admin/categories)
        - [/admin/authors](#/admin/authors)
        - [/admin/articles](#/admin/articles)
        - [/admin/users](#/admin/users)
  - [Layers](#Layers)
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
- [Data Base](#data-base)
    - [structure](#structure)
- [Deploy](link do deploy)
- [Testing locally](#testing-locally)
- [Libraries](#Libraries)

---

<div id='API'/>

## API

The API was built using the MVC architecture. Its main layers are [Controller](#Controller), [Middlewares](#Middlewares), [Service](#Service) and [Model](#Model).

  <div id='access-routes'/>

  - ### Routes

    For testing using [postman](https://www.postman.com/), available in the 'utils' folder the file with the tests performed on each route.  [postman_collection.json](./utils/).

    <div id='/login'/>

    - #### /login
      - Accepted methods: Post
      - Example:
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
      - Accepted methods: Post
      - Example:
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
      - Accepted methods: Get
      - Example:
        - Get localhost:8080/api/authors
      ---

    <div id='/categories'/>

    - #### /categories
      - Accepted methods: Get
      - Example:
        - Get localhost:8080/api/categories
      ---

    <div id='/articles'/>

    - #### /articles
      - Accepted methods: Get || Get:id || Get?category=categoryId&author=authorId
      - Examples:
        - Get localhost:8080/api/articles
        - Get:id localhost:8080/api/articles/1
        - Get?categoryId localhost:8080/api/articles?categoryId=1
        - Get?authorId localhost:8080/api/articles?authorId=1
        - Get?author localhost:8080/api/articles?author=Rodolfo
        - Get?category localhost:8080/api/articles?category=software
      ---

    <div id='/admin/categories'/>

    - #### /admin/categories
      - Accepted methods: Get || Post || Put:id || Delete:id
      - Examples:
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
      - Accepted methods: Get || Post || Put:id || Delete:id
      - Examples:
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
      - Accepted methods: Get || Post || Put:id || Delete:id
      - Examples:
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
      - Accepted methods: Get || Post || Put:id || Delete:id
      - Examples:
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

  <div id='Layers'/>

  - ### Layers

    <div id='Routes'/>

    - #### Routes

      Contains the abstractions for each route. Implements the layers of [middlewares](#Middlewares) and [controller](#Controller). 

    ---
    
    
    
    <div id='Controller'/>
    
    - #### Controller
    
      When the API receives a request, the appropriate controller is called to handle it, as configured in the [routes](#Routes) layer.
    
      In it, there is also the abstraction of each route. When it receives a request, executes the proper method of service](#Service), which will check the business rules and return what was requested or raise the proper error that will be handled by the next layer.
      
      Finally, the controller responds with the proper status code and what was requested. Otherwise, is passed to the next layer.
    ---
    
    <div id='Middlewares'/>
    
    - #### Middlewares
    
      <div id='UserAuthentication'/>
    
      - ##### UserAuthentication
      
        This layer provides the middleware for user access control.
    
        <div id='verifyAccessLevel'/>
        
        - ###### verifyAccessLevel
    
          Verifies the token saving in the request the access level and the user id, for a valid user, otherwise it continues the process passing the access level -1.
    
        <div id='ensureAuthentication'/>
    
        - ###### ensureAuthentication
    
          It guarantees that it will only move to the next layer if it is a valid user.
    
        <div id='ensureAdminLevel'/>
    
        - ###### ensureAdminLevel

          Ensures that only a user with access level of 'admin' will go to the next layer. de 'admin'.
      ---
    
      <div id='ErrorHandler'/>
    
      - ##### ErrorHandler
      
        It works in conjunction with an [express-rescue](https://www.npmjs.com/package/express-rescue) library, which ensures that asynchronous errors are correctly routed to this layer. And the service [ErrorInstances](#ErrorInstances), which contains all error classes.
        
        When an error is raised, it is directed to this layer. It is expected that the raised class contains the attributes <u>statusCode</u> and <u>message</u>, so that the error is answered properly. If it does not contain any of these attributes, it will be answered with status code 500 and the message "Internal Server Error".
      ---

  <div id='Service'/>

  - #### Service

    Layer responsible for handling business rules, such as encryption, token generation, checks and validations. It also contains the abstractions used to connect to [model](#Model). A ArticlesService, AuthorsService, CategoriesService, e UsersService . 

    <div id='Encrypter'/>

    - ##### Encrypter

      It uses the [bcryptjs](https://www.npmjs.com/package/bcryptjs) library to turn a string into a hash or buy an unhashed string with some hash.
    ---
    
    <div id='TokenHandler'/>

    - ##### TokenHandler

      Generates, verifies and decodes a passed token. use the [jsonwebtoken](https://jwt.io/) library.
    ---
    
    <div id='ErrorInstances'/>

    - ##### ErrorInstances

      Returns an object with error instances. Which, when raised, are directed to the  [errorHandler](#ErrorHandler) middleware.
      
      Each instance must have the <u>statusCode</u> and <u>message</u> attributes, used for proper error handling. erro.
    ---

    <div id='ArticlesService'/>

    - ##### AuthenticationService

      It is the class that handles the access and authentication business rules.
    ---

    <div id='statusCodes'/>

    - ##### statusCodes

      Abstracts all status codes for responses used in the API.
    ---

  <div id='Model'/>

  - #### Model

    Contains database access logic and CRUDModel implementations used to properly connect to the database.

    <div id='CRUDModel'/>

    - ##### CRUDModel
    
      This is an abstract class, with standard CRUD behaviors. From which implementations inherit and specialize their behavior.
      
      The classes ArticlesModel, AuthorsModel, CategoriesModel, and AccessLevelsModel they are extensions that specialize their behaviors.
    ---

    <div id='database'/>

    - ##### database
    
      In this folder is the <u>knex</u> folder with its settings, migrations and seeds. And the <u>objectRelationalMapper</u> folder that has the [objection](https://vincit.github.io/objection.js/) ORM settings and its models, from which the queries are generated.
    ---

<div id='Containers'/>

## Containers

A dockerfile was created to build a container with the api and install dependencies. And configured the docker-compose file to mount, in addition to the database, the api.

After the database service is started, the test is done with healthcheck to ensure that it is in the air, and it is possible to add the condition to the api. Ensuring that it only starts when the database is running as expected. This was necessary because to ensure practicality in the tests, migrations and seeds were created. They can only be executed when the database has already been moved up and in an order according to the table relationships.

---

<div id='data-base'/>

## Data Base

A container was used, with Postgres that was already configured in the project. In these settings, it was only necessary to add the healthcheck property, to control the time when the bank ended up going up and ensure that the migarions and seeders are executed at the right time.

  <div id='structure'/>

  - ### Structure

    The "articles" was created which has all the data of the articles, the category id and the author id. The initial idea was to create a relationship of 1:N categories, but as the statement requested a category for each file, it was respected. And the "users" table was created, which has the user data and the access level id, which is a foreign key of the access_levels table, which contains the access levels.

    

    ![](/home/rodolfo/Documentos/Projetos/node-challenge-001/utils/readme/retationalBD.png)
---

<div id='testing-locally'/>

## Testing locally

  1. Clone the repository
     - ssh:
       ```bash
       git clone git@github.com:Jr3564/jungle-news.git
       ```
     - http:

       ```bash
       git clone https://github.com/Jr3564/jungle-news.git
       ```
  2. Enter the folder
     ```bash
     cd ./jungle-news/
     ```
  3. Up containers
     ```bash
     docker-compose up
     ```
     - To stop, press ctrl + c .
     - To running in background, add -d to command.
  4. Perfect, the api is running
  5. To stop and remove containers
     ```bash
     docker-compose down
     ```
---

<div id='Libraries'/>

## Libraries

- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [express](expressjs.com)
- [jsonwebtoken](https://jwt.io/)
- [knex](https://knexjs.org/) + [objection](https://vincit.github.io/objection.js/) (ORM)
- [Docker Postgres Image](https://hub.docker.com/_/postgres)  (SGBD)
- [express-rescue](https://www.npmjs.com/package/express-rescue)
