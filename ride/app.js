require('dotenv').config();
const express=require('express');
const app=express();
const cors=require('cors');
const connectDB=require('./db/db');


// const mapRoutes=require('./routes/maps.routes');
const rideRoutes=require('./routes/ride.routes');
const cookieParser = require('cookie-parser');



connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());




// app.use("/map",mapRoutes);
app.use("/",rideRoutes);

app.get('/',(req,res)=>{
    res.send('Hello World');
});

module.exports=app;