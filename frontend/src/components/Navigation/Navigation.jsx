// frontend/src/components/Navigation/Navigation.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logoImage from '../../images/logo.png'; 

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className="navigation">
      <ul>
        <li>
        <NavLink to="/" className="logo-link">
          <img src={logoImage} alt="Park King Logo" className="logo-image" />
        </NavLink>
        </li>
        {sessionUser && (
          <li>
            <NavLink to="/spots/new">Create a New Spot</NavLink>
          </li>
        )}
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;