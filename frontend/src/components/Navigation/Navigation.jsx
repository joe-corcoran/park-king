// Navigation.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <header className="main-header">
      <nav>
        <NavLink to="/">Home</NavLink>
        {isLoaded && (
          <ProfileButton user={sessionUser} />
        )}
      </nav>
    </header>
  );
}

export default Navigation;