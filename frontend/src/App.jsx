// frontend/src/App.jsx

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from 'react-router-dom';
import Navigation from "./components/Navigation/Navigation";
import * as sessionActions from "./store/session";
import { Modal } from './components/context/Modal';

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
          <Route path="/" element={<h1>Welcome to Park King</h1>} />
        </Routes>
      )}
      <Modal /> {}
    </>
  );
}

export default App;