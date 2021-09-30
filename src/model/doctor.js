// const {Schema,model}=require('mongoose');
const mongoose=require('mongoose');
const {Schema,model}=mongoose;

const doctorSchema=new Schema({

 doctorId:{
  type:String
 },
 name:{
  type:String
 },
 phone:{
  type:Number
 },
 email:{
  type:String
 },
 specialist:{
  type:String
 },
 dr_Details:{
  type:String
 },
 image:{
  type:String
 },
 created_at:{
  type:Date,
  default:Date.now
  // default:new Date(Date.now()).toLocaleString()
 },
 dashboard:{
  type:mongoose.ObjectId,
  ref:"doctorDashboard"
 }

})

const doctor=new model('doctor',doctorSchema)

module.exports = doctor;