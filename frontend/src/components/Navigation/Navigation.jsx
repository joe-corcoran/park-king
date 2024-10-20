import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logoImage from '../../images/logo.png'; 
import { FaEllipsisV } from 'react-icons/fa';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <header className="header">
      <div className="container header-content">
        <NavLink to="/" className="logo-link">
          <img src={logoImage} alt="Parkly Logo" className="logo-image" />
        </NavLink>
        <nav className="nav-menu">
          {sessionUser && (
            <NavLink to="/spots/new" className="create-spot-link">
              Create a New Spot
            </NavLink>
          )}
          {/* Combine hamburger and profile into a single clickable container */}
          <div className="menu-buttons">
            <ProfileButton user={sessionUser} />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navigation;
