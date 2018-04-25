const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username:{
    type:String,
    required:[true,'must be filled'],
    unique:[true,'username already exists']
  },
  email:String,
  picture:String,
})

module.exports = mongoose.model('User', userSchema)