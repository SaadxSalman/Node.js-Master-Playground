const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { encrypt, decrypt } = require('./cryptoUtils');
const User = require('./models/User');
const Secret = require('./models/Secret');
require('dotenv').config();

const app = express();

// DB Connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log('✅ MongoDB Connected'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Passport Config
passport.use(new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username });
    if (!user) return done(null, false);
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? done(null, user) : done(null, false);
}));
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

// Auth Middleware
const ensureAuth = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/login');

// ROUTES
app.get('/register', (req, res) => res.render('register'));
app.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({ username: req.body.username, password: hashedPassword });
    res.redirect('/login');
});

app.get('/login', (req, res) => res.render('login'));
app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));
app.get('/logout', (req, res) => { req.logout(() => res.redirect('/login')); });

// Main Vault (Protected)
app.get('/', ensureAuth, async (req, res) => {
    const secrets = await Secret.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.render('index', { vault: secrets, user: req.user, decryptedItem: null, decryptedText: null });
});

app.post('/encrypt', ensureAuth, async (req, res) => {
    await Secret.create({
        user: req.user._id,
        title: req.body.title,
        encryptedData: encrypt(req.body.secret)
    });
    res.redirect('/');
});

app.post('/decrypt/:id', ensureAuth, async (req, res) => {
    const item = await Secret.findOne({ _id: req.params.id, user: req.user._id });
    const secrets = await Secret.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.render('index', { 
        vault: secrets, 
        user: req.user, 
        decryptedItem: item._id.toString(), 
        decryptedText: decrypt(item.encryptedData) 
    });
});

app.listen(3000, () => console.log('Server on http://localhost:3000'));