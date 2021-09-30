// "name":"General Hospital",
//   "address":"Address: Pahartali, Chittagong",
//   "phone":"+880-31-659019, 659018",
//   "visit":"",
//   "distance":"15",
//   "adjucent":[['olonkar',5],['sagorika',6],['pahartoli',8],['ak khan',10],['cornelhat',15]]


 const {Schema,model}=require('mongoose');
// const mongoose = require('mongoose')

const hospitalSchema=new Schema({

 name:{
  type:String,
  get:capFirstLetter,
  required:[true,'required hospital name']

 },

 category:{
  type:String,
  required:[true, 'otherwise input n/a'],
  validate:{
   validator:function(v){
    return (/[^\s]+(\s.+)\b/.test(v) || v==="n/a")
   },
   message:"Only Alphabet Require"
  }
 },
 address:{
  type:String,
  required:[true,"please input hospital address"]
 },
 phone:{
  type:String,
  required:[true,"please input hospital hot-line"],
  validate:{
   validator:function(v){
    return (v===null || v.trim.length<1 || /^\d{10}$/.test(v))
   },
   message:"Onle Number allowed"
  }
 },
 email:{
  type:String,
  lowercase:true,
  validate:{
   validator:function(v){
     return (/\S+@\S+\.\S+/.test(v) || v=="n/a")
   },
   message:'Please provide email format if not any input n/a'
  }
 },
 
 website:{
  type:String,
  validate:{
   validator:function(v){
     return (v || v=="n/a")
   },
   message:'Please provide website in correct format if not any input n/a'
  }
 },

 adjucentPlace:{
  type:[]
 },
 date: { type: Date, default: Date.now }
 

})


hospitalSchema.virtual('fullName').get(function() {
 return `${this.name}`;
});

function capFirstLetter(v){
 return v.charAt(0).toUpperCase()+v.substr(1)
}



const hospital=new model('hospital',hospitalSchema)

module.exports = hospital;