// Require Mongoose
const {Schema, model} = require('mongoose');

const UsersSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true

        },
        email: {
            type: String,
            unique: true,
           // use Regex to validate correct email
           match:[/^([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/] 
        },
        thoughts: [{
            type: Schema.types.ObjectId,
            ref: 'Thoughts'
        }],
        friends: [{
            type: Schema.types.ObjectId,
            ref: 'Users'
        }],
        },
        {
            toJson: {
                virtuals: true,
                getters: true,
            },
            id: false
        }
)

// get total count of friends
UsersSchema.virtual('friendcount').get(funtion() {
    return this.friends.length;
})

//create user model and schema
const Users = model('users', UsersSchema);

//export Users module
module.export = users;