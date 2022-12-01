const express = require('express');
const mongoose = require('mongoose');
const app = express();



app.get("/",(req,res)=>{
    res.send("server made successfully")
});

app.listen(7000,()=>{
    console.log("started at 7000");
})