const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/good-merning-db')
.then(() => console.log("Rad! You're connected to MongoDB."))
.catch(err => console.error("Try starting Compass, You're not connecting to MongoDB :(", err));

module.exports = mongoose.connection;
