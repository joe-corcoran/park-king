// src/store/spots.js

import { csrfFetch } from './csrf';

// Action Types
const SET_SPOTS = 'spots/SET_SPOTS';
const SET_SPOT_DETAILS = 'spots/SET_SPOT_DETAILS';

// Action Creators
const setSpots = (spots) => ({
  type: SET_SPOTS,
  spots,
});

const setSpotDetails = (spot) => ({
    type: SET_SPOT_DETAILS,
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
      default:
        return state;
    }
  };
  

export default spotsReducer;
