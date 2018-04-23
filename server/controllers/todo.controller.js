const todoSchema = require('../models/todo.model')

class Todo {
  static create(req,res){
    let obj = {
      name: req.body.name,
      description: req.body.description,
      hutang: req.body.hutang,
      status: false,
      image: req.file.cloudStoragePublicUrl,
      userId: req.body.userId
    }
    // console.log(obj)
    todoSchema.create(obj)
    .then(data => {
      console.log(data)
      res.status(200).json({
        message: 'create todo successfully',
        data
      })
    })
    .catch(err => {
      res.status(500).json({
        message:'something went wrong',
        err
      })
    })
  }

  static read(req,res){
    todoSchema.find({
      userId: req.params.id
    })
    .populate('userId')
    .exec()
    .then(todo => {
      res.status(200).json({
        message:'list of todo:',
        todo
      })
    })
    .catch(err => {
      res.status(500).json({
        message:'something went wrong',
        err
      })
    })
  }

  static delete(req,res) {
    let target = {
      _id:req.params.id
    }
    todoSchema.findOneAndRemove(target)
    .then(todo => {
      res.status(200).json({
        message:'delete todo successfully',
        todo
      })
    })
    .catch(err => {
      res.status(500).json({
        message:'something went wrong',
        err
      })
    })
  }

  static complete(req,res){
    todoSchema.findById(req.params.id)
    .then(data => {
      data.status = !data.status
      data.save()
      .then(savedData=>{
        res.status(200).json({
          message:'update success',
          savedData,
          id: req.params.id
        })
      })
      .catch(err=>{
        res.status(500).json({
          message:'update failed',
          err
        })
      })
    })
    .catch(err=>{
      res.status(500).json({
        message:'data is not found',
        err
      })
    })
  }
}
module.exports = Todo