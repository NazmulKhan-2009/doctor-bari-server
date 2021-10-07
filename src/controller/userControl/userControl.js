const user=require('../../model/user')
const admin=require('../../model/admin')
const bcrypt=require('bcrypt')
var jwt = require('jsonwebtoken');


// Create Doctor ↓
const createUser=async(req,res)=>{

try{
  
switch (Object.keys(req.body).length>=3) {
  case true:
      const existInUser=await user.findOne({$or:[{email:req.body.email},{phone:req.body.phone}]})   //okay 

      if(!existInUser){
       const hash_pass=await bcrypt.hash(req.body.password, 10)
       const userData={
         ...req.body,
         password:hash_pass,
         photoURL:req.body.photoURL ? req.body.photoURL : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB68ebXPWRig_Qe-ustmw3bTYrmbCGUiiT4RSa2bXiHpn0SsY&s',
         registered_at:new Date().toDateString()+' at '+new Date().toLocaleTimeString()   
       }
       const response=await user.create(userData)
       res.status(200).send({notify:`Hi ${response.name} , You are registered user now of Doctor Care`})
      }else{
       res.status(200).send({notify:"The user already exists"})
      }
  break;

  case false:
    const responsedUserData=await user.findOne({phone:req.body.phone});
    // const responsedAdminData=await admin.findOne({phone:req.body.phone});

    const login=async(responsedData,entrant)=>{
      if(responsedData){
      const {_id, name, email, photoURL}=responsedData;
      const hashedPass=responsedData.password;
      const reqPass=req.body.password ;
      const isPassMatch=await bcrypt.compare(reqPass, hashedPass);
      if(isPassMatch){
        const token= await jwt.sign({_id,email},'doctor2021care',{expiresIn:'1h'});
        res.status(200).send({displayName:name, email, photoURL, token, signIn:true, entrant, notify:`Welcome ${name} You are signed in`})  ;  
       }else{
         res.status(200).send({notify:'Your Password is mismatched'});
       }
    }else{
        res.status(200).send({notify:'Your login information is mismatched'});
    }
    }

    if(responsedUserData){
      login(responsedUserData,'user')
    }else{
      const responsedAdminData=await admin.findOne({phone:req.body.phone});
      login(responsedAdminData, 'admin')
    }

    // if(responsedUserData){
    //   login(responsedUserData)
      
    // }else if(responsedAdminData){
    //   login(responsedAdminData)

    // }else{
    //   res.status(200).send({notify:'Your login information is mismatched'});
    // }  
  break;

 default:
  break;
}

 }catch(e){
    res.status(400).send("failed to create user Data Due to server problem")
  };
}






module.exports={
 createUser,

}