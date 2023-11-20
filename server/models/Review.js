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
    landLordScore: {
        responsiveness: {
            type: Number,
            min: 1,
            max: 5
        },
        attitude: {
            type: Number,
            min: 1,
            max: 5
        },
        maintenance: {
            type: Number,
            min: 1,
            max: 5
        },
        leaseManagement: {
            type: Number,
            min: 1,
            max: 5
        }
    },
    propertyScore: {
        condition: {
            type: Number,
            min: 1,
            max: 5
        },
        amenities: {
            type: Number,
            min: 1,
            max: 5
        },
        safety: {
            type: Number,
            min: 1,
            max: 5
        }
    },
    areaScore: {
        location: {
            type: Number,
            min: 1,
            max: 5
        },
        noiseLevel: {
            type: Number,
            min: 1,
            max: 5
        },
        neighborhood: {
            type: Number,
            min: 1,
            max: 5
        },
    },
    financialAspects: {
        rentFairness: {
            type: Number,
            min: 1,
            max: 5
        },
        rentIncreases: {
            type: Number,
            min: 1,
            max: 5
        },
        value: {
            type: Number,
            min: 1,
            max: 5
        },
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
const Review = model('Review', reviewSchema);

module.exports = Review;
