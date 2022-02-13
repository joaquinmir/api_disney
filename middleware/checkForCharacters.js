const Character = require('../database/models/Character');
require('../database/associations');

module.exports = async (req,res,next) => {  
    if(req.body.characters){
        let character;
        for(let i=0;i<req.body.characters.length;i++){
            character = await Character.findOne({
                where: { name: req.body.characters[i].name }
            })
            .catch( (err) => {
                res.json(err)});
            if(!character){
                res.status(401).json({error: "One or more characters do not exist in the database"});
                return;
            }
        }
    }
    
    return next();
}
