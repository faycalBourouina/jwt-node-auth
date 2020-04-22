const authentication = require('./controllers/auth');
const passport = require('passport'); 
const passportService = require('./services/passport-config');

const requireLogin = passport.authenticate('local', { session : false });
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = app => {
	app.post('/signup', authentication.signUp);
	app.post('/signin', requireLogin, authentication.signIn);
	app.get('/preminum', requireAuth, authentication.premContent);
}