// src/components/SpotDetails/SpotDetails.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotDetails } from '../../store/spots';
import './SpotDetails.css';

const SpotDetails = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const spot = useSelector((state) => state.spots.singleSpot);
  const user = useSelector((state) => state.session.user);

  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    dispatch(getSpotDetails(spotId))
      .then(() => setIsLoaded(true))
      .catch((err) => {
        // Handle errors, e.g., set an error state
      });
  }, [dispatch, spotId]);

  if (!isLoaded) return <div>Loading...</div>;

  if (!spot.id) return <div>Spot not found</div>;

  return (
    <div className="spot-details">
      <h1>{spot.name}</h1>
      <div className="spot-location">
        {spot.city}, {spot.state}, {spot.country}
      </div>

      <div className="spot-images">
        {spot.SpotImages && spot.SpotImages.length > 0 ? (
          <>
            <div className="main-image">
              <img src={spot.SpotImages[0].url} alt={spot.name} />
            </div>
            <div className="thumbnail-images">
              {spot.SpotImages.slice(1, 5).map((image, idx) => (
                <img key={idx} src={image.url} alt={`${spot.name} ${idx + 1}`} />
              ))}
            </div>
          </>
        ) : (
          <div>No images available</div>
        )}
      </div>

      <div className="spot-info">
        <div className="spot-host">
          <h2>
            Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
          </h2>
          <p>{spot.description}</p>
        </div>
        <div className="spot-callout">
          <div className="price">${spot.price} / night</div>
          <div className="reserve-button" onClick={() => alert('Feature coming soon')}>
            Reserve
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotDetails;
