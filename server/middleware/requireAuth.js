const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

async function requireAuth(req, res,next){
    try {
        // read token from the req 
        const token =  req.cookies.Authorization;
        // decode the token
        var decoded = jwt.verify(token, process.env.SECRET);

        // check expiration
        if( decoded.exp < Date().now ) res.sendStatus(401);
        // sub is user._id
        const userId = decoded.sub;

        // find user using token's sub (user._id)
        const user = await User.findById(userId);
        if(!user) 
            res.sendStatus(401);

        // attach user to request
        req.user = user;

        // continue   
        next();
    } catch (error) {
       return res.sendStatus(401);    
    }
    
}
module.exports=  requireAuth;