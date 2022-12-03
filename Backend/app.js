const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
var cors = require('cors')
const app = express();

//cors refers to the method that allows you to make requests to the server deployed at a different domain
//cross origin resourse sharing  -- CORS

const cors = require('cors');
app.use(cors());   
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors()) 
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

app.delete("/",(req,res)=>{
    
    Task.deleteOne({name:req.body.name},function(err)
    {
        if(err)
           console.log(err);
        else
           res.send("deleted successfully");
    })
})

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