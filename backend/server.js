const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config() ;
const cors = require("cors") ;
const routes = require("./routes/todoRoutes") 
const authRoutes = require('./routes/auth');
// const todoRoutes = require('./routes/auth');



const app = express() ;
const PORT = process.env.PORT || 5000 ;

//Middleware
app.use(express.json()) ;
app.use(cors());

app.get("/", (req, res)=>{
    res.send("Hello") ;
});

mongoose
.connect(process.env.MONGO_URI)
.then(()=> console.log(`database connected successfully`))
.catch((err)=> console.log(err)) ;

app.use("/api" , routes)
app.use('/api/auth', authRoutes);


app.listen(PORT , ()=>{console.log(`Server started at ${PORT}...`)});
