//require mongoose and moment
const {schema, model, types} = require('mongoose');
const moment = require('moment');

//reactionSchema
const ReactionSchema = new Schema(
    {
        // set custom id
        reactionId: {
            type: schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 200
        },
        username: {
            type:String
            required: true
        },
        createdAt: {
            type: Date
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

//Thought Schema
const ThoughtsSchema = new Schema (



    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        
       
        username: {
            type:String
            required: true
        },
        createdAt: {
            type: Date
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String
            required: true
        },
        //user ReactionSchema to validate data
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

//get total count of reactions
const Thoughts = model('thoughts', ThoughtsSchema);

//export thoughts module
module.exports = Thoughts;