const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbConnection = async () => {
    const MONGO_URI = process.env.MONGODB_URL;
    try {
        await mongoose.connect(MONGO_URI);
        console.log("DB connection established");
    } catch (error) {
        console.log("Error establishing connection with db", error);
        process.exit(1);
    }
}

module.exports = dbConnection;