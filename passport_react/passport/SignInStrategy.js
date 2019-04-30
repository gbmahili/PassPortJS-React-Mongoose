const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const SignInStrategy = new Strategy(
    // This is optional: pass data received from the sign up to the call back below:
    {
        passReqToCallback: true,
        usernameField: 'email' // FIXME: must be passed in if username key is not provided
    },
    (req, username, password, done) => {
        const { email } = req.body;
        // console.log("Line 1222",req.body)
        // What do you want to happen after the user signs up?..such as database logic
        // 1. Check if the user already axist, if not sign them up:
        User.findOne({ email }).lean().exec((err, user) => {
            // If there is an error, send the error
            if (err) {
                console.log('.....Error:', err);
                done({ errorMessage: 'There was an error signin in', err }, null)
            }
            // If there is no user, send another error
            if (!user) {
                done({ errorMessage: 'User not found.' }, null)
            }
            //Otherwise, create the user:
            // 1. Check if the provided password matches
            let isPasswordValid = bcrypt.compareSync(password, user.password);
            // 2. if valid, move on
            if(!isPasswordValid) {
                /**
                 * For security reasons (this way hackers don't know what's going on),
                 * send a confusing message...even though we know that the email is valid
                 * but the password did not match...this way the hacker doesn't have to say
                 * that he/she got the right email, now needs to figure out the password only
                 */
                // 
                return done({ errorMessage: 'Email or password not valid' }, null)
            }
            // 3. Finally, send the object if there are no errors:
            delete user.password;
            return done(null, user);
        });
    }
);
module.exports = SignInStrategy;