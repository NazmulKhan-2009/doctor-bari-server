const mongoose=require('mongoose');
const {Schema,model}=mongoose;


const doctorDashboardSchema=new Schema({

 visitingHour:{
  type:String
 },
 patientHandle:{
  type:Number
 },
 recovered:{
  type:Number
 },
 patientList:{
  type:String
 },
 doctorId:{
  type:mongoose.ObjectId,
  ref:"doctor"
 }

})

const doctorDashboard=new model('doctorDashboard',doctorDashboardSchema)

module.exports = doctorDashboard;