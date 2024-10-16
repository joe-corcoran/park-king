// src/store/spots.js

import { csrfFetch } from './csrf';

// Action Types
const SET_SPOTS = 'spots/SET_SPOTS';
const SET_SPOT_DETAILS = 'spots/SET_SPOT_DETAILS';
const ADD_SPOT = 'spots/ADD_SPOT';


// Action Creators
const setSpots = (spots) => ({
  type: SET_SPOTS,
  spots,
});

const setSpotDetails = (spot) => ({
    type: SET_SPOT_DETAILS,
    spot,
  });

  const addSpot = (spot) => ({
    type: ADD_SPOT,
    spot,
  });
  
  
//thunks
export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');
  if (response.ok) {
    const data = await response.json();
    const spots = {};
    data.Spots.forEach((spot) => {
      spots[spot.id] = spot;
    });
    dispatch(setSpots(spots));
  }
};

export const getSpotDetails = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    if (response.ok) {
      const data = await response.json();
      dispatch(setSpotDetails(data));
      return data;
    } else {
      // add error handling
    }
  };

  export const createSpot = (spotData, imageUrls) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spotData),
    });
  
    if (response.ok) {
      const newSpot = await response.json();
  
      // upload images after creating
      for (let i = 0; i < imageUrls.length; i++) {
        const imageUrl = imageUrls[i];
        const preview = i === 0; 
  
        await csrfFetch(`/api/spots/${newSpot.id}/images`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: imageUrl, preview }),
        });
      }
  
      // fetch spot details for updated data
      const spotDetailsResponse = await csrfFetch(`/api/spots/${newSpot.id}`);
      if (spotDetailsResponse.ok) {
        const spotDetails = await spotDetailsResponse.json();
        dispatch(addSpot(spotDetails));
        return spotDetails;
      } else {
//add error handling
      }
    } else {
      const errors = await response.json();
      throw errors;
    }
  };
  
  

// reducer
const initialState = {
    allSpots: {},
    singleSpot: {},
  };
  
  const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_SPOTS:
        return {
          ...state,
          allSpots: { ...action.spots },
        };
      case SET_SPOT_DETAILS:
        return {
          ...state,
          singleSpot: { ...action.spot },
        };
      case ADD_SPOT:
        return {
          ...state,
          allSpots: {
            ...state.allSpots,
            [action.spot.id]: action.spot,
          },
          singleSpot: action.spot,
        };
      default:
        return state;
    }
  };
  

export default spotsReducer;
