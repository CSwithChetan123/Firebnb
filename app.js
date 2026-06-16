// Bypass ISP/Network blocking of MongoDB connection by forcing Google's Public DNS
require('dns').setServers(['8.8.8.8', '8.8.4.4']);

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}


const express = require('express');
const app = express();
const PORT = 3000;
const dbUrl = process.env.ATLASDB_URL;
const mongoose = require('mongoose');
const path = require('path');
const listingSchema = require('./module/schema.js');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const Review = require('./module/review.js');

const session = require('express-session');
const connectMongo = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./module/user.js');
const passportLocalMongoose = require('passport-local-mongoose');


const listingRouter = require('./routes/listing.js');
const reviewsRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');
const secret = process.env.SECRET;



// View Engine Setup
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

main()
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUrl);
}

// Handle ES Module default export (newer versions of connect-mongo)
const MongoStore = connectMongo.default || connectMongo;

let store;
// Check if the installed version is v3 or older (exports a factory function)
if (typeof MongoStore === 'function' && !MongoStore.create) {
    const LegacyStore = MongoStore(session);
    store = new LegacyStore({
        url: dbUrl,
        touchAfter: 24 * 60 * 60,
        secret: secret
    });
} else {
    // Otherwise, use the v4+ syntax
    store = MongoStore.create({
        mongoUrl: dbUrl,
        touchAfter: 24 * 60 * 60,
        crypto: {
            secret: secret
        }
    });
}


store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e);
});

// const MongoStore = connectMongo(session);
// const store = MongoStore.create({
//     mongoUrl: dbUrl,
//     touchAfter: 24 * 60 * 60,
//     crypto: {
//         secret: 'keyboard cat'
//     }
// });

// store.on("error", function (e) {
//     console.log("SESSION STORE ERROR", e);
// });


const sessionOption = {
    store: store,
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }

};





app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();

});

app.get("/demouser", async (req, res) => {
    let fakeUser = new User({
        email: "newuser@gmail.com",
        username: "delta-student"
    });

    let registerUser = await User.register(fakeUser, "password");
    res.send(registerUser);

});

app.use('/listings', listingRouter);
app.use('/listings/:id/reviews', reviewsRouter);
app.use('/', userRouter);

// Root route redirect to listings
app.get('/', (req, res) => {
    res.redirect('/listings');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
