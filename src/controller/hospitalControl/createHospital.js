const Hospital=require('../../model/hospital')


module.exports=async(req,res)=>{

  // const data={
  // name:"Metro Hospital",
  // address:"1675/A O.R. Nizam Rd, Chittagong",
  // phone:"01814-856789",
  // email:"No Email",
  // website: "http://www.Metro .com/",
  // adjucentPlace:[
  //   {place:"agrabad",dist:1},
  //   {place:"jambura",dist:7},
  //   {place:"anderkilla",dist:3},
  //   {place:"bandar",dist:3},
  //   {place:"halisohor",dist:2},
  //   {place:"bashundhara",dist:8},
  //   {place:"nawabazar",dist:3},
  
  // ]
  
  // }

  






try{
  console.log(req.body)
 const hospital=new Hospital(req.body)
 const resData=await hospital.save()
 res.status(200).json('success')
    
 }catch(e){
   res.status(400).json(e.message)
 } ;

}