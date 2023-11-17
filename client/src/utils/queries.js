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
//Fetch Individual Reviews
export const QUERY_REVIEWS = gql`
query GetReviews($city: String!, $state: String!) {
    reviews(city: $city, state: $state) {
        _id
        address
        city
        state
        user {
            username
        }
        postedAt
        rating
        comment
        images
    }
}
`