const mongoose = require('mongoose');

const dbConnection =  async () => {
    try {
        await mongoose.connect(process.env.MONGOATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });

        console.log('MongoDB connected');

    } catch (error) {
        console.log('ERROR: ', error);
        throw new Error('An error ocurred while connecting to the database');
    }
};

module.exports = {
    dbConnection
};