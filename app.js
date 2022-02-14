require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require("./database/db")

app.set("port",3000||process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.disable('x-powered-by');

app.use('/api/movies', require('./api/movies'));
app.use('/api/characters', require('./api/characters'));
app.use('/api/genres', require('./api/genres'));
app.use('/api/auth', require('./api/authentication'));


app.listen(app.get("port"), () => {
  console.log(`Listening on port ${app.get("port")}`)

  sequelize.sync({ force: false }).then(() => {
    console.log("Connection established with the database");
  }).catch(error => {
      console.log('Error', error);
  });

})
