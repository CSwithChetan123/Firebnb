const mongoose = require('mongoose');
const listingSchema = require('../module/schema.js');
const initData = require('./data.js');
const User = require('../module/user.js');

main()
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/FireBNB');

}

const initListings = async () => {
    try {
        await listingSchema.deleteMany({});
        //insert object id to owner
        initData.data.forEach(listing => {
            listing.owner = new mongoose.Types.ObjectId('6a2880817593909b081ca20f');
        });

        await listingSchema.insertMany(initData.data);
        console.log('Listings initialized successfully');
        const listings = await listingSchema.find({});
        console.log(listings);
    } catch (err) {
        console.error('Error initializing listings:', err);
    }
};

initListings();

//print all users
// const printAllUsers = async () => {
//     try {
//         const users = await User.find({});
//         console.log(users);
//     } catch (err) {
//         console.error('Error printing users:', err);
//     }
// };

// printAllUsers();

// print all listings
// const printAllListings = async () => {
//     try {
//         const listings = await listingSchema.find({});
//         console.log(listings);
//     } catch (err) {
//         console.error('Error printing listings:', err);
//     }
// };

// printAllListings();

