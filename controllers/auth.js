const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

exports.signUp = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	// checking if email and pasword have not a value of null 
	if( !email || !password ) {
		return res.status(422).send({ error: 'Email or password have a value of null '}) 
	}
	//find email in db to see if: 
	User.findOne({ email: email }, (err, existingUser) => {
		if (err) { 
			return next(err) 
		};
		//user exists return a 422 status
		if (existingUser) { return res.status(422).send({ error: 'email exists !' }) }
		//user does not exist , create use and save it to DB
		const user = new User({
			email: email,
			password: password
		});

		const token = genTokenUser(user); 
		//making sure we don't save a new user without generating his token 
		if(!token) { return res.status(422).send({ error: `unhandeled error jwt ${token}` })}
				
		user.save( err => {
			if(err) { return next(err); }
			res.send({ token: token });
		})
	});
} 

exports.signIn = (req, res, next) => {
	res.send(genTokenUser(req.user));
}

exports.premContent = (req, res, next) => {
	res.send({ preminum: true });
}

function genTokenUser(user) {
	const timeStamp = new Date().getTime();
	return jwt.encode({ sub: user._id, iat: timeStamp }, config.secret)
}