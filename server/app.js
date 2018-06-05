const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const _ = require('lodash');
const app = express();
const mongoose = require('mongoose');

mongoose.connect("mongodb://maggie:maggie123@ds149960.mlab.com:49960/graphql");
mongoose.connection.once('open',() =>{
    console.log('Connected to DB-Mongo')
})

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