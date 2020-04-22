const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const config = require('../config'); 
const User = require('../models/user');
const saltHash = require('./salt-hash');


const localOpt = {
	usernameField: 'email'} 
//create LocalStrategy 
const localLogin = new LocalStrategy(localOpt, (email, password, done) => {
	//verify the password assigned to the username with the one on DB
	User.findOne({ email: email }, (err, user) => {
		if (err) { return done(err) }
		if (!user) { return done(null, false) }
        // compare using bcrypt:
        // the return from the compare func is async so we go where it lives instead of wating 
    	saltHash.compareSaltHashed(password, user.password, (err, isMatch) => {
    		if (err) { return done(err) }
    		if (!isMatch) { return done(null, false) }
    		return done(null, user);
    	});
	});
});
//bcrypt my passwrod
//verify

//const localLogin = new LocalStrategy(email, bcryptPassword, done){}




const jwtOpt = {
	jwtFromRequest: ExtractJwt.fromHeader('auth'),
	secretOrKey: config.secret
}

const jwtLogin = new JwtStrategy(jwtOpt, function(jwt_payload, done) {
	User.findOne({ _id: jwt_payload.sub }, function(err, user) {
		if(err) {
			return done(err, false);
		}
		if(!user) {
			return done(null, false);

		}
		if(user) {
			done(null, user)
		}
	})	
}); 

passport.use(jwtLogin);
passport.use(localLogin);