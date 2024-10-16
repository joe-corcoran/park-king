// src/store/spots.js
import { csrfFetch } from './csrf';

// Action Types
const SET_SPOTS = 'spots/SET_SPOTS';

// Action Creators
const setSpots = (spots) => ({
  type: SET_SPOTS,
  spots,
});

// Thunk Action
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

// Reducer
const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTS:
      return { ...state, ...action.spots };
    default:
      return state;
  }
};

export default spotsReducer;
