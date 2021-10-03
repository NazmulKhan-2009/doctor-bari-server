const express=require('express')
const router=express.Router()
const {appointmentSet,getAppointmentList} =require('../controller/appointmentControl/appointmentControl');




router
.route('/data/setappointment')
.post(appointmentSet)

router
.route('/data/appointmentlist')
.get(getAppointmentList)



module.exports=router;