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
mutation AddReview(
  $address: String!,
  $city: String!,
  $state: String!,
  $username: String!,
  $rating: Int!,
  $comment: String!,
  $images: [String],
  $landLordScore: LandLordScoreInput,
  $propertyScore: PropertyScoreInput,
  $areaScore: AreaScoreInput,
  $financialAspects: FinancialAspectsInput
  ) {
  addReview(
    address: $address,
    city: $city,
    state: $state,
    username: $username,
    rating: $rating,
    comment: $comment,
    images: $images,
    landLordScore: $landLordScore,
    propertyScore: $propertyScore,
    areaScore: $areaScore,
    financialAspects: $financialAspects
    ) {
    rating
    comment
    user {
      username
    }
    postedAt
    address
    city
    state
    images
    landLordScore {
      attitude
      leaseManagement
      maintenance
      responsiveness
    }
    propertyScore {
      amenities
      condition
      safety
    }
    areaScore {
      location
      neighborhood
      noiseLevel
    }
    financialAspects {
      rentFairness
      rentIncreases
      value
  }
}
`