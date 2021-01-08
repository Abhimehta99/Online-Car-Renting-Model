const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const session = require('express-session');
const config = require('./config/database');
const Passport = require('./config/passport')(passport);

//models connection
const Person = require("./models/Person");
const Book = require("./models/Book");

//database connection
mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
let db = mongoose.connection;

// Check connection
db.once('open', function () {
    console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function (err) {
    console.log(err);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({
    extended: false
}));

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//public folder
app.use(express.static(path.join(__dirname, 'public')));

//username
app.get('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

//routes
app.get('/', (req, res, next) => {
    res.render('m');
});

app.get('/suv', (req, res) => {
    res.render('suvbook1');
});

app.get('/signup', (req, res) => {
    res.render('form_sign');
});

app.get('/login', (req, res) => {
    res.render('form_login');
});

app.get('/sedan', (req, res) => {
    res.render('sedan');
});

app.get('/hatchback', (req, res) => {
    res.render('hatchback');
});

app.get('/book', (req, res) => {
    res.render('book');
});

app.get('/electric', (req, res) => {
    res.render('ELECTRIC');
});

app.get('/last', (req, res) => {
    res.render('last');
});

//booking form
app.post('/book', (req, res) => {
    const {
        start,
        email,
        name1,
        no,
        dob,
        sdate,
        edate,
        stime,
        etime,
        cars

    } = req.body;
    let errors = [];
    if (!start || !dob || !sdate || !edate || !etime || !etime || !email || !name1 || !no || !cars) {
        console.log('please enter all fields');
        res.render('book')
    } else {
        const newBook = new Book({
            start,
            email,
            name1,
            no,
            dob,
            sdate,
            edate,
            stime,
            etime,
            cars

        });
        newBook.save()
            .then(user => {
                console.log('done');
                res.redirect('/last')
            })
            .catch(err => console.log('error'));
    }
});

//signup form 
app.post('/signup/user', (req, res) => {
    const {
        email,
        name,
        no,
        password1
    } = req.body;
    let errors = [];
    if (!email || !name || !password1 || !no) {
        errors.push(console.log('please enter all fields'));
        res.render('form_sign')
    }
    if (password1.legth < 2) {
        errors.push(console.log('password must be atleast 6 characters'));
    }
    if (errors.legth > 0) {
        res.render('form_sign');
    } else {
        Person.findOne({
            email: email
        }).then(user => {
            if (user) {
                errors.push(console.log('user already exists'));
                res.render('form_sign');
            } else {
                const newUser = new Person({
                    email,
                    name,
                    no,
                    password1
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password1, salt, (err, hash) => {
                        if (err) {
                            console.log('error in password')
                        };
                        newUser.password1 = hash;
                        newUser
                            .save()
                            .then(user => {
                                console.log('submitted')
                                res.redirect('/login');
                            })
                            .catch(err => console.log('error'));
                    });
                });
            }
        });
    }
});


//login form
app.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
    })(req, res, next);
});

app.get('/logout', (req, res) => {
    req.logout();
    console.log('logged out');
    res.redirect('/');
})

//server listen
app.listen(3000, () => {
    console.log('listening to 3000');
});