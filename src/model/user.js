// const {Schema,model}=require('mongoose');
const mongoose=require('mongoose');
const {Schema,model}=mongoose;

const userSchema=new Schema({
 name:{
  type: String
 },
 email:{
  type: String
 },
 phone:{
  type: Number
 },
 password:{
  type: String
 },
 registered_at:{
  type:String
 },
 appointments:{
  type:mongoose.ObjectId,
  ref: 'appointment'
 },
 photoURL:{
  type:String,
 }

})

const user=new model('user',userSchema)

module.exports = user;