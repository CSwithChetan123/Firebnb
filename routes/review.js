const express = require('express');
const router = express.Router({ mergeParams: true });
const path = require('path');
const listingSchema = require('../module/schema.js');
const mongoose = require('mongoose');
const Review = require('../module/review.js');
const { isLoggIn } = require('../middleware.js');
const reviewController = require('../controllers/reviews.js');


//post reviews
router.post('/', isLoggIn, reviewController.addReview);

//delete reviews
router.delete('/:reviewId', isLoggIn, reviewController.deleteReview);

module.exports = router;