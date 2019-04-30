const express = require('express');
const router = express.Router();
const passport = require('passport');

// Authenticate a user:

// Using custom call back...best for React since routing is done on the client side
router.post('/signup', (req, res, next) => {

	passport.authenticate('local-signup', (error, user, info) => {
		if (error) {
			return res.status(500).json({
				message: 'OOps, something happened',
				error: error || 'Internal error'
			})
		};
		//  Only required when using persistant login (sessions)
		req.logIn(user, function (err) {
			if (err) {
				return res.status(400).json({
					message: 'Oopps...something happened while signin up'
				})
			}
		});
		delete user.password;
		user.isAuthenticated = true;
		return res.status(200).json({
			message: 'Sign In Successful',
			user
		});
		// Use this code if no sessions being used
		// return res.status(200).json({
		//   message: 'Successull SignUp',
		//   user
		// })
	})(req, res, next)
});

router.post('/signin', function (req, res, next) {
	
	passport.authenticate('local-signin', (error, user, info) => {

		if (error) {
			return res.status(400).json({
				message: 'OOps, something happened while trying to sign you in.',
				error: error || 'Internal error'
			})
		};
		//  Only required when using persistant login (sessions)
		req.logIn(user, function (err) {
			if (err) {
				return res.status(400).json({
					message: 'Oopps...something happened'
				})
			}
			delete user.password;
			user.isAuthenticated = true;
			return res.status(200).json({
				message: 'Sign In Successful',
				user
			});
		});

	})(req, res, next);
});

router.get('/testAnotherRoute', (req, res) => {
	//Retrieve user from sessions using passport
	const user = req.user;
	console.log(user)
	res.json({
		message: 'From Another Route'
	})
});



module.exports = router;
