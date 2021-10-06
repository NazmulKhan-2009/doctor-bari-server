const express=require('express')
const router=express.Router()
const {createUser}=require('../controller/userControl/userControl')



router
.route('/data/create')
.post(createUser)












module.exports=router