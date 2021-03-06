// server.js
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('./data/schema');
const jwt = require("express-jwt");
require("dotenv").config();
const PORT = 3000;
// Create our express app
const app = express();
// Graphql endpoint
app.use('/api', bodyParser.json(), jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false,
}), graphqlExpress(req => ({
    schema,
    context: {
        authUser: req.user
    }
})));
// Graphiql for testing the API out
app.use('/graphiql', graphiqlExpress({ endpointURL: 'api' }));
app.listen(PORT, () => {
    console.log(`GraphiQL is running on http://localhost:${PORT}/graphiql`);
});