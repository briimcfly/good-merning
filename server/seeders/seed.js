const db = require('../config/connection');
const {User, Listing} = require('../models'); 
const userSeeds = require('./userSeeds.json');
const listingsSeeds = require('./listingsSeeds.json');
const cleanDB = require('./cleanDB');  

db.once('open', async() => {
    try {
        await cleanDB('User', 'users');
        await cleanDB('Listing', 'listings')

        await User.create(userSeeds);  
        await Listing.create(listingsSeeds);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('The spice must flow! Users and Listings have been seeded!')
    process.exit(0);
})