require('dotenv').config();
const express=require('express');
const app=express();
const cors=require('cors');
const connectDB=require('./db/db');
const userRoutes=require('./routes/user.routes');
const captainRoutes=require('./routes/captain.routes');
const mapRoutes=require('./routes/maps.routes');
const rideRoutes=require('./routes/ride.routes');
const cookieParser = require('cookie-parser');



connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



app.use("/user",userRoutes);
app.use("/captain",captainRoutes);
app.use("/map",mapRoutes);
app.use("/ride",rideRoutes);

app.get('/',(req,res)=>{
    res.send('Hello World');
});

module.exports=app;