//require users model
const {users} = require('.. /models');

// set up Users Controller
const usersController = {
    
    //create  a new User
    createUsers({body}, res) {
        users.create(body)
        .then(dbuserdata => res.json(dbuserdata))
        .catch(err => res.status(400).json(err));
    },


    //get All Users
    getAllUsers(req,res) {
        users.find ({})
        //populate users thoughts
        .populate({path: 'thoughts', select: '-__v'})
        // populate users friends
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        // .sort ({_id: -1})
        .then(dbuserdata => res.json(dbusersData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // get a single user by ID
    getUsersbyId({params}, res) {
        users.findone({_id: params.id})
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        //return if no user found
        .then(dbusersData => {
            if(!dbUserData) {
                res.status(404).json({message: 'no user with this particular ID'});
                return;
            }
            res.json(dbUsersData)
        })
    },

    //update a current user by ID
    updateUsers({params, body}, res) {
        users.findOneAndUpdate({_id: params.id}, body, {new:true, runValidators: true})
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'no user with this particular ID'});
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.json(err));
    },
    deleteUsers({params}, res) {
        users.findOneAndDelete({_id: params.id})
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'no user with this particular ID'});
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.status(400).json(err));

    },

    //delete a current user by ID
    addFriend({params}, res) {
        users.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new:true})
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then(dbUsersData) => {
            if(!dbUsersData) {
                res.status(404).json({'no user with this particular Id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    //delete a current friend
    DeleteFriend({params}, res) {
        users.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new:true})
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then(dbUsersData) => {
            if(!dbUsersData) {
                res.status(404).json({'no user with this particular Id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    }

};

//export module users controller
module.exports = usersController;