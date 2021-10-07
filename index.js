require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection=require('./db.con');
const app=express();
const port=process.env.PORT || 8000;

const hospitalRoute=require('./src/router/hospitalData');
const doctorRoute=require('./src/router/doctorRouter')
const apointmentRoute =require('./src/router/appointmentRouter')
const userRoute=require('./src/router/userRouter')
const adminRoute=require('./src/router/adminRouter')

connection()


app.use(express.json({limit: '600kb'}));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/hospital',hospitalRoute);
app.use('/doctor',doctorRoute);
app.use('/appointment',apointmentRoute)
app.use('/user',userRoute)
app.use('/admin',adminRoute)





app.get('/',(req,res)=>{
 res.send("the doctor bari server is working for testing hospital api")
})

app.listen(port,()=>{console.log(`server ready in PORT ${port}`)})