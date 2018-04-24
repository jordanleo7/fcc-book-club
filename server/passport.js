const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('./User');

passport.serializeUser((user, done) => {
	done(null, user.id)
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy({
		// options for the google strategy 
		// process.env.APP_URL + 
		callbackURL: '/auth/google/redirect',
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET
	}, (accessToken, refreshToken, profile, done) => {
		// passport callback function
		// check if user already exists
		User.findOne({googleId: profile.id}).then((currentUser) => {
			if (currentUser) {
				// If found
				console.log('Signed in as: ', currentUser, 'g profile:', profile);
				done(null, currentUser);
			} else {
				// If not, create user
				new User({
          googleId: profile.id,
          username: profile.displayName,
          givenName: profile.name.givenName,
          familyName: profile.name.familyName
				}).save().then((newUser) => {
					console.log('new user created: ' + newUser);
					done(null, newUser);
				});
			}
		})

	})

)