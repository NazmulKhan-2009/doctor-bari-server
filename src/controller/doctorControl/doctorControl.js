const doctor=require('../../model/doctor');
const doctorDashboard=require('../../model/doctorDashboard')

// Create Doctor ↓
const createDoctor=async(req,res)=>{
    const doctorCode=new Date().getFullYear().toString().substr(2)+"-"+Math.floor(Math.random()*1000)      
    const lastName=req.body.name.split(' ')
    const doctorTitle=lastName[lastName.length-1]
    const doctorId=`Dr.${doctorTitle}-${doctorCode}`

  try{
      
    const responsedData=await doctor.create({...req.body,doctorId})
    const responsedDashboard=await doctorDashboard.create({doctorId:responsedData._id})
    await doctor.updateOne({_id:responsedData._id},{dashboard:responsedDashboard._id})

    res.status(200).send({data:responsedData,notify:"Doctor Data save successfully"})
  }catch(e){
    res.status(400).send("failed to save Doctor Data Due to server problem")
  };
}


//get Doctors List ↓
const getDoctorsData = async(req, res) =>{ 
  try{
    const responsedData = await doctor.find() 
    res.status(200).send(responsedData)
  }catch(e){
    res.status(400).send('failed to fetch Doctor Data Due to server problem')
  } ;

}


// Find Doctor ↓
const findDoctor =async(req,res)=>{
  const searchValue=req.params.id  
    try{
      const responsedData=await doctor.findOne({doctorId:searchValue})
      
      if(responsedData!==null){
        res.status(200).send({data:responsedData,notify:'data found'})
     }else{
        res.status(200).send({notify:`${searchValue} is not found`})
     }
        
    }catch(e){
      res.status(400).send({notify:"Server Problem please try later"})
      } ;
}


//Delete Doctor ↓
const deleteDoctor = async(req,res)=> {

    const searchingValue=req.params.id;
    try{
      const response=await doctor.findOneAndDelete({doctorId:searchingValue})

    if(response!==null){
        res.status(200).send({notify:"Doctor data deleted successfully"})
    }else{
        res.status(200).send({notify:`${searchingValue} is not right ID`})
    }

    }catch(e){
      res.status(400).send({notify:"Server Problem please try later"})
      } ;
}






// JAVA SCRIPT CODE TESTING AREA STARTS ↓
// const city={data:'dhaka'}
// console.log(city.color)

// JAVA SCRIPT CODE TESTING AREA ENDS ↑






module.exports={
 createDoctor,
 getDoctorsData,
 deleteDoctor,
 findDoctor
}






