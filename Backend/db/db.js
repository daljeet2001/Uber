const mongoose=require('mongoose');


function connectDB(){
    mongoose.connect(process.env.DB_CONNECTION)
    .then(()=>{
        console.log('Connected to DB');
    })
    .catch((err)=>{
        console.log('Error connecting to DB',err);
    });
}

module.exports=connectDB;