const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    // 1. find() is a mongoose method that will 
    //    get a list of all users from MongoDB Atlas db
    // 2. returns a promise in JSON format
    // 3. after it finds, THEN get all the users from db and return in JSON format
    // 4. catch err if errs
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;

    // create new instance of user using 
    // username sent in body of post req
    const newUser = new User({ username });

    // save newly created user to DB
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;