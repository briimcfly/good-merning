//Import Models 
const {User, Listing} = require('../models');
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
        //Fetch all Listings
        listings: async(_, {city}) => {
            return await Listing.find({
                city: new RegExp(city, 'i'),
                state: new RegExp(state, 'i')
            });
        },
        //Fetch a listing
        listing: async(_, {id}) => {
            return await Listing.findById(id);
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
        addListing: async(_, {address, city, userId, rating, review, images}) => {
            //Find the User by username 
            const user = await User.findOne({userId});
            if(!user) {
                throw new Error('User Not Found');
            }

            const newListing = new Listing({
                address,
                city,
                state,
                user: userId,
                postedAt: new Date().toISOString(),
                rating,
                review,
                images
            })
            return await newListing.save();
        }
    }
};

module.exports = resolvers;