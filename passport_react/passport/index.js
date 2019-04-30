// Other examples are here: https://github.com/accimeesterlin/passport-examples.git
const passport = require('passport');
const User = require('../models/user');

// Serialize must be used if sessions will be used
passport.serializeUser((user, done) => {
    done(null, user.email);
});
passport.deserializeUser((email, done) => {
    User.findOne({ email }, (err, user) => {
        done(err, user);// makes the user available on the req.
    })
});
// Bring in all Strategies from their folders:
const SignInStrategy = require('./SignInStrategy');
const SignUpStrategy = require('./SignUpStrategy');
// const GoogleStrategy = require('./GoogleStrategy');
// const GitHubStrategy = require('./GitHubStrategy');

// Register each strategy:
passport.use('local-signin', SignInStrategy);
passport.use('local-signup', SignUpStrategy);

// Export the entire passport which contains each strategy
module.exports = passport;