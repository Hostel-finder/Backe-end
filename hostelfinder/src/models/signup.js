const mongoose = require ("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
    fullname : {
        type:String,
        required:true,
        minlength:3
    },
    fathername : {
        required: true,
        type:String,
        minlength:3
    },
    course:{
        type:String,
        required:true,
        enum: ["B.Tech","MCA","Polytechnic","BCA"]
    },
    branch : {
        type:String,
        required:true,
        enum:["Mechanical Engineering","Computer Science & Engineering","Electronics & Comunication Engineering", "Aeronotical Engineering","MCA","BCA","Polytechnic"]
    },
    gender : {
        type:String,
        required: true,
    },
    dob:{
        type:Date,
        default:Date.now,
        required: true
    },
    email : {
        type:String,
        required:true,
        unique:[true, "Email id already Registered"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("InValid Email")
            }
        }
    },
    contact_no:{
        type:Number,
        min:10,
        required:true,
        unique:[true,"Mobile No. is already Registered "]
    },
    parent_no:{
        type:Number,
        min:10,
        required:true,
        unique:[true,"Mobile No. is already Registered "]
    },
    blood_group:{
        type:String,
        maxlength:3
    },
    address : {
        type:String,
        required:true
        
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    confirmpassword:{
        type:String,
        required:true,
        minlength:8
    }
})

// create a new model 

const Student = new mongoose.model("Student", studentSchema);

module.exports = Student;