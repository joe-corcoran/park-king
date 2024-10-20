//frontend/src/components/Navigation/Navigation.jsx
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
          <div className="menu-buttons">
            {/* Wrap both icons inside the same button */}
            <button className="combined-button" aria-label="Menu & Profile" onClick={toggleMenu}>
              <FaEllipsisV className="icon" />
              <FaUserCircle className="icon" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navigation;