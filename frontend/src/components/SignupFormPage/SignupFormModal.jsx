// frontend/src/components/SignupFormPage/SignupFormModal.jsx

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../components/context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Confirm Password field must be the same as the Password field"
      }));
      return;
    }

    return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="signup-modal" noValidate>
      <h1>Sign Up</h1>

      <div className="error-container">
        {Object.keys(errors).map((key) => (
          <p key={key} className="error-message">{errors[key]}</p>
        ))}
      </div>

      <label>
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      {errors.email && <p className="error-message">{errors.email}</p>}

      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      {errors.username && <p className="error-message">{errors.username}</p>}

      <label>
        First Name
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      {errors.firstName && <p className="error-message">{errors.firstName}</p>}

      <label>
        Last Name
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      {errors.lastName && <p className="error-message">{errors.lastName}</p>}

      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {errors.password && <p className="error-message">{errors.password}</p>}

      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

      <button type="submit" className={email && username && password && confirmPassword ? "active" : ""}>
        Sign Up
      </button>
    </form>
  );
}

export default SignupFormModal;
