const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    images: {
        type: [String],
        default: []
    },
    comment: {
        type: String,
        required: true
    }
});

//Create the Listing model using schema 
const Listing = model('Review', reviewSchema);

module.exports = Listing;
