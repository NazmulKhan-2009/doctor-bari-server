console.clear()


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
app.use(express.static('doctors')); //directory send for photo upload
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

 //PATCH SEEN
//  app.put("/addAppointment/:id", (req,res)=>{
//   appointmentCollection.findByIdAndUpdate({_id:req.params.id},req.body)
//   .then(res=>console.log(res))
  
  
//  })

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

// appointment by date
// app.post('/appointmentbydate', (req, res) => {
//   const date = req.body.date;
//   const email = req.body.email;
//   doctorCollection.find({ email: email })
//       .toArray((err, doctors) => {
//           const filter = { appointmentDate:date }
//           if (doctors.length === 0) {
//               filter.email = email;
//           }
//           appointmentCollection.find(filter)
//               .toArray((err, documents) => {
//                   // console.log(email, date, doctors, documents)
//                   console.log(documents)
//                   res.send(documents);
//               })
//       })
// })


app.post('/appointmentbydate',async(req,res)=>{
const info={
  email:req.body.email,
  appointmentDate:req.body.date
}

try{
  await doctorCollection.find({email:req.body.email}).toArray((err,doctors)=>{
    // if(doctors.length>0){
    //   appointmentCollection.find({appointmentDate:req.body.date}).toArray((err,docs)=>{console.log(docs)})
    // }else{
    //   appointmentCollection.find(info).toArray((err,appoint)=>{console.log(appoint)})
    //   // console.log("no doctor in the list")
    // }

    (async()=>{
      doctors.length>0 ? 
      await appointmentCollection.find({appointmentDate:req.body.date}).toArray((err,docs)=>{res.send(docs)})      
      :
      await appointmentCollection.find(info).toArray((err,appoint)=>{res.send(appoint)})

    })()

  })


 }catch(e){
   res.status().send(e)
  } ;


})

app.post('/isdoctor' , async(req , res)=>{
  await doctorCollection.find({email:req.body.email}).toArray((err,docotorList)=>{
    console.log(docotorList.length>0)
    res.send(docotorList.length>0)
  })
})


});





app.get('/',(req,res)=>{
 res.send("the server is working")
})

app.listen(port,()=>{console.log(`server ready in PORT ${port}`)})