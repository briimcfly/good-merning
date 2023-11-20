const db = require('../config/connection');
const {User, Review} = require('../models'); 
const userSeeds = require('./userSeeds.json');
const reviewSeeds = require('./reviewSeeds.json');
const cleanDB = require('./cleanDB');  

db.once('open', async() => {
    try {
        await cleanDB('User', 'users');
        await cleanDB('Review', 'reviews')

        const createdUsers = await User.create(userSeeds);  

        const userMap = createdUsers.reduce((map,user) => {
            map[user.username] = user._id;
            return map;
        }, {});

        const updatedReviewSeeds = reviewSeeds.map(review => {
            return {...review, user: userMap[review.username]}
        });
            
        await Review.create(updatedReviewSeeds);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('The spice must flow! Users and Reviews have been seeded!')
    process.exit(0);
})