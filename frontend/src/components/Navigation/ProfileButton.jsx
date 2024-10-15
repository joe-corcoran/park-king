import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    console.log("Profile button clicked"); // Add this to verify button click
    if (showMenu) return;
    setShowMenu(true);
  };
  

  useEffect(() => {
    if (!showMenu) return;
  
    const closeMenu = (e) => {
      // Ensure the click is not on the button itself
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
  
    // Add a small delay using setTimeout to prevent immediate closure
    setTimeout(() => {
      document.addEventListener('click', closeMenu);
    }, 0);
  
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);
  
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  console.log("Dropdown menu is visible:", showMenu); // Add this to track visibility state
  
  return (
    <>
      <button onClick={openMenu}>
        <FaUserCircle />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <li>{user.username}</li>
        <li>{user.firstName} {user.lastName}</li>
        <li>{user.email}</li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;