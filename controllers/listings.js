const listingSchema = require('../module/schema.js');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

module.exports.index = async (req, res) => {
    const listings = await listingSchema.find({});
    res.render('index.ejs', { listings });
};

module.exports.showSingle = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send("Invalid Listing ID");
    }

    const singleListing = await listingSchema.findById(req.params.id).populate('reviews').populate('owner');
    if (!singleListing) {
        req.flash('error', 'Listing not found');
        return res.redirect('/listings');

    };
    //current login username
    res.locals.currentUser = req.user;
    res.render('show.ejs', { listing: singleListing });
};

module.exports.newListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;

    const listing = new listingSchema(req.body);
    listing.image = { url, filename };
    listing.owner = req.user._id;
    await listing.save();
    req.flash('success', 'New listing added successfully');
    res.redirect('/listings');

    // const listing = req.file;
    // res.send(listing);

};

module.exports.showListingToEdit = async (req, res) => {
    const listing = await listingSchema.findById(req.params.id);
    res.render('edit.ejs', { listing }); // Removed .ejs
};

module.exports.updateListing = async (req, res) => {

    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        let listing = await listingSchema.findByIdAndUpdate(req.params.id, { ...req.body, image: { url, filename } }, { new: true });
        req.flash('success', 'Listing updated successfully');
        res.redirect(`/listings/${listing._id}`);

    } else {
        let listing = await listingSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
        req.flash('success', 'Listing updated successfully');
        res.redirect(`/listings/${listing._id}`);
    }


    // let listing = req.file;
    // res.send(listing);

};

// module.exports.updateListing = async (req, res) => {
//     const listing = await listingSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.redirect(`/listings/${listing._id}`);
// };

module.exports.deleteListing = async (req, res) => {
    await listingSchema.findByIdAndDelete(req.params.id);
    req.flash('success', 'Listing deleted successfully');
    res.redirect('/listings');
};