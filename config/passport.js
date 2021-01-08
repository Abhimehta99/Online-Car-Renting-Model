const LocalStratergy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const Person = require('../models/Person');

module.exports = function (passport) {

    passport.use(new LocalStratergy({
        usernameField: 'email', passwordField: 'password1'
    }, (email, password1, done) => {
        Person.findOne({
            email: email
        }).then(user => {
            if (!user) {
                return done(null, false, console.log('not registered'));
            }
            bcrypt.compare(password1, user.password1, (err, isMatch) => {
                if (err) {
                    console.log(err);
                };
                if (isMatch) {
                    console.log('done')
                    return done(null, user);
                } else {
                    return done(null, false, console.log('not done'));
                }
            });
        })
        .catch(err=>console.log(err));
    })
);

    passport.serializeUser((user, done) => {
        done(null, user.id);
    })
    passport.deserializeUser((id, done) => {
        Person.findById(id, (err, user) => {
            done(err, user);
        });
    });
}