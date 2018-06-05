const graphql = require('graphql');
const _ = require('lodash');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt} = graphql;

var heros = [
    {name:'Flash',power:'Fastest man',id:'1',actorId:'1'},
    {name:'Thor',power:'Son of Thunder',id:'2',actorId:'2'},
    {name:'Iron man',power:'Not a human',id:'3',actorId:'3'},
];

var actors = [
    {name:'Grant Gustin',age:'28',id:'1'},
    {name:'Chris Hemsworth',age:'34',id:'2'},
    {name:'Robert Downey, Jr.',age:'53',id:'3'},
]

const Hero = new GraphQLObjectType({
    name: 'Hero',
    fields: () => ({
        id: {type:GraphQLID},
        name: {type:GraphQLString},
        power: {type:GraphQLString},
        actor :{
            type: Actor,
            resolve(root,arguments){
                return _.find(actors,{id:root.actorId})
            }

        }
    })
});

const Actor = new GraphQLObjectType({
    name: 'Actor',
    fields: () => ({
        id: {type:GraphQLID},
        name: {type:GraphQLString},
        age: {type:GraphQLInt}
    })
});

const rootQuery = new GraphQLObjectType({
    name: 'rootQuery',
    fields: {
        hero : {
            type : Hero,
            args : {id : {type:GraphQLID}},
            resolve(root,arguments){
               return _.find(heros,{id: arguments.id})
            }
        },
        actor : {
            type : Actor,
            args : {id: {type:GraphQLID}},
            resolve(root,arguments){
                return _.find(actors,{id: arguments.id})
            }
        }

    }
});

module.exports = new GraphQLSchema({
    query: rootQuery
});