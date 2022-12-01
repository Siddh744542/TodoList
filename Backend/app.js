const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/TodoListDB");

const taskSchema = {
    name : {
     type: String,
    required:[true,"no item specified"]
    }
};
  
const Task =  mongoose.model("Task", taskSchema);
  
app.get("/",(req,res)=>{
    Task.find(function(err,tasks){
        if(err){
            console.log(err);
        } else {
            res.send(tasks);
        }
    });
});

app.post("/",(req,res)=>{
    const newTask = new Task({
        name:req.body.name
    })
    newTask.save(function(err,result){
        if (err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})

app.listen(7000,()=>{
    console.log("Server has started succesfully");
})