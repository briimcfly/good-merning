//GraphQL type definitions 

const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        password: String
    }

    type Rental {
        _id: ID
        address: String
        city: String
        state: String
        averageRating: Float
        count: Int
        reviews: [Review!]
    }

    type Review {
        user: User
        postedAt: String
        rating: Float
        comment: String
        images: [String]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        # Return an array of user types 
        users: [User]
        # Returns a single user based on provided username 
        user(username: String!): User
        # Returns the currently authenticated user 
        me: User

        rentals(city: String!, state: String!): [Rental]
        review(id: ID!): Review
    }

    type Mutation {
        # Create new User 
        addUser(username: String!, email: String!, password: String!): Auth

        # Authenticate user with email and password for login 
        login(email: String!, password: String!): Auth

        addReview(
            address: String!
            city: String!
            state: String!
            username: String!
            rating: Int!
            comment: String!
            images: [String]
            ) : Review
    }
`;

module.exports = typeDefs;