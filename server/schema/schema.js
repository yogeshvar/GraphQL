const graphql = require('graphql');
const _ = require('lodash');
const HeroModel = require('./../../models/Heros');
const ActorModel = require('./../../models/Actors');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt} = graphql;

const Hero = new GraphQLObjectType({
    name: 'Hero',
    fields: () => ({
        id: {type:GraphQLID},
        name: {type:GraphQLString},
        power: {type:GraphQLString},
        actor :{
            type: Actor,
            resolve(root,arguments){
                //return _.find(actors,{id:root.actorId})
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

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addActor: {
            type: Actor,
            args: {
                name: {type:GraphQLString},
                age: {type:GraphQLString},
            },
            resolve(parent,args){
                let actor = new ActorModel({
                    name: args.name,
                    age: args.age
                });
                actor.save();
            }
        }
    }
});

const rootQuery = new GraphQLObjectType({
    name: 'rootQuery',
    fields: {
        hero : {
            type : Hero,
            args : {id : {type:GraphQLID}},
            resolve(root,arguments){
             //  return _.find(heros,{id: arguments.id})
            }
        },
        actor : {
            type : Actor,
            args : {id: {type:GraphQLID}},
            resolve(root,arguments){
             //   return _.find(actors,{id: arguments.id})
            }
        }

    }
});

module.exports = new GraphQLSchema({
    query: rootQuery,
    mutation : mutation
});