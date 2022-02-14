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

### Movies

You can filter them by title and genre. Also you can sort them by release date.

**GET Movies example**

Request:

>GET /api/movies?title=pocahontas

Response:
 >HTTP/1.1 200 OK
[
  {
    "title": "Pocahontas",
    "img": "https://static.wikia.nocookie.net/doblaje/images/6/6b/Pocahontas_1995.jpg/revision/latest/scale-to-width-down/960?cb=20200731233311&path-prefix=es",
    "release_date": "1995-06-23"
  }
]



**GET a Movie example**

Request: 

>GET /api/movies/:id

>HTTP/1.1 200 OK
> {
  "id": 2,
  "title": "Wall-E",
  "img": "https://resizing.flixster.com/rhPHYS0MGJr1NnsewSSJqmjwseo=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzL2FkODNhNzI1LTRhOWItNDg0OC05ODcxLWM5NDlmMzVhZTYxYi53ZWJw",
  "release_date": "2008-07-09",
  "rating": 5,
  "genreName": Sci-Fi,
  "characters": [ {
      "name": "Wall-E",
      "character_movie": {
        "createdAt": "2022-02-14T11:30:11.000Z",
        "updatedAt": "2022-02-14T11:30:11.000Z",
        "characterId": 1,
        "movieId": 2 } }
  ]
}

**POST a Movie example**

Request: 

>POST /api/movies
{
    "title": "Bambi",
    "genre": "Drama"
}

Response:
> HTTP/1.1 200 OK
>{
  "id": 3,
  "title": "Bambi",
  "genreName": "Drama"
}

**PATCH a Movie example**

Request: 

>PATCH /api/movies/3
{
    "title": "Bambi 2"
}

Response:
> HTTP/1.1 200 OK
>{
  "id": 3,
  "title": "Bambi 2",
  "img": null,
  "release_date": null,
  "rating": null,
  "genreName": "Drama"
}

**DELETE a Movie example**

Request: 

>DELETE /api/movies/3

Response:

> HTTP/1.1 200 OK


### Characters

You can filter them by name, age, weigth and movie.

**GET Characters example**

Example: 

> GET /api/characters?movie=wall-e 

Response:
>HTTP/1.1 200 OK
[
  {
    "name": "Wall-E",
    "img": "https://iresiduo.com/sites/default/files/images/08-Wall-E.jpg",
    "movies": [
      {
        "title": "Wall-E",
        "character_movie": {
          "createdAt": "2022-02-14T11:30:11.000Z",
          "updatedAt": "2022-02-14T11:30:11.000Z",
          "characterId": 1,
          "movieId": 2
        }}
	]}
]


**GET a Character example**

Request:
>GET /api/characters/1

Response:
>HTTP/1.1 200 OK
{
  "id": 1,
  "name": "Wall-E",
  "img": "https://iresiduo.com/sites/default/files/images/08-Wall-E.jpg",
  "age": 1000,
  "weigth": "400",
  "bio": "Wall-E is a robot blablabla",
  "movies": [
    {
      "title": "Wall-E",
      "character_movie": {
        "createdAt": "2022-02-14T11:30:11.000Z",
        "updatedAt": "2022-02-14T11:30:11.000Z",
        "characterId": 1,
        "movieId": 2
      } } ]
}

**POST a Character example**

Request:
>POST /api/characters

Response:

>HTTP/1.1 200 OK
{
  "id": 2,
  "name": "Mulan"
}

**PATCH a Character example**

Request:

>PATCH /api/characters/2 
{
    "name": "Mulann"
}

Response:

> HTTP/1.1 200 OK
{
  "id": 2,
  "name": "Mulann",
  "img": null,
  "age": null,
  "weigth": null,
  "bio": null
}

**DELETE a Character example**

Request:

>DELETE /api/characters/2 

Response:

> HTTP/1.1 200 OK

### Authentication

**Registration example**

Request:
> POST /api/auth/register HTTP/1.1
    {
        "username": "user1",
        "password": "password1",
        "email": "user1@mail.com"
    }

Response:

>HTTP/1.1 200 OK
> {
  "admin": false,
  "id": 2,
  "username": "user1",
  "password": "$2a$08$d31InoLk.gLks.107acwGOg5qrueQphoxlmumS4G7rNQtGosZ0CDK",
  "email": "user1@mail.com",
  "updatedAt": "2022-02-14T11:50:08.270Z",
  "createdAt": "2022-02-14T11:50:08.270Z"
}

**Log in example**

 Request:
>POST /api/auth/login HTTP/1.1
{
    "username": "admin",
    "password": "admin"
}

Response:
> HTTP/1.1 200 OK

> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTY0NDgzOTkwNywiZXhwIjoxNjQ0ODQwODA3fQ.jZ9cVrh2rOI6Z7A9LPZn0-HJqzktn6i0dvgs4b6BzZI

**Invalid token request example**

Request:

>POST /api/movies
Authorization: asd
{
    "title": "Bambi"
}

Response:
>HTTP/1.1 401 Unauthorized
{
  "error": "Token missing or invalid"
}

**Send unauthorized request example**

Request:

>POST /api/movies
Authorization: bearer tokenOfNoAdminUser
{
    "title": "Bambi"
}

Response:

>HTTP/1.1 401 Unauthorized
{
  "error": "Acces denied"
}
