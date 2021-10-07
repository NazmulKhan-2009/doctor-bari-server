const express=require('express')
const router=express.Router()
const {createAdmin}=require('../controller/adminControl/adminControl')



router
.route('/data/create')
.post(createAdmin)












module.exports=router