const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviewModel');
const Booking = require('../models/bookingModel');
const factory = require('./handlerFactory');

exports.getAllReviews = factory.getAll(Review);

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.restrictUser = async (req, res, next) => {
  if (req.body.slug) {
    req.body.tour = (await Tour.findOne({ slug: req.body.slug })).id;
    req.body.slug = undefined;
  }
  const tourID = req.params.tourID || req.body.tour;
  const userID = req.user.id || req.body.user;
  if (!tourID || !userID) {
    return next(new AppError('Invalid request', 400));
  }
  const bookings = await Booking.find({ user: req.user.id });
  const tourIDs = bookings.map((el) => el.tour.id);
  if (!tourIDs.includes(tourID)) {
    return next(new AppError('You can only review tours you have booked', 400));
  }
  const review = await Review.findOne({ tour: tourID, user: userID });
  if (review) {
    return next(new AppError('You have already reviewed this tour', 400));
  }
  next();
};

exports.createReview = factory.createOne(Review);
exports.getReview = factory.getOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
