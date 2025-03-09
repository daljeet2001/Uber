require('dotenv').config();
const express=require('express');
const app=express();
const cors=require('cors');
const connectDB=require('./db/db');

// const {subscribeToQueue} = require('./services/rabbit');
// const mapService = require('../maps/services/maps.service');
// const sendMessageToSocketId = require('./socket');

const captainRoutes=require('./routes/captain.routes');

const cookieParser = require('cookie-parser');
const rabbitmq=require('./services/rabbit');
rabbitmq.connect();


connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


// subscribeToQueue('new-ride', async (ride) => {
//     const jsonride=JSON.parse(ride);
//     console.log(jsonride);
  
//     const pickupCoordinates = await mapService.getAddressCoordinate(jsonride.pickup);  
//     console.log(pickupCoordinates);
//     const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2);
//     console.log(captainsInRadius);

//     captainsInRadius.map(captain => {
//         sendMessageToSocketId(captain.socketId, {
//             event: 'new-ride',
//             data: jsonride
//         });
//     });
// });

app.use("/",captainRoutes);


app.get('/',(req,res)=>{
    res.send('Hello World');
});

module.exports=app;