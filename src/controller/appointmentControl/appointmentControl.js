
const appointment=require('../../model/appointment')


// Create Doctor ↓
const appointmentSet=async(req,res)=>{
 // const doctorCode=new Date().getFullYear().toString().substr(2)+"-"+Math.floor(Math.random()*1000)      
 // const lastName=req.body.name.split(' ')
 // const doctorTitle=lastName[lastName.length-1]
 // const doctorId=`Dr.${doctorTitle}-${doctorCode}`

try{
 
 const serial=await appointment.count({appointmentDate:req.body.appointmentDate})+1
 const responsedData=await appointment.create({...req.body,serial,status:"Not Visited"})
 res.status(200).send({data:responsedData,notify:"Your appointment has fixed"})
}catch(e){
 res.status(400).send("failed to save Doctor Data Due to server problem")
};
}



//get whole appointment data ↓
const getAppointmentList = async(req,res)=>{
 
 try{
  const responsedData=await appointment.find().select('appointmentDate phone age serial drName name email status -_id')
     res.status(200).send(responsedData)
  }catch(e){
    res.status(400).send({notify:'server problem'})
  } ;
}

module.exports={
 appointmentSet,
 getAppointmentList
}
