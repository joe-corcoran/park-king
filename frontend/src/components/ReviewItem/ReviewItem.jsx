// src/components/ReviewItem/ReviewItem.jsx
import React from 'react';
import './ReviewItem.css';

const ReviewItem = ({ review }) => {
  const date = new Date(review.createdAt);
  const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="review-item">
      <h3>{review.User.firstName}</h3>
      <p className="review-date">{monthYear}</p>
      <p>{review.review}</p>
    </div>
  );
};

export default ReviewItem;
