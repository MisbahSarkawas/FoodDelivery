const config = require('./config');
const mongoose = require('mongoose');
const { DB_URI } = config.db;
const { setupSchema } = require('./../server');

async function connectMongo() {

    try {
        await mongoose.connect(DB_URI)
                .then( () => {
                    console.log('Mongo DB connection successfull...');

                    global.db = mongoose;
                    setupSchema();
                } )
                .catch( err =>console.log('Mongo DB connection error::', err) )
    } catch(err) {
        console.log(err)
    }
}

if ( DB_URI ) {
    connectMongo();
} else {
    console.log("Mongo DB URI not Configured...")
}