import { gql } from "@apollo/client";


// GraphQL mutation for user login
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
// GraphQL mutation for adding a new user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_REVIEW = gql`
mutation AddReview( $city: String!, $state: String!, $username: String!, $comment: String!, $landLordScore: LandLordScoreInput, $address: String!, $images: [String], $propertyScore: PropertyScoreInput, $areaScore: AreaScoreInput, $financialAspects: FinancialAspectsInput, $rating: Float) {
  addReview(city: $city, state: $state, username: $username, comment: $comment, landLordScore: $landLordScore, address: $address, images: $images, propertyScore: $propertyScore, areaScore: $areaScore, financialAspects: $financialAspects, rating: $rating) {
    user {
      username
    }
    address
    city
    state
    postedAt
    landLordScore {
      attitude
      leaseManagement
      maintenance
      responsiveness
    }
    comment
    images
    financialAspects {
      rentFairness
      rentIncreases
      value
    }
    areaScore {
      location
      neighborhood
      noiseLevel
    }
    propertyScore {
      amenities
      condition
      safety
    }
    rating
  }
}
`