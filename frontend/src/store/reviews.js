const SET_REVIEWS = 'reviews/SET_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';

const setReviews = (reviews) => ({
    type: SET_REVIEWS,
    reviews,
  });
  
  const addReview = (review) => ({
    type: ADD_REVIEW,
    review,
  });
  
  import { csrfFetch } from './csrf';

export const getReviewsBySpotId = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const data = await response.json();
    dispatch(setReviews(data.Reviews));
  } else {
    // Handle errors
  }
};

// For future use: Adding a new review
export const createReview = (spotId, reviewData) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(addReview(data));
    return data;
  } else {
    // Handle errors
  }
};

const initialState = {
    spotReviews: {},
  };
  
  const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_REVIEWS: {
        const newState = { ...state, spotReviews: {} };
        action.reviews.forEach((review) => {
          newState.spotReviews[review.id] = review;
        });
        return newState;
      }
      case ADD_REVIEW: {
        return {
          ...state,
          spotReviews: {
            ...state.spotReviews,
            [action.review.id]: action.review,
          },
        };
      }
      default:
        return state;
    }
  };
  
  export default reviewsReducer;
  