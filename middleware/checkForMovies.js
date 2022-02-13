const Movie = require('../database/models/Movie');
require('../database/associations');

module.exports = async (req,res,next) => { 
    if(req.body.movies){ //If the request have movies check if all of them exists in the db
        let movie;
        for(let i=0;i<req.body.movies.length;i++){
            movie = await Movie.findOne({
                where: { title: req.body.movies[i].title }
            })
            .catch( (err) => {
                res.json(err)});
            if(!movie){
                res.status(400).json({error: "One or more movies do not exist in the database"});
                return;
            }
        }
    }
    
    return next();
}
        
    

