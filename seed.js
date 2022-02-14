const sequelize = require('./database/db');
const bcryptjs = require('bcryptjs');
const User = require('./database/models/User');
require('./database/associations');

// execute this if you want to create an admin user 

sequelize.sync({ force: false })
.then(() => {
    
    console.log("Connection established with the database");
})
.then(async () => {
    //Crear admin
    let encryptedPassword = await bcryptjs.hash(process.env.ADMIN_PASSWORD,8);
    User.create({
        username:process.env.ADMIN_USERNAME,
        password: encryptedPassword,
        admin: true,
        email: process.env.ADMIN_EMAIL
    })
    .catch(err => console.log(err));
})
.catch(err => console.log(err));
