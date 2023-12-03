const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.listen(8084, () =>{
    console.log('Server is running!');
    
});

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "server"
});


app.get("/", (req   , res) =>{
    return res.send("From server");
});



app.post("/createAccount", (req,res) => {
    console.log("Gwapo ko")
    const fullName = req.body.fullName;
    const address = req.body.address 
    const phoneNum = req.body.phoneNum
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password 


    db.query("insert into camp_user (camper_fullName,camper_address, camper_phoneNum,camper_username, camper_email, camper_password) values (?,?,?,?,?,?)", 
    [fullName, address, phoneNum, username, email, password], (error, result) => {
        if(error){
            res.send({success: false});
        }
        else {
            res.send ({success: true, result});
        }
    });
    
});

app.post("/Login", (req,res) => {
    console.log("Gwapo ko")
   
    const username = req.body.username;
   
    const password = req.body.password 


    db.query("SELECT * FROM camper_user WHERE `username` = ? AND `password` = ?", 
    [username, password], (error, result) => {
        if(error){
            res.send({success: false});
        }
        else {
            res.send ({success: true, result});
        }
    });
    
});