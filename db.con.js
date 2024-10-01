
require('dotenv').config()
const mongoose=require('mongoose')

//!from doctor bari api
//const db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qnbwm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const db= `mongodb+srv://docNazmul:docN-z-u---an@cluster0.qnbwm.mongodb.net/doctorBari?retryWrites=true&w=majority`


//! from hospital api


// const localDB="mongodb://localhost:27017/hospital?retryWrites=true&w=majority"

module.exports = async function connection() {
 try {
     const connectionParams = {
         useNewUrlParser: true,
         
         useUnifiedTopology: true,
     };
     await mongoose.connect(db, connectionParams);
     console.log("connected to database");
 } catch (error) {
     console.log(error);
     console.log("could not connect to database");
 }
};
