import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSpot } from '../../store/spots';
import './SpotForm.css';

const SpotForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);

  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [imageUrls, setImageUrls] = useState(['', '', '', '']);
  const [submitted, setSubmitted] = useState(false);

  if (!sessionUser) {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const validationErrors = [];

    // Validation for required fields
    if (!country) validationErrors.push('Country is required');
    if (!address) validationErrors.push('Address is required');
    if (!city) validationErrors.push('City is required');
    if (!stateName) validationErrors.push('State is required');
    if (!description || description.length < 30)
      validationErrors.push('Description needs 30 or more characters');
    if (!name) validationErrors.push('Name is required');
    if (!price || isNaN(price)) validationErrors.push('Price per night is required');
    if (!previewImage || !isValidUrl(previewImage))
      validationErrors.push('Preview Image is required');
    if (!lat) validationErrors.push('Latitude is required');
    if (!lng) validationErrors.push('Longitude is required');

    // Image URL validation
    imageUrls.forEach((url, index) => {
      if (url && !isValidUrl(url)) {
        validationErrors.push(`Image URL ${index + 1} needs to end in png or jpg (or jpeg)`);
      }
    });

    if (validationErrors.length > 0) {
      return;
    }

    const spotData = {
      country,
      address,
      city,
      state: stateName,
      lat: parseFloat(lat) || 0,
      lng: parseFloat(lng) || 0,
      description,
      name,
      price: parseFloat(price),
    };

    const imageUrlsArray = [previewImage, ...imageUrls.filter((url) => url)];

    try {
      const newSpot = await dispatch(createSpot(spotData, imageUrlsArray));
      navigate(`/spots/${newSpot.id}`);
    } catch (res) {
      const data = await res.json();
      if (data && data.errors) setErrors(Object.values(data.errors));
    }
  };

  const isValidUrl = (url) => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.pathname.match(/\.(png|jpg|jpeg)$/);
    } catch (err) {
      return false;
    }
  };

  return (
    <div className="spot-form-container">
      <h1>Create a New Spot</h1>
      <form onSubmit={handleSubmit}>
        <section className="location-section">
          <h2>Where's your place located?</h2>
          <p>Guests will only get your exact address once they booked a reservation.</p>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              id="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            />
            {submitted && !country && <span className="error">Country is required</span>}
          </div>

          <div className="form-group">
            <label htmlFor="address">Street Address</label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
            {submitted && !address && <span className="error">Address is required</span>}
          </div>

          <div className="form-group inline-fields">
            <div className="field">
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
              {submitted && !city && <span className="error">City is required</span>}
            </div>
            <div className="field">
              <label htmlFor="state">State</label>
              <input
                id="state"
                type="text"
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                placeholder="STATE"
              />
              {submitted && !stateName && <span className="error">State is required</span>}
            </div>
          </div>

          <div className="form-group inline-fields">
            <div className="field">
              <label htmlFor="latitude">Latitude</label>
              <input
                id="latitude"
                type="text"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                placeholder="Latitude"
              />
              {submitted && !lat && <span className="error">Latitude is required</span>}
            </div>
            <div className="field">
              <label htmlFor="longitude">Longitude</label>
              <input
                id="longitude"
                type="text"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                placeholder="Longitude"
              />
              {submitted && !lng && <span className="error">Longitude is required</span>}
            </div>
          </div>
        </section>

        <hr className="divider" />

        <section className="description-section">
          <h2>Describe your place to guests</h2>
          <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please write at least 30 characters"
          ></textarea>
          {submitted && description.length < 30 && (
            <span className="error">Description needs 30 or more characters</span>
          )}
        </section>

        <hr className="divider" />

        <section className="title-section">
          <h2>Create a title for your spot</h2>
          <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name of your spot"
          />
          {submitted && !name && <span className="error">Name is required</span>}
        </section>

        <hr className="divider" />

        <section className="price-section">
          <h2>Set a base price for your spot</h2>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
          <div className="price-input">
            <span className="dollar-sign">$</span>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price per night (USD)"
            />
          </div>
          {submitted && !price && <span className="error">Price is required</span>}
        </section>

        <hr className="divider" />

        <section className="photos-section">
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <input
            type="text"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
            placeholder="Preview Image URL"
          />
          {submitted && !previewImage && <span className="error">Preview image is required</span>}
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
              placeholder="Image URL"
            />
          ))}
        </section>

        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
};

export default SpotForm;