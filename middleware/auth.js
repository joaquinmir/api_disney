const User = require('../database/models/User');
const jwt = require('jsonwebtoken');

module.exports =  function(admin){
    return async (req,res,next) => { 
        let authorization = req.get('authorization');
        let token="";

        if(authorization && authorization.toLowerCase().startsWith("bearer")){
            token = authorization.substring(7);
        }
        let decodedToken; 
        try{
            decodedToken =  await jwt.verify(token,process.env.SECRET);
        }
        catch {
            res.status(401).json({error: "Token missing or invalid"});
            return;
        }
        if(!token || !decodedToken.id){
            res.status(401).json({error: "Token missing or invalid"});
            return;
        }

        if(admin){
            let user = await User.findByPk(decodedToken.id);
            try{
                if(!user.admin){
                    res.status(401).json({error: "Acces denied"});
                    return;
                }
            }
            catch{
                res.status(401).json({error: "Invalid request"});
                return;
            }
        }
        
        return next();

    }
}

 