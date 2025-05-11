const AudioBookRating = require('../models/audioBookRating');
const Audiobook = require('../models/audioBook');

const handleSuccess = (response, status, data) => {
  return response.status(status).json({
    success: true,
    ...data
  });
};

const handleError = (response, status, message) => {
  return response.status(status).json({
    success: false,
    message
  });
};

exports.addRating = async (request, response) => {
  try {
    const { audiobook_id, rating, comment } = request.body;
    const user_id = request.user._id;

    // Check if audiobook exists
    const audiobook = await Audiobook.findById(audiobook_id);
    if (!audiobook) {
      return handleError(response, 404, 'Audiobook not found');
    }

    // Create or update rating
    const ratingData = await AudioBookRating.findOneAndUpdate(
      { audiobook_id, user_id },
      { rating, comment },
      { upsert: true, new: true }
    );

    // Calculate average rating
    const ratings = await AudioBookRating.find({ audiobook_id });
    const averageRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;

    handleSuccess(response, 200, {
      rating: ratingData,
      averageRating: averageRating.toFixed(1),
      totalRatings: ratings.length
    });
  } catch (error) {
    handleError(response, 500, 'Failed to add rating');
  }
};

exports.getRatings = async (request, response) => {
  try {
    const { audiobook_id } = request.params;
    
    const ratings = await AudioBookRating.find({ audiobook_id })
      .populate('user_id', 'username')
      .sort({ createdAt: -1 });

    const averageRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;

    handleSuccess(response, 200, {
      ratings,
      averageRating: averageRating.toFixed(1),
      totalRatings: ratings.length
    });
  } catch (error) {
    handleError(response, 500, 'Failed to fetch ratings');
  }
};

exports.getUserRating = async (request, response) => {
  try {
    const { audiobook_id } = request.params;
    const user_id = request.user._id;

    const rating = await AudioBookRating.findOne({ audiobook_id, user_id });
    
    handleSuccess(response, 200, { rating });
  } catch (error) {
    handleError(response, 500, 'Failed to fetch user rating');
  }
}; 