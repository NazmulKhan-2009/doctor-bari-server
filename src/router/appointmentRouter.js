const express=require('express')
const router=express.Router()
const {appointmentSet,getAppointmentList,updateAppointment} =require('../controller/appointmentControl/appointmentControl');




router
.route('/data/setappointment')
.post(appointmentSet)

router
.route('/data/appointmentlist')
.get(getAppointmentList)

router
.route('/data/update')
.patch(updateAppointment)




module.exports=router;