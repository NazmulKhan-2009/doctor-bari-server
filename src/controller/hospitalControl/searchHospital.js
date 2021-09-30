const Hospital=require('../../model/hospital.js')

// /^fluff/
// `/^${key}/`  
//! search regex and extensive 
const searchByPartialKey=async(req,res)=>{
try{
    const {parKey:key, limit , specific1,specific2,specific3,specific4}=req.params
    console.log(limit)
    const result=await Hospital.find({ name : new RegExp(key,"i")}).limit(parseInt(limit)).select({[specific1]:1,[specific2]:1,[specific3]:1,[specific4]:1,_id:0})

    // const result=await Hospital.findOne({ name:key});
    res.status(200).send(result)
 }catch(e){
   res.status(400).send('server failed')
 } ;
}




const searchByLocation=async(req,res)=>{
const {mycity,mylocation}=req.params

// const locationData=await Hospital.find({name:new RegExp(mycity,"i")}).select({adjucentPlace:1,name:1})
//! KHAN ALGORITHM
// const locationData=await Hospital.find()
// const findLocation=locationData.map(item=>{return { location:item.adjucentPlace.filter(item=>item[0]===mylocation),hosName:item.name,phone:item.phone}})

// const response=findLocation.map(item=>item.location.length>0 && item).filter(item=>item!==false).map(item=>{return {distance:item.location[0][1],place:item.location[0][0],hospital:item.hosName,phone:item.phone} })
// =========================>



//!how query from array in the document by mongoose
//! link https://stackoverflow.com/questions/41439971/mongoose-querying-inner-document-array

const locationData=await Hospital.find({adjucentPlace:{$elemMatch:{place:mylocation}}})




// res.status(200).json(response)
res.status(200).json(locationData)
console.log(res)
}

module.exports={
 searchByPartialKey,
 searchByLocation
}