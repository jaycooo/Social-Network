// Require Thoughts and Users Models
const {Thoughts, users} = require('../models');

// Set up thoughts contoller
const thoughtsController = {

    // Create a new thought
    createThoughts({params,body}, res) {
        Thoughts.create(body)
        .then(({_id}) => {
            return users.findoneandUpdate({_id: params.userID}, {$push: {thoughts:_id}}, {new: true});
        })
        .then(dbThoughtsData => {
            if(!dbthoughtsdata => {
                res.status(404).json({message: 'No thoughts with this particular ID!'});
                return;
            }
            res.json(dbThoughtsData)
})
.catch(err => res.json(err));
    },

    // Get all available Thoughts
    getAllThoughts(req,res) {
        Thoughts.find({})
        .populate({path: 'reactions', select:'-__v'})
        .select('-_V')
        //. sort({_id: -1})
        .then(dbthoughtsdata => res.json(dbthoughtsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // get a certain thought by ID
    getAllThoughts(req,res) {
        Thoughts.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-_v')
        .then(dbthoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({message: 'No thoughts with this particular ID '});
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // update a current thought by ID
    updateThoughts({params,body}, res) {
        Thoughts.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => {
            if (!dbthoughtData) {
                res.status(404).json({message: 'No thoughts associated with this ID'});
                return;

            }
               res.json(dbthoughtsdata);
    })
    .catch(err => res.json(err));
},

// delete current thought by ID
deleteThoughts({params}, res) {
    Thoughts.findOneAndDelete({_id: params.id})
    .then(dbThoughtsData =>{
        if (!dbThoughtsData) => {
            res.status(404).json({message: 'no thoughts with this particular id!'});
            return;
        },
        res.json(dbThoughtsData);
    })
    .catch(err => res.status(400).json(err));
},
// Delete a reaction by ID
deletereaction (params}, res) {
    thoughts.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions:{reactionId}}}, {new: true})
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.status(404).json({message: 'not thoughts with this ID!'});
            return;
        }
        res.json(dbThoughtsData);
    })
    .catch(err => res.status(400).json(err));    
};


// export module thought contoller
module.exports = thoughtsController;

    }
        })
    },
}