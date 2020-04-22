const bcrypt = require('bcrypt-node');

exports.saltHash = (password, cb) => {
	bcrypt.genSalt(10, (err, salt) => {
		if (err) { return cb(err); }
		bcrypt.hash(password, salt, null, (err, hash) => {
			if(err) { return cb(err); }
			return hash;

		})
	})
}


exports.compareSaltHashed = function(candidate, hashedPassword, cb){
	bcrypt.compare(candidate, hashedPassword, (err, isMatch) => {
		//if err i have to pass in the err on done.
		//if isMatch i have to return isMatch 
		//one way is to return whatever the value is 
		if (err) { return cb(err); };
		if (!isMatch) { return cb(); };
		cb(null, isMatch);
	})  

}