// src/components/ReviewsList/ReviewsList.jsx

import React from 'react';
import { useSelector } from 'react-redux';
import ReviewItem from '../ReviewItem/ReviewItem';
import './ReviewsList.css';

const ReviewsList = ({ spot, user }) => {
  const reviewsObject = useSelector((state) => state.reviews.spotReviews);
  const reviews = Object.values(reviewsObject).reverse(); 

  if (!reviews.length) {
    return (
      <div>
        {user && user.id !== spot.ownerId ? (
          <p>Be the first to post a review!</p>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    );
  }

  return (
    <div className="reviews-list">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewsList;
