//Import Models 
const {User} = require('../models');
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
        }
    }
};

module.exports = resolvers;