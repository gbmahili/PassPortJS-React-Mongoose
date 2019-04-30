const express = require('express');
const cookieSession = require('cookie-session');
const logger = require('morgan');
const PORT = process.env.PORT || 8080;
const log = console.log;
const passport = require('./passport');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost/passport_auth2', { useNewUrlParser: true })

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Sesions: Must come before the routes
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // one day in milliseconds
    name:'session',
    keys:['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());
// Routes
app.use('/', indexRouter);
app.use('/authentication', usersRouter);

app.listen(PORT, () => log(`Server is running on port ${PORT}`));