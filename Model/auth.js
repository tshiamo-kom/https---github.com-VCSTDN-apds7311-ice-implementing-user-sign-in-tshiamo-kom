const jwt = require('jsonwebtoken')

module.exports = (req, res, next) =>{
   try{
    const token = req.headers.authenticated.split("")[1]
    jwt.verify(token, 'usingJsonWebTokenGenerateAsSessionToken')
    next()
   } 
   catch(error){
    res.status(403).json({
        message: 'Invalid token',
        error: error
    })
   }
}