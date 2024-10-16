// frontend/src/App.jsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from 'react-router-dom'; // Remove Router from import
import Navigation from "./components/Navigation/Navigation";
import * as sessionActions from "./store/session";
// Remove Modal import if not used
import SpotsIndex from './components/SpotsIndex/SpotsIndex';

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
      {/* Remove Modal here if it's not needed globally */}
    </>
  );
}

export default App;
