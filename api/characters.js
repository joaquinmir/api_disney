const express = require('express');
const router = express.Router();
const Character = require('../database/models/Character');
const Movie = require('../database/models/Movie');
require('../database/associations');
const auth = require('../middleware/auth');


router.post('/',auth(true),(req,res) => {
    
    Character.create({
        name: req.body.name,
        img: req.body.img,
        age: req.body.age,
        weigth: req.body.weigth,
        bio: req.body.bio
    })
    .then((character) => {
        if(req.body.movies){
            req.body.movies.forEach((movie) => {
                console.log(movie);
                Movie.findOne({
                    where: { title: movie.title }
                })
                .then((mov) => {
                    character.addMovie(mov);
                })
                .catch( (err) => res.json(err));
            });
        }
    })
    .then(character => {
        res.json(character);
    })
    .catch(err => {
        res.json(err);
    });
    
});

router.get("/:id",auth(false),(req,res) =>{

    Character.findByPk(req.params.id,{
        attributes: ['name', 'img'],
        include: {
            model: Movie,
            attributes:["title"]
        }
    })
    .then(characters => {
        res.json(characters);
    })
    .catch(err => {
        res.json(err);
    });
    
});

router.delete("/:id",auth(true),(req,res) =>{
    
    Character.destroy({
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json(result);
    })
    .catch(err => {
        res.json(err)});
    
});

router.patch("/:id",auth(true),(req,res) =>{
    Character.update({
        name: req.body.name,
        img: req.body.img,
        age: req.body.age,
        weigth: req.body.weigth,
        bio: req.body.bio
        
    }, {
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        if(req.body.movies){
            Character.findByPk(req.params.id)
            .then(async (character) => {
                await character.removeMovies();
                req.body.movies.forEach((movie) => {
                    Movie.findOne({
                        where: { title: movie.title }
                    })
                    .then( (mov) => {
                        character.addMovie(mov);
                    })
                    .catch( (err) => res.json(err));
                });
            })
        }
    })
    .then(result => {
        res.json(result);
    })
    .catch(err => res.json(err));
    
});

router.get("/",auth(false),(req,res) =>{

    let {name,age,weigth,movie} = req.query;
    const where = {};
    const include = [];
    if(name){
        where.name = name;
    }
    if(weigth){
        where.weigth = weigth;
    }
    if(age){
        where.age = age;
    }

    if(movie){
        where["$Movies.title$"] = movie;
        include.push({
            model: Movie, as: Movie.tableName,
            attributes: ["title"]
        });
    }

    Character.findAll({ 
        where,
        attributes: ['name', 'img'],
        include  
    })
    .then(movies => {
        res.json(movies);
    })
    .catch(err => {
        res.json(err);
    });
    
    
});



module.exports = router;