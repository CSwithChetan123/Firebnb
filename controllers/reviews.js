const listingSchema = require('../module/schema.js');
const mongoose = require('mongoose');
const Review = require('../module/review.js');


module.exports.addReview = async (req, res) => {
    const listing = await listingSchema.findById(req.params.id);
    const review = new Review(req.body);
    listing.reviews.push(review);
    await review.save();
    await listing.save();
    req.flash('success', 'New review added successfully');
    res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await listingSchema.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review deleted successfully');
    res.redirect(`/listings/${id}`);
};