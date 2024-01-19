// import mongoose
const mongoose = require('mongoose');
// load local variables
if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
async function connectToDB(){
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to the database");
    } catch (error) {
        console.log("Error connecting to the database" , error);
    }
    
}

module.exports = connectToDB;