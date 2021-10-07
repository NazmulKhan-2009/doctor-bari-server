// const {Schema,model}=require('mongoose');
const mongoose=require('mongoose');
const {Schema,model}=mongoose;

const adminSchema=new Schema({
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
 photoURL:{
  type:String,
 }

})

const admin=new model('admin',adminSchema)

module.exports = admin;