//Import Models 
const {User, Review} = require('../models');
//Import Utilities 
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    //Query Resolvers 
    Query: {
        //Fetch all Users 
        users: async () => {
            return User.find();
        },
        //Fetch single user by Username 
        user: async (parent, {username}) => {
            return User.findOne({username});
        },
        //Fetch the current authenticated user 
        me: async(parent, args, context) => {
            if(context.user){
                return User.findOne({_id: context.user._id});
            }
            throw AuthenticationError;
        },
        reviews: async (_, { address }) => {
            try {
                return await Review.find({ 
                    address: new RegExp(address, 'i') 
                }).populate('user');
            } catch (e) {
                console.error('Error fetching reviews:', e);
                throw new Error('Failed to fetch reviews');
            }
        },
        //Fetch all Rentals
        rentals: async(_, {city, state}) => {
            try {
                const rentals = await Review.aggregate([
                    {
                        $match: {
                            city: new RegExp(city, 'i'),
                            state: new RegExp(state,'i')
                        }
                    },
                    {
                        $group: {
                            _id: '$address',
                            city: {$first: '$city'},
                            state: {$first: '$state'},
                            averageRating: { $avg: '$rating' },
                            reviews: { $push: '$$ROOT' },
                            count: { $sum: 1 }
                        }
                    },
                    {$sort: {_id:1}}
                ]);
                return rentals.map(rental=> ({
                    address: rental._id,
                    city: rental.city,
                    state: rental.state,
                    averageRating: rental.averageRating,
                    reviews: rental.reviews,
                    count: rental.count
                }))

            } catch (e){
                console.error(e);
                throw new Error('Error fetching listings')
            }
        }
    },

    //Mutation Resolvers 
    Mutation: {
        //Create a new user 
        addUser: async(parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);
            return {token, user};
        },
        //Authenticate a user 
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if(!user){
                throw AuthenticationError;
            }

            const token = signToken(user);

            return {token, user};
        },
        //Add a listing
        addReview: async (_, { address, city, state, username, rating, comment, images }) => {
            // Find the User by username
            const user = await User.findOne({ username });
            if (!user) {
                throw new Error('User Not Found');
            }
        
            const newReview = new Review({
                address,
                city,
                state,
                user: user._id,
                postedAt: new Date().toISOString(),
                rating,
                comment,
                images
            });
        
            return await newReview.save();
        }
    }
};

module.exports = resolvers;