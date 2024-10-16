// frontend/src/App.jsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from 'react-router-dom';
import Navigation from "./components/Navigation/Navigation";
import * as sessionActions from "./store/session";
import SpotsIndex from './components/SpotsIndex/SpotsIndex';
import { Modal } from './components/context/Modal';
import './App.css'; 
import SpotDetails from './components/SpotDetails/SpotDetails';
import SpotForm from './components/SpotForm/SpotForm';



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Routes>
          <Route path="/" element={<SpotsIndex />} />
          <Route path="/spots/:spotId" element={<SpotDetails />} />
          <Route path="/spots/new" element={<SpotForm />} />
          {/* new routes */}
        </Routes>
      )}
      <Modal /> {/* global modal */}
    </>
  );
}

export default App;
