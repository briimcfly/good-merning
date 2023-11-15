//Import GraphQL's error handling 
const {GraphQLError} = require('graphql');
//Import JWT for JSON Web Tokens
const jwt = require('jsonwebtoken');

//Define secret key for JWT and set the expiration time for tokens 
const secret = 'mysecretssshhhhhhh';
const expiration = '1h';

module.exports = {
    //Custom error for authentication issues 
    AuthenticationError: new GraphQLError('Error while Authenticating User', {
        extensions: {code: 'UNAUTHENTICATED'}
    }),
    //Middleware for authenticating users with JWT 
    authMiddleware: function({req}) {
        //Attempt to retrieve token from header, query, or body
        let token = req.body.token || req.query.token || req.headers.authorization;
        //If token is in the headers, extract it from the 'Bearer' string
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        //If no token, return request as is 
        if (!token) {
            return req;
        }

        try {
            //Verify token using secret key and expiration time
            const {authenticatedUser} = jwt.verify(token, secret, {maxAge: expiration});
            //Attach the authenticated users info to the request
            req.user = authenticatedUser;
        } catch {
            //Error message for bad token 
            console.log('Whoops, thats an invalid token!')
        }
        //Return the modified request 
        return req;
    },
    //Sign new JWT for a user 
    signToken: function({email, username, _id}){
        //Payload with users email, username, and ID 
        const payload = {email, username, _id};
        //Sign the JWT with the payload, secret, and expiration. 
        return jwt.sign({authenticatedUser: payload}, secret, {expiresIn: expiration});
    }
}
