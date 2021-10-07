
const appointment=require('../../model/appointment')
const user =require('../../model/user')


// Create Doctor ↓
const appointmentSet=async(req,res)=>{
 // const doctorCode=new Date().getFullYear().toString().substr(2)+"-"+Math.floor(Math.random()*1000)      
 // const lastName=req.body.name.split(' ')
 // const doctorTitle=lastName[lastName.length-1]
 // const doctorId=`Dr.${doctorTitle}-${doctorCode}`

try{
 
 const serial=await appointment.count({appointmentDate:req.body.appointmentDate})+1
 const responsedData=await appointment.create({...req.body,serial,status:"Not Visited"})
 await user.updateOne({phone:req.body.phone},{
  $push:{
     appointments:responsedData._id
  }
})

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


const updateAppointment =async(req, res)=>{
  try{
    // console.log(typeof req.body.serial)
      const {appointmentDate, serial, status}=req.body
      const responsedData=await appointment
          .findOneAndUpdate({appointmentDate},{status},{new:true})
          .where('serial')
          .equals(serial)
          // .select('appointmentDate serial status -_id')
    
      const {appointmentDate: date, serial :sl, status : sts}=responsedData
      res.status(200).send(`Appointment status updated as ${sts} for serial ${sl} on ${date}`)
   }catch(e){
      console.log(400).send('server Problem')
    } ;

}


module.exports={
 appointmentSet,
 getAppointmentList,
 updateAppointment
}
