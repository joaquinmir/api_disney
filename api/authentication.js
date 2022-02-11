const express = require('express');
const router = express.Router();
require('../database/associations');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../database/models/User');
const sgMail = require('../services/sendgrid');


router.post('/login',async (req, res) => {
    User.findOne({ where: { username: req.body.username } })
    .then(user =>{
        if(bcryptjs.compareSync(req.body.password,user.password)){
            const userForToken = {
                id: user.id,
                username: user.username
            }

            const token = jwt.sign(userForToken,process.env.SECRET,{expiresIn: process.env.EXPIRE_TIME});
            res.send(token);
        }
        else{
            res.status(400).json("User or Password is incorrect");
        }
    })
    .catch(() => {
        res.status(400).json("User or Password is incorrect");
    });
    
})

router.post('/register', async (req, res) => {
    let encryptedPassword = await bcryptjs.hash(req.body.password,8);
    User.create({
        username: req.body.username,
        password: encryptedPassword,
        email: req.body.email
    })
    .then(user => {
        const msg = {
            to: user.email,
            from: process.env.SENDGRID_MAIL,
            subject: "Welcome!",
            text: `Hi ${user.username}! Thank you for signin up`,
        };
        try {
            sgMail.send(msg);
          } catch (err) {
            return res.status(err.code).send(err.message);
        }
        res.json(user);
    }).catch(err => {
        res.json(err);
    });
})

module.exports = router;