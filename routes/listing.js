const express = require('express');
const router = express.Router();
const path = require('path');
const listingSchema = require('../module/schema.js');
const mongoose = require('mongoose');
const { isLoggIn } = require('../middleware.js');
const listingController = require('../controllers/listings.js');

const multer = require('multer')
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage })

// Show all listings
router.get('/', listingController.index);

// Show form to create new listing
router.get('/new', isLoggIn, (req, res) => {
    res.render('new.ejs');
});

// Show single list
router.get('/:id', listingController.showSingle);

// Create new listing
router.post('/', isLoggIn, upload.single('image.url'), listingController.newListing);

// Show form to edit listing
router.get('/:id/edit', isLoggIn, listingController.showListingToEdit);

// Update listing
router.patch('/:id', isLoggIn, upload.single('image.url'), listingController.updateListing);

// Delete listing
router.delete('/:id', isLoggIn, listingController.deleteListing);

module.exports = router;