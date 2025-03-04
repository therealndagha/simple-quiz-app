const mongoose = require('mongoose');

const connectToDB = async()=>{
    try {
          
          await mongoose.connect(process.env.MONGOURI);
          console.log('connected to mongodb successfully');
    } catch (error) {
        console.error('failed to connect to MongoDB', error)
    }
}

module.exports = connectToDB;