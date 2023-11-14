//Dependencies
const express = require('express');
const {ApolloServer} = require('@apollo/server');
const {expressMiddleware} = require('@apollo/server/express4');
const path = require('path');

//GraphQL TypeDefs and Resolvers
const {typeDefs, resolvers} = require('./schemas');

//Database Connection 
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

//New Apollo Server with GraphQL Schema 
const startApolloServer = async() => {
    await server.start();

    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    app.use('/graphql', expressMiddleware(server, {
        // context: authMiddleware
    }));

    //Production Distrubution 
    if(process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')));

        app.get('*', (req,res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        })
    }

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`Good Merning! Server is listening on port ${PORT}!`);
            console.log(`GraphQL Endpoint: http://localhost:${PORT}/graphql`);
        });
    });
};

//Start Apollo Server
startApolloServer();