const userSchema = require('../models/users.model')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

class User {
  static read(req,res){
    userSchema.find()
    .then(users=>{
      res.status(200).json({
        message:'list of user:',
        users
      })
    })
    .catch(err=>{
      res.status(500).json({
        message:'something went wrong',
        err
      })
    })
  }

  static createGiver(req,res){
    let password = bcrypt.hashSync(req.body.password,salt)
    let obj = {
      username:req.body.username,
      password:password,
      role:'giver'
    }
    userSchema.create(obj)
    .then(giver=>{
      res.status(200).json({
        message: 'giver created',
        giver
      })
    })
    .catch(err=>{
      res.status(500).json({
        message:'something went wrong',
        err
      })
    })
  }

  static createPursuer(req,res){
    let password = bcrypt.hashSync(req.body.password,salt)
    let obj = {
      username:req.body.username,
      password:password,
      role:'pursuer'
    }
    userSchema.create(obj)
    .then(pursuer=>{
      res.status(200).json({
        message:'pursuer created',
        pursuer
      })
    })
    .catch(err=>{
      res.status(500).json({
        message:'something went wrong',
        err
      })
    })
  }

  static update(req,res){
    let password = bcrypt.hashSync(req.body.password,salt)
    let target = {
      _id:req.params.id
    }
    userSchema.find(target)
    .then(user=>{
      user.username = req.body.username || user.username,
      user.password = password || user.password
      user.save()
      .then(dataEdit=>{
        res.status(200).json({
          message:'update successfull',
          dataEdit
        })
      })
      .catch(err=>{
        res.status(500).json({
          message:'something went wrong',
          err
        })
      })
    })
    .catch(err=>{
      res.status(500).json({
        message:'data is not found',
        user
      })
    })
  }

  static delete(req,res){
    let target = {
      _id:req.params.id
    }
    userSchema.findByIdAndRemove(target)
    .then(user=>{
      res.status(200).json({
        message:'delete successs',
        user
      })
    })
    .catch(err=>{
      res.status(500).json({
        message:'something went wrong',
        err
      })
    })
  }
}