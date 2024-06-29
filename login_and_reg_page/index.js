const express = require("express");
const app= express();
const port = 3000;
const path = require("path");

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let accounts =[
    {
        username: "apnacollege",
        password: "12345",
    },
    {
        username: "praveendubey",
        password: "123456",
    },
    {
        username: "aniketyadav",
        password: "1234567",
    }

];

app.get("/login",(req,res)=>{
    res.render("login.ejs");
});

app.get("/registration",(req,res)=>{
    res.render("registration.ejs");
});

app.post("/regdone",(req,res)=>{
    let {username , password} =req.body;
    accounts.push({username,password});
    //console.log(username,password);
    res.render("regdone.ejs");
});

app.post("/home", (req, res) => {
    let { username: bodyusername, password: bodypassword } = req.body;

    // Use a variable to track if the user is found
    let userFound = false;

    for (let account of accounts) {
        if (bodyusername === account.username && bodypassword === account.password) {
            userFound = true;
            break;
        } 
    }

    if (userFound==true) {
        res.render("home.ejs",{bodyusername});
    } else {
        res.send("wrong username or password");
    }
});  


app.listen(port,()=>{
    console.log("port is listening on 3000");
});