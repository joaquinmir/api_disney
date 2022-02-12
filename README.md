# api_disney

This is an API made with node.js.

**Technologies used:**
- node.js
- Express
- Sequelize
- jwt

### DB Modeling
The database consists of 4 entitys: User, Movie, Character, Genre.

![db diagram](https://i.ibb.co/mXhPKbL/db.png "db diagram")

## Endpoints

**GET**  **Movies** 

`/api/movies`

You can filter them by title and genre. Also you can sort them by release date.

Example: 

`/api/movies?title=mulan&order=ASC`

**GET/POST/DELETE/PATCH** a **Movie** 

`/api/movies/:id`

**GET/POST/DELETE/PATCH** a **Character** 

`/api/characters/:id`

**GET**  **Characters** 

`GET /api/characters`

You can filter them by name, age, weigth and movie.

Example: 

`GET /api/characters?name=mushu&movie=mulan`

**Authentication endpoints**

`POST /api/authentication/register`

`POST /api/authentication/login`

