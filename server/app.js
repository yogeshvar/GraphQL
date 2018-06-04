const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const _ = require('lodash');
const app = express();

app.use('/graphQl',graphqlHTTP({
 schema,
 graphiql : true
}));

app.listen(4000, function(err){
    if(err){
        console.log("Error in running the server");
    }else{
        console.log("Server listening in 4000");
    }
})