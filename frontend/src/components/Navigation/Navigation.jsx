// frontend/src/components/Navigation/Navigation.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logoImage from '../../images/logo.png'; // Import your logo image

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <header className="main-header">
      <nav>
        <NavLink to="/" className="logo-link">
          <img src={logoImage} alt="Park King Logo" className="logo-image" />
        </NavLink>
        {isLoaded && (
          <ProfileButton user={sessionUser} />
        )}
      </nav>
    </header>
  );
}

export default Navigation;