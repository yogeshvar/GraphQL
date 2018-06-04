const graphql = require('graphql');
const _ = require('lodash');
const {GraphQLObjectType,GraphQLString,GraphQLSchema} = graphql;

var heros = [
    {name:'Flash',power:'Fastest man'},
    {name:'Thor',power:'Son of Thunder'},
    {name:'Iron man',power:'Not a human'},
]


const Hero = new GraphQLObjectType({
    name: 'Hero',
    fields: () => ({
        id: {type:GraphQLString},
        name: {type:GraphQLString},
        power: {type:GraphQLString}
    })
});

const rootQuery = new GraphQLObjectType({
    name: 'rootQuery',
    fields: {
        hero : {
            type : Hero,
            args : {id : {type:GraphQLString}},
            resolve(root,arguments){
               return _.find(heros,{id: arguments.id})
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: rootQuery
});