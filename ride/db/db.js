const mongoose=require('mongoose');


function connectDB(){
    mongoose.connect(process.env.DB_CONNECTION)
    .then(()=>{
        console.log('Connected to ride DB');
    })
    .catch((err)=>{
        console.log('Error connecting to ride DB',err);
    });
}

module.exports=connectDB;