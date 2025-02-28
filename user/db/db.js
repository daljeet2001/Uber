const mongoose=require('mongoose');


function connectDB(){
    mongoose.connect(process.env.DB_CONNECTION)
    .then(()=>{
        console.log('Connected to user DB');
    })
    .catch((err)=>{
        console.log('Error connecting to user DB',err);
    });
}

module.exports=connectDB;