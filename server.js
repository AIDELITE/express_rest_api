const express = require('express');
const cors = require("cors");

const app =express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hi");
})
app.listen(3000,()=>{
console.log("Server listening in http://localhost:3000")
})