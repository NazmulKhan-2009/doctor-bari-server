const express=require('express')
const router=express.Router()
const {createDoctor,getDoctorsData,deleteDoctor,findDoctor,updateDoctor}=require('../controller/doctorControl/doctorControl')

router
.route('/data/create')
.post(createDoctor)

router
.route('/data/doctorslist')
.get(getDoctorsData)

router
.route('/data/delete/:id')
.delete(deleteDoctor)

router
.route('/data/doctorinfo/:id')
.get(findDoctor)

router
.route('/data/update')
.patch(updateDoctor)








module.exports=router