const mongoose = require('mongoose');
const bcrypt = require('bcrypt-node');

const Schema = mongoose.Schema; 

//define the user schema 
const userSchema = new Schema({
	email: {
			type: String,
			unique: true,
			lowercase: true
	},

	password: String
})

//Encrypting password middleware
userSchema.pre('save', function (next) { 
	const user = this; 
	bcrypt.genSalt(10, (err, salt) => {
		if (err) { return next(err); }
		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if (err) { return next(err); }
			user.password = hash;
			next();
		})
	})
})


// create the model class for users and export

const ModelClass =  mongoose.model('user', userSchema);



module.exports = ModelClass;