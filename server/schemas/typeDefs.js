//GraphQL type definitions 

const typeDefs = `
    # User: Id, Username, Email, & Password 
    type User {
        _id: ID
        username: String
        email: String
        password: String
    }

    # Listings
    type Listing {
        _id: ID
        address: String!
        city: String!
        state: String!
        username: String!
        rating: Int!
        postedAt: String
        review: String!
        images: [String]
    }

    # Authentication: Includes token and user object
    type Auth {
        token: ID!
        user: User
    }

    # Root Query/Endpoint 
    type Query {
        # Return an array of user types 
        users: [User]
        # Returns a single user based on provided username 
        user(username: String!): User
        # Returns the currently authenticated user 
        me: User

        #Listings
        listings(city: String!): [Listing]
        listing(id: ID!): Listing
    }

    type Mutation {
        # Create new User 
        addUser(username: String!, email: String!, password: String!): Auth

        # Authenticate user with email and password for login 
        login(email: String!, password: String!): Auth

        # Listing 
        addListing(
            address: String!
            city: String!
            state: String!
            username: String!
            rating: Int!
            review: String!
            images [String]
            ) : Listing
    }
`;

module.exports = typeDefs;