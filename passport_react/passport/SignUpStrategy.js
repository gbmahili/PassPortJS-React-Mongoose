const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const SignUpStrategy = new Strategy(
    // This is optional: pass data received from the sign up to the call back below:
    { 
        passReqToCallback: true, 
        usernameField: 'email' // FIXME: must be passed in if username key is not provided
    },
    (req, username, password, done) => {
        const { name, email, bio } = req.body;
        // What do you want to happen after the user signs up?..such as database logic
        // 1. Check if the user already axist, if not sign them up:
        User.findOne({ email }).lean().exec( (err, user) => {
            // If there is an error, send the error
            if (err) {
                return done({ errorMessage: 'There was an error signin up', err }, null)
            }
            // If there is a user already, send another error
            if (user) {
                return done({ errorMessage: 'User already exist' }, null)
            }
            //Otherwise, create the user:
            // 1. generate a salt so the password is encrypted
            let salt = bcrypt.genSaltSync(10);
            // 2. encrypt the password with the salt
            const encryptedPassword = bcrypt.hashSync(password, salt);
            // 3. Create the new user using the mongoose model
            let newUser = new User({ email, password: encryptedPassword, name, bio });
            // 4. Send the user to the dabase
            newUser.save((err, results) => {
                if (err) {
                    return done({ errorMessage: 'There was an error signin up', err }, null)
                }
                // If there was no error creating a user, send the response to the backend
                // the done function accesspts an error, and some object to send back
                // So, done(error, object)...since we have no error, null is the value to send
                delete results.password;//delete the password from the results before sending it
                done(null, results);
            });
        });
    }
);
module.exports = SignUpStrategy;