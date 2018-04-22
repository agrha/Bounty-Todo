const todoSchema = require('../models/todo.model')

class Todo {
  static readById(req,res){
    let target = {
      userId = req.headers.id
    }
    todoSchema.find(target)
    .then(dat=>{
      res.status(data)
    })
  }
}