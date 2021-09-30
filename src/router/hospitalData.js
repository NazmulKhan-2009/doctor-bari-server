const express=require('express')
const router=express.Router()
const createHospitalData=require('../controller/hospitalControl/createHospital')
const getHospitalData=require('../controller/hospitalControl/getHospitalList')
const {searchByPartialKey,searchByLocation}=require('../controller/hospitalControl/searchHospital')

router
.route('/data/create')
.post(createHospitalData)

router
.route('/data/hospital')
.get(getHospitalData)

router
.route('/data/hospital/:parKey/:limit/:specific1/:specific2/:specific3/:specific4')
.get(searchByPartialKey)

router
.route('/data/hospital/:mycity/:mylocation')
.get(searchByLocation)

module.exports=router