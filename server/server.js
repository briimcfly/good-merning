//Dependencies
const express = require('express');
const {ApolloServer} = require('@apollo/server');
const {expressMiddleware} = require('@apollo/server/express4');
const path = require('path');
const {authMiddleware} = require('./utils/auth');
//file management
const multer = require('multer');
const {uploadImageToStorage} = require('./utils/googleCloudStorage')

const upload = multer({
    //hey, keep the file in memory
    storage: multer.memoryStorage(),
    //but also, there's limits
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb
    }
})

//GraphQL TypeDefs and Resolvers dependencies
const {typeDefs, resolvers} = require('./schemas');

//Database configuration
const db = require('./config/connection');

//Server Port: Defaults to 3001 if not set in env variable
const PORT = process.env.PORT || 3001;

//Initialize an Express App
const app = express();

//Initialize an Apollo Server with GraphQL Schema 
const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, // Enables schema introspection
    playground: true, // Enables Playground
})

//Image Upload Endpoint
app.post('/upload-image', upload.single('image'), async(req,res) => {
    try{
        if(!req.file){
            throw new Error('No image being uploaded');
        }
        const imageUrl = await uploadImageToStorage(req.file);
        res.status(200).json({message: 'My Dune, the image has been uploaded!', imageUrl});
    } catch (e) {
        console.error('My Arrakis, Error uploading image:', e);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

//Function to start the Apollo Server & Set Middleware
const startApolloServer = async() => {
    //Start Apollo Server
    await server.start();

    //Parse URL-encoded data and JSON data
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    //Apollo's middleware for 'graphql' endpoint
    app.use('/graphql', expressMiddleware(server, {
        context: authMiddleware
    }));

    //Serve static files in production from dist folder
    if(process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')));

        // Redirect all requests to the client's 'index.html' in production
        app.get('*', (req,res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        })
    }

    //Connect to DB and start Express Server
    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`Good Merning! Server is listening on port ${PORT}!`);
            console.log(`GraphQL Endpoint: http://localhost:${PORT}/graphql`);
        });
    });
};

//Start Apollo Server
startApolloServer();