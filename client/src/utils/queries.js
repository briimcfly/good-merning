import {ggl} from '@apollo/client';

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
export const QUERY_SINGLE_USER = ggl`
query User($username: String!) {
    user(username: $username) {
        username
        email
    }
  }
`