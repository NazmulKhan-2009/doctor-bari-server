const Hospital=require('../../model/hospital.js')


module.exports=async(req,res)=>{
try{
 const result=await Hospital.find()
 res.status(200).json(result)
 }catch(e){
   res.status(400).send('server failed')
 } ;



}