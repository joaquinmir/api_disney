const express = require('express');
const router = express.Router();
const Movie = require('../database/models/Movie');
const Character = require('../database/models/Character');
require('../database/associations');
const auth = require('../middleware/auth');


router.get("/",auth(false),(req,res)=>{
        
    let {title,genre,order} = req.query;
    const where = {};
    let orderQuery = [];
    if(order){
        if(order == "ASC"){
            orderQuery = [["release_date","ASC"]]
        }
        else if(order == "DESC"){
            orderQuery = [["release_date","DESC"]]
        }
    }
    if(title){
        where.title = title;
    }
    if(genre){
        where.genreName = genre;
    }
    Movie.findAll({
        where,
        order: orderQuery,
        attributes: ['title', 'img','release_date']
        })
    .then(movies => {
        res.json(movies);
    })
    .catch(err => {
        res.json(err);
    });
    

});


router.post('/',auth(true),(req,res) => {
    Movie.create({
        title: req.body.title,
        img: req.body.img,
        release_date: req.body.release_date,
        rating: req.body.rating,
        genreName: req.body.genre
    })
    .then( (movie) => {
        if(req.body.characters){
            req.body.characters.forEach(async (character) => {
                const [char] = await Character.findOrCreate({
                    where: { name: character.name },
                    defaults:{
                        name: character.name,
                        img: character.img,
                        age: character.age,
                        weigth: character.weigth,
                        bio: character.bio
                    }
                });
                movie.addCharacter(char);
            });
        }
        
        res.json(movie);
    })
    .catch(err => {
        
        res.json(err);
    });
    
});

router.get("/:id",auth(false),(req,res) =>{

    Movie.findByPk(req.params.id,{
        include: {
            model: Character,
            attributes: ['name']
        }
    })
    .then(movies => {
        res.json(movies);
    })
    .catch(err => {
        res.json(err);
    });
    
});

router.delete("/:id",auth(true),(req,res) => {
    
    Movie.destroy({
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json(result);
    })
    .catch(err => {
        res.json(err)});

    
})

router.patch("/:id",auth(true),(req,res) =>{
    Movie.update({
        title: req.body.title,
        img: req.body.img,
        release_date: req.body.release_date,
        rating: req.body.rating,
        genreName: req.body.genre
        
    }, {
        where: {
            id: req.params.id
        }
    })
    .then(async () => {
        let movie = await Movie.findByPk(req.params.id).catch( (err) => res.json(err));
        if(req.body.characters){
            await movie.removeCharacters();
            req.body.characters.forEach(async (character) => {
                const [char] = await Character.findOrCreate({
                    where: { name: character.name },
                    defaults:{
                        name: character.name,
                        img: character.img,
                        age: character.age,
                        weigth: character.weigth,
                        bio: character.bio
                    }
                });
                movie.addCharacter(char);
            });
        } 
        res.json(movie);  
    })
    .catch(err => {
        res.json(err);
    });
    
});



module.exports = router;