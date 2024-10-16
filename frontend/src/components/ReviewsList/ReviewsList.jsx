// src/components/ReviewsList/ReviewsList.jsx
import React from 'react';
import ReviewItem from '../ReviewItem/ReviewItem';
import './ReviewsList.css';

const ReviewsList = ({ reviews, spot, user }) => {
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
