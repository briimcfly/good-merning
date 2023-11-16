const db = require('../config/connection');
const {User, Listing} = require('../models'); 
const userSeeds = require('./userSeeds.json');
const listingsSeeds = require('./listingsSeeds.json');
const cleanDB = require('./cleanDB');  

db.once('open', async() => {
    try {
        await cleanDB('User', 'users');
        await cleanDB('Listing', 'listings')

        const createdUsers = await User.create(userSeeds);  

        const userMap = createdUsers.reduce((map,user) => {
            map[user.username] = user._id;
            return map;
        }, {});

        const updatedListingSeeds = listingsSeeds.map(listing => {
            return {...listing, user: userMap[listing.username]}
        });
            
        await Listing.create(updatedListingSeeds);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('The spice must flow! Users and Listings have been seeded!')
    process.exit(0);
})