const express = require("express");
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcrypt");
const app = express();
require("./db/conn");

const Student = require("./models/signup");


const port = process.env.PORT || 3000;

const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
  

app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/signup",(req,res)=>{
    res.render("signup");
})

// create new student
app.post("/signup",async(req,res)=>{
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if(password ===  cpassword){
            const signupStudents = new Student({
                fullname : req.body.fullname,
                fathername : req.body.fathername,
                course : req.body.course,
                branch : req.body.branch,
                gender : req.body.gender,
                dob : req.body.dob,
                email : req.body.email,
                contact_no : req.body.contact_no,
                parent_no : req.body.parent_no,
                blood_group : req.body.blood_group,
                address : req.body.address,
                password : password,
                confirmpassword : cpassword
            })          
            
           const signedup =  await signupStudents.save();
            res.status(201).render("index");
        }else{
            res.send("password are not matching");
        }
    }catch(error){
        res.status(400).send(error);
    }
})


// login 
app.post("/login", async (req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        const usermail = await Student.findOne({email:email});
        
        const isMatch = await bcrypt.compare(password, usermail.password);
        
        if(isMatch){
            res.send(201).render("index"); 
        }else{
            res.send("invalid login details");
        }

    }catch(err){
        res.status(400).send("invalid login details")
    }
})

app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
})