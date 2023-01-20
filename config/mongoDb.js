const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

const connectDB = async() =>{
    try {
        await mongoose.set('strictQuery', true);
        await mongoose.connect(db)
        console.log('MongoDB connected...')
    } catch (error) {
        console.error(error.message);

        // exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB