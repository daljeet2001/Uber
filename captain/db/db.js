const mongoose=require('mongoose');


function connectDB(){
    mongoose.connect(process.env.DB_CONNECTION)
    .then(()=>{
        console.log('Connected to captain DB');
    })
    .catch((err)=>{
        console.log('Error connecting to captain DB',err);
    });
}

module.exports=connectDB;