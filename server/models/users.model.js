const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username:{
    type:String,
    required:[true,'must be filled'],
    unique:[true,'username already exists']
  },
  password:String,
  role:String
})

module.exports = mongoose.model('User',userSchema)