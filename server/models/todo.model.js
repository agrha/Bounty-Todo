const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  name:String,
  description:String,
  hutang:Number,
  status:String,
  image:String,
  userId:{type:Schema.Types.ObjectId,ref:'User'}
})

module.exports = mongoose.model('Todo',todoSchema)