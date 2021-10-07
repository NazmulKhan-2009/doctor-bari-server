const admin=require('../../model/admin')
const user=require('../../model/user')

const bcrypt=require('bcrypt')
var jwt = require('jsonwebtoken');


// Create Admin ↓
const createAdmin=async(req,res)=>{

 // console.log(req.body)

try{
 const existInUser=await user.findOne({$or:[{email:req.body.email},{phone:req.body.phone}]})   //okay 
 const existInAdmin=await admin.findOne({$or:[{email:req.body.email},{phone:req.body.phone}]})   //okay 

 if(!existInUser && !existInAdmin){
  const name=req.body.name
  const lastName=name.split(' ')[name.split(' ').length-1]
  const generatePass=`admin-${lastName}-${Math.floor(Math.random()*1000)}`
  const hash_pass=await bcrypt.hash(generatePass, 10)
  const adminData={
    ...req.body,
    photoURL:req.body.image,
    password:hash_pass,
    registered_at:new Date().toDateString()+' at '+new Date().toLocaleTimeString()   
  }
  const response=await admin.create(adminData)
  res.status(200).send({notify:`Hi ${response.name} , You are registered admin now of Doctor Care, you admin password is ${generatePass}`})
 }else{
  res.status(200).send({notify:"The user already exists"})
 }
 }catch(e){
    res.status(400).send("failed to create user Data Due to server problem")
  };
}


// console.log(`admin ${Math.floor(Math.random()*1000)}`)

module.exports={
 createAdmin,

}