// src/components/SpotForm/SpotForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { createSpot } from '../../store/spots';
import './SpotForm.css';

const SpotForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate
  const sessionUser = useSelector((state) => state.session.user);

  // Form state
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState(''); // Renamed to avoid conflict with 'state'
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [imageUrls, setImageUrls] = useState(['', '', '', '']);

  // Error state
  const [errors, setErrors] = useState([]);

  if (!sessionUser) {
    navigate('/'); // Use navigate instead of history.push
    return null; // Return null to prevent rendering
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const validationErrors = [];
    if (!country) validationErrors.push('Country is required');
    if (!address) validationErrors.push('Address is required');
    if (!city) validationErrors.push('City is required');
    if (!stateName) validationErrors.push('State is required');
    if (!description || description.length < 30)
      validationErrors.push('Description needs a minimum of 30 characters');
    if (!name) validationErrors.push('Name is required');
    if (!price || isNaN(price)) validationErrors.push('Price per night is required');
    if (!previewImage || !isValidUrl(previewImage))
      validationErrors.push('Preview Image URL is invalid or empty');

    imageUrls.forEach((url, index) => {
      if (url && !isValidUrl(url)) {
        validationErrors.push(`Image URL ${index + 1} is invalid`);
      }
    });

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Prepare data
    const spotData = {
      country,
      address,
      city,
      state: stateName, // Use stateName here
      lat: parseFloat(lat) || 0,
      lng: parseFloat(lng) || 0,
      description,
      name,
      price: parseFloat(price),
    };

    const imageUrlsArray = [previewImage, ...imageUrls.filter((url) => url)];

    try {
      // Dispatch createSpot thunk action
      const newSpot = await dispatch(createSpot(spotData, imageUrlsArray));
      // Redirect to the new spot's detail page
      navigate(`/spots/${newSpot.id}`); // Use navigate
    } catch (res) {
      // Handle server-side errors
      const data = await res.json();
      if (data && data.errors) setErrors(Object.values(data.errors));
    }
  };

  // Helper function to validate URLs
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  return (
    <div className="spot-form-container">
      <h1>Create a New Spot</h1>
      <form onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <ul className="errors">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )}

        <label>
          Country
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>

        <label>
          Street Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>

        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>

        <label>
          State
          <input
            type="text"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            required
          />
        </label>

        <label>
          Latitude
          <input
            type="text"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
        </label>

        <label>
          Longitude
          <input
            type="text"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minLength={30}
            required
          ></textarea>
        </label>

        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            required
          />
        </label>

        <label>
          Price per night (USD)
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>

        <label>
          Preview Image URL
          <input
            type="text"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
            required
          />
        </label>

        <label>
          Additional Image URLs
          {imageUrls.map((url, index) => (
            <input
              key={index}
              type="text"
              value={url}
              onChange={(e) => {
                const newImageUrls = [...imageUrls];
                newImageUrls[index] = e.target.value;
                setImageUrls(newImageUrls);
              }}
            />
          ))}
        </label>

        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
};

export default SpotForm;
