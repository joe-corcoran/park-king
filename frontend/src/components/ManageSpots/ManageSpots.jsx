// src/components/ManageSpots/ManageSpots.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserSpots, deleteSpot } from '../../store/spots'; // Ensure deleteSpot is imported
import { Link, useNavigate } from 'react-router-dom'; // Replace useHistory with useNavigate
import './ManageSpots.css';

const ManageSpots = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const spotsObj = useSelector((state) => state.spots.userSpots);
  const spots = Object.values(spotsObj);

  useEffect(() => {
    dispatch(getCurrentUserSpots());
  }, [dispatch]);

  const handleUpdate = (spotId) => {
    navigate(`/spots/${spotId}/edit`);
  };

  const handleDelete = (spotId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this spot?');
    if (confirmDelete) {
      dispatch(deleteSpot(spotId)).then(() => {
        // Optionally, you can refresh the spots list
        dispatch(getCurrentUserSpots());
      });
    }
  };

  return (
    <div className="manage-spots">
      <h1>Manage Your Spots</h1>
      <Link to="/spots/new">
        <button className="create-spot-button">Create a New Spot</button>
      </Link>
      {spots.length === 0 ? (
        <p>You have no spots yet.</p>
      ) : (
        <div className="spots-list">
          {spots.map((spot) => (
            <div key={spot.id} className="spot-card">
              <Link to={`/spots/${spot.id}`}>
                <img src={spot.previewImage} alt={spot.name} />
              </Link>
              <div className="spot-info">
                <h3>{spot.name}</h3>
                <p>
                  {spot.city}, {spot.state}
                </p>
                <p>${spot.price} / night</p>
              </div>
              <div className="spot-actions">
                <button onClick={() => handleUpdate(spot.id)}>Update</button>
                <button onClick={() => handleDelete(spot.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageSpots;
