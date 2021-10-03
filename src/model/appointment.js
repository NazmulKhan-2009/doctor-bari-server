// const {Schema,model}=require('mongoose');
const mongoose=require('mongoose');
const {Schema,model}=mongoose;

const appointmentSchema=new Schema({
 drName:{
  type: String
 },
 appointmentDate:{
  type: String
 },
 name:{
  type: String
 },
 email:{
  type: String
 },
 phone:{
  type: String
 } ,
 age:{
  type: String
 },
 serial:{
  type: Number
 },
 status:{
  type: String
 }

})

const appointment=new model('appointment',appointmentSchema)

module.exports = appointment;