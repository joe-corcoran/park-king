// frontend/src/App.jsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from 'react-router-dom';
import Navigation from "./components/Navigation/Navigation";
import * as sessionActions from "./store/session";
import SpotsIndex from './components/SpotsIndex/SpotsIndex';
import { Modal } from './components/context/Modal'; // Keep if Modal is used
import './App.css'; // Keep if App.css is needed

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
          {/* Add other routes here */}
        </Routes>
      )}
      <Modal /> {/* Keep if Modal is needed globally */}
    </>
  );
}

export default App;
