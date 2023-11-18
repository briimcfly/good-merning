import {gql} from '@apollo/client';

//Get all users
export const QUERY_USERS = gql`
 query getUsers {
    users{
        _id
        username
        email
    }
 }
`

//Fetch a single user by Username
export const QUERY_SINGLE_USER = gql`
query User($username: String!) {
    user(username: $username) {
        username
        email
    }
  }
`

// Fetch Listings with aggregated data
export const QUERY_RENTALS = gql`
query GetRentals($city: String!, $state: String!) {
    rentals(city: $city, state: $state) {
        address
        city
        state
        averageRating
        count
        reviews {
            postedAt
            rating
            comment
            user {
                username
            }
            images
        }
    }
}
`
//Fetch Individual Reviews by Address
export const QUERY_REVIEWS = gql`
query Reviews($address: String!) {
    reviews(address: $address) {
        rating
        user {
          username
        }
        landLordScore {
            responsiveness
            attitude
            maintenance
            leaseManagement
        }
        propertyScore {
            condition
            amenities
            safety
        }
        areaScore {
            location
            noiseLevel
            neighborhood
        }
        financialAspects {
            rentFairness
            rentIncreases
            value
        }
        postedAt
        comment
        images
    }
}
`