const express=require('express')
const bodyParser=require('body-parser');
const cors=require('cors');
const fileUpload=require('express-fileupload');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const port=process.env.PORT || 8000;

const app = express();

// Middleware Config
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('doctors'));
app.use(fileUpload());


//mongo configure



// const uri = `mongodb+srv://docNazmul:docNazmulkhan@cluster0.qnbwm.mongodb.net/doctorBari?retryWrites=true&w=majority`;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qnbwm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const appointmentCollection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_APPOINTMENT_COLLECTION}`);
  const doctorCollection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_DOCTOR_COLLECTION}`);
  // const doctorCollection = client.db(`doctorBari`).collection(`docInfo`);

 app.post('/addAppointment' , (req , res)=>{
   const appointment=req.body
   console.log(appointment)

   appointmentCollection.insertOne(appointment)
   .then(response =>res.send(response.insertedCount>0)) 
  
 })

 app.get("/appointments",(req,res)=>{
  appointmentCollection.find({}).toArray((err,result)=>{res.send(result)})
 }) 

 app.post('/addadoctor',(req,res)=>{
   const file=req.files.file;
   const name=req.body.name;
   const email=req.body.email;

   console.log(file, name , email)

   file.mv(`${__dirname}/doctors/${file.name}`,err=>{
     if(err){
      console.log(err)
      return res.status(500).send({msg:"Falied to upload"})
     }

     doctorCollection.insertOne({img:file.name,name:name,email:email})
     .then(result=>{
       res.send(result.insertedCount>0);
     })
   })

 })

 app.get('/doctorlist',(req,res)=>{
  doctorCollection.find({}).toArray((err,result)=>{res.send(result)})
 })
});

//appointment by date

app.post('/appointmentbydate' , (req , res)=>{
  console.log(req.body)
})



app.get('/',(req,res)=>{
 res.send("the server is working")
})

app.listen(port,()=>{console.log("server ready")})