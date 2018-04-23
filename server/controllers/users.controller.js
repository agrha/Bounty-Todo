const userSchema = require('../models/users.model')
const jwt = require('jsonwebtoken')
const FB = require('fb')

class User {
  static loginFacebook (req, res) {
    console.log('ini req body',req.body)
    FB.setAccessToken(req.body.token)
    FB.api('/me', { fields: 'name, email, picture' })
    .then(data => {
      console.log(data)
      userSchema.findOne({
        username    : data.name,
        email   : data.email
      })
      .then(user => {
        console.log(user)
        if (user) {
          jwt.sign({ user }, 'secret key', (err, token) => {
            // console.log('finding',user)
            res.status(200).json({                
              message     : `welcome ${user.username}`,
              id          : user._id,
              name        : user.username, 
              email       : user.email,
              profileUrl  : user.picture,
              apptoken    : token,
            })
          })
        } else {
          userSchema.create({
            username: data.name,
            email   : data.email,
            picture : data.picture.data.url
          })
          // console.log('created', user)
          .then(createdUser => {
            let user = createdUser
            jwt.sign({ user }, 'secret key', (err, token) => {
              res.status(200).json({                
                message     : `new user ${user.username}`,
                id          : user._id,
                name        : user.username, 
                email       : user.email,
                profileUrl  : user.picture,
                apptoken    : token,
              })
            })
          })
        }
      })
      .catch(err => {
        res.status(400).json({
          message:'something went wrong',
          err
        })
      })
    })
  }
}

module.exports = User