require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require("./database/db")

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.set("port",3000||process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/movies', require('./api/movies'));
app.use('/api/characters', require('./api/characters'));
app.use('/api/genres', require('./api/genres'));
app.use('/api/authentication', require('./api/authentication'));




app.listen(app.get("port"), () => {
  console.log(`Example app listening on port ${app.get("port")}`)

  sequelize.sync({ force: false }).then(() => {
    console.log("Nos hemos conectado a la base de datos");
  }).catch(error => {
      console.log('Se ha producido un error', error);
  });

})
