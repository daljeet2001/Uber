require('dotenv').config();
const express=require('express');
const app=express();
const cors=require('cors');
const connectDB=require('./db/db');

const captainRoutes=require('./routes/captain.routes');

const cookieParser = require('cookie-parser');



connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());




app.use("/",captainRoutes);


app.get('/',(req,res)=>{
    res.send('Hello World');
});

module.exports=app;