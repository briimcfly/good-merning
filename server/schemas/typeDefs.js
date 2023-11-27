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

    type LandLordScore {
        responsiveness: Float
        attitude: Float
        maintenance: Float
        leaseManagement: Float
    }

    type PropertyScore {
        condition: Float
        amenities: Float
        safety: Float
    }

    type AreaScore {
        location: Float
        noiseLevel: Float
        neighborhood: Float
    }

    type FinancialAspects {
        rentFairness: Float
        rentIncreases: Float
        value: Float
    }

    type Review {
        user: User
        address: String
        city: String
        state: String
        postedAt: String
        rating: Float
        landLordScore: LandLordScore
        propertyScore: PropertyScore
        areaScore: AreaScore
        financialAspects: FinancialAspects
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
        reviews(address: String!): [Review]
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
            landLordScore: LandLordScoreInput
            propertyScore: PropertyScoreInput
            areaScore: AreaScoreInput
            financialAspects: FinancialAspectsInput
            ) : Review
    }

    input LandLordScoreInput {
        responsiveness: Int
        attitude: Int
        maintenance: Int
        leaseManagement: Int
    }

    input PropertyScoreInput {
        condition: Int
        amenities: Int
        safety: Int
    }

    input AreaScoreInput {
        location: Int
        noiseLevel: Int
        neighborhood: Int
    }

    input FinancialAspectsInput {
        rentFairness: Int
        rentIncreases: Int
        value: Int
    }
`;

module.exports = typeDefs;