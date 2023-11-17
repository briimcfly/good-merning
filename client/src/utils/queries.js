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
export const QUERY_LISTINGS = gql`
query GetListings($city: String!, $state: String!) {
    listings(city: $city, state: $state) {
        address
        city
        state
        averageRating
        count
        reviews {
            postedAt
            rating
            review
            user {
                username
            }
            images
        }
    }
}
`