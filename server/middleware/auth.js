const jwt = require('jsonwebtoken')

class Auth {
  static login (req,res) {
    const token = res.headers.token
    jwt.verify(token,'secret key',(err,decoded)=>{
      if(!err){
        req.decoded = decoded
        next()
      } else {
        res.status(403).json({
          message:'login dulu mas',
          err
        })
      }
    })
  }

  static admin(req,res){
    if(req.decoded&&req.decoded.role === 'admin'){
      return next()
    } else {
      res.status(403).json({
        message:'you are not admin',
      })
    }
  }

  static user(req,res){
    if(req.decoded){
      if(req.decoded.id === req.params.id || req.decoded.role === 'admin'){
        return next()
      } else {
        res.status(403).json({
          message:'you are not authorized to this page'
        })
      }
    }
  }
}